import { Router } from 'express';

import {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactByIdController,
  updateContactController,
} from '../controllers/contactsControllers.js';

const contactsRoutes = Router();

contactsRoutes.get('/', getContactsController);

contactsRoutes.get('/:id', getContactByIdController);

contactsRoutes.post("/", addContactController);

contactsRoutes.delete("/:id", deleteContactByIdController);

contactsRoutes.patch("/:id", updateContactController);

export default contactsRoutes;
