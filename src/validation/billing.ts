// I have not tested this

import Joi from 'joi';

import { IBilling } from '../types';

const validateBilling = (billing: IBilling) => {
  const schema = Joi.object({
    user_id: Joi.number().min(1).required(),
    first_name: Joi.string().min(3).max(50).required(),
    last_name: Joi.string().min(3).max(50).required(),
    address: Joi.string().min(3).max(255).required(),
    city: Joi.string().min(3).max(255).required(),
    state: Joi.string().min(3).max(255).required(),
    postcode: Joi.string().min(3).max(255).required(),
    country: Joi.string().min(3).max(255).required(),
    phone: Joi.string().min(3).max(255).required(),
  });

  return schema.validate(billing);
};

export default validateBilling;
