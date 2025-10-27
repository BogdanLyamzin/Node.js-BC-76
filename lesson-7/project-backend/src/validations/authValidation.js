import { Joi, Segments } from 'celebrate';

import { emailRegexp } from '../constants/index.js';

export const registerUserSchema = {
    [Segments.BODY]: Joi.object({
        username: Joi.string(),
        email: Joi.string().pattern(emailRegexp).required(),
        password: Joi.string().min(6).required(),
    })
};