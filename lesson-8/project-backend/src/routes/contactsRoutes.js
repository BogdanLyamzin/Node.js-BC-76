import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactByIdController,
  updateContactController,
} from '../controllers/contactsControllers.js';

import { getContactsSchema, contactIdSchema, createContactSchema, updateContactSchema } from '../validations/contactsValidation.js';

import authenticate from '../middlewares/authenticate.js';

const contactsRoutes = Router();

contactsRoutes.use(authenticate);

contactsRoutes.get('/',  celebrate(getContactsSchema), getContactsController);

contactsRoutes.get('/:id', celebrate(contactIdSchema), getContactByIdController);

contactsRoutes.post('/', celebrate(createContactSchema), addContactController);

contactsRoutes.delete('/:id', celebrate(contactIdSchema), deleteContactByIdController);

contactsRoutes.patch('/:id', celebrate(updateContactSchema), updateContactController);

export default contactsRoutes;
