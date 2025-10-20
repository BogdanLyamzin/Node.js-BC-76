import createHttpError from 'http-errors';

import Contact from '../db/models/Contact.js';

export const getContactsController = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

export const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }

  res.json(result);
};

export const addContactController = async (req, res) => {
  const result = await Contact.create(req.body);

  res.status(201).json(result);
};

export const deleteContactByIdController = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) throw createHttpError(404, `Contact with id=${id} not found`);

  // res.status(204).send();
  res.json(result);
};

export const updateContactController = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body);
  if (!result) throw createHttpError(404, `Contact with id=${id} not found`);

  res.json(result);
};
