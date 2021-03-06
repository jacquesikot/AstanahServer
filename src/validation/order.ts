import Joi from 'joi';

import { IOrder } from '../types';

const validateOrder = (order: IOrder) => {
  const schema = Joi.object({
    user_id: Joi.number().min(1).required(),
    payment_method: Joi.string().min(3).max(15).required(),
    set_paid: Joi.number().required(),
    billing_id: Joi.number().required(),
    products: Joi.array(),
    status: Joi.string().min(3).required(),
    total: Joi.string().required(),
  });

  return schema.validate(order);
};

export default validateOrder;
