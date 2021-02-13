import Joi from 'joi';

import { IGoogleAuth, IUser } from '../types';

const validateUser = (user: IUser) => {
  const schema = Joi.object({
    first_name: Joi.string().min(2).max(45).required(),
    last_name: Joi.string().min(2).max(45),
    email: Joi.string().email().min(3).max(45).required(),
    password: Joi.string().min(3).max(25).required(),
    googleId: Joi.string().min(3).max(45),
    facebookId: Joi.string().min(3).max(45),
  });

  return schema.validate(user);
};

interface ILogin {
  email_address: string;
  password: string;
}

export const validateAuth = (credential: ILogin) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),
  });
  return schema.validate(credential);
};

export const validateGoogleAuth = (credentials: IGoogleAuth) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email(),
    provider: Joi.string(),
  });
  return schema.validate(credentials);
};

export default validateUser;
