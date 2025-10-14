import Contact from '../db/models/Contact.js';

export const getContactsController = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

export const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    return res.status(404).json({
      message: `Contact with id=${id} not found`,
    });
  }

  res.json(result);
};
