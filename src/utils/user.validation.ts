import Joi from 'joi';
import { User } from '../interfaces/user.interface';

const userBodyValidation = (userBody: User) => {
  const { error } = Joi.object({
    username: Joi.string().min(3).required(),
    classe: Joi.string().min(3).required(),
    level: Joi.number().min(1).required().messages({
      'number.min': '"level" must be greater than or equal to 1',
    }),
    password: Joi.string().min(8).required(),
  }).validate(userBody);

  if (error) {
    throw error;
  }
};

export default userBodyValidation;