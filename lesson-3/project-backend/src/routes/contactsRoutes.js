import { Router } from 'express';

import {
  getContactsController,
  getContactByIdController,
} from '../controllers/contactsControllers.js';

const contactsRoutes = Router();

contactsRoutes.get('/', getContactsController);

contactsRoutes.get('/:id', getContactByIdController);

export default contactsRoutes;
