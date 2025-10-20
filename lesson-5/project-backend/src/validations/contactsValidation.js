import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

import { categoryList } from '../constants/index.js';

const objectIdValidator = (value, helpers) => {
  return isValidObjectId(value)
    ? value
    : helpers.message(`${value} invalid id format`);
};

export const contactIdSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const createContactSchema = {
  [Segments.BODY]: Joi.object({
    fullname: Joi.string().min(3).required().messages({
      'any.required': 'fullname must be exist',
      'string.base': 'fullname must be only string',
      'string.min': 'fullname should have at least {#limit} symbols',
    }),
    phone: Joi.string().min(11).required(),
    category: Joi.string().valid(...categoryList),
  }),
};

export const updateContactSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    fullname: Joi.string().min(3).messages({
      'string.base': 'fullname must be only string',
      'string.min': 'fullname should have at least {#limit} symbols',
    }),
    phone: Joi.string().min(11),
    category: Joi.string().valid(...categoryList),
  }).min(1),
};
