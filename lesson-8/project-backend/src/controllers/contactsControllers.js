import createHttpError from 'http-errors';

import Contact from '../db/models/Contact.js';

export const getContactsController = async (req, res) => {
  const {_id: userId} = req.user;
  const { page, perPage, sortOrder, sortBy, category, search } = req.query;
  const skip = (page - 1) * perPage;

  const contactQuery = Contact.find({userId});
  if(category) {
    contactQuery.where("category").equals(category);
  }
  // if(search) {
  //   contactQuery.where({
  //     $text: {
  //       $search: search,
  //     }
  //   });
  // }
  if(search) {
    contactQuery.where({
      fullname: {
        $regex: search,
        $options: "i"
      }
    });
  }

  const [contacts, totalItems] = await Promise.all([
    contactQuery.clone().skip(skip).limit(perPage).sort({[sortBy]: sortOrder}),
    contactQuery.countDocuments(),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  res.json({
    page,
    perPage,
    totalItems,
    totalPages,
    contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { id: _id } = req.params;
  const {_id: userId} = req.user;
  const result = await Contact.findById({_id, userId});
  if (!result) {
    throw createHttpError(404, `Contact with id=${_id} not found`);
  }

  res.json(result);
};

export const addContactController = async (req, res) => {
  const {_id: userId} = req.user;
  const result = await Contact.create({...req.body, userId});

  res.status(201).json(result);
};

export const deleteContactByIdController = async (req, res) => {
  const { id: _id } = req.params;
  const {_id: userId} = req.user;
  const result = await Contact.findOneAndDelete({_id, userId});
  if (!result) throw createHttpError(404, `Contact with id=${_id} not found`);

  // res.status(204).send();
  res.json(result);
};

export const updateContactController = async (req, res) => {
  const { id: _id } = req.params;
  const {_id: userId} = req.user;
  const result = await Contact.findOneAndUpdate({_id, userId}, req.body);
  if (!result) throw createHttpError(404, `Contact with id=${_id} not found`);

  res.json(result);
};
