import Joi from 'joi';
import { IPaymentCards } from '../types';

const validatePaymentCard = (cardDetails: IPaymentCards) => {
  const schema = Joi.object({
    user_id: Joi.number().required(),
    card_number: Joi.string().min(16).required(),
    card_holder_name: Joi.string().min(2).max(50).required(),
    card_exp_date: Joi.string().required(),
  });
  return schema.validate(cardDetails);
};

export default validatePaymentCard;
