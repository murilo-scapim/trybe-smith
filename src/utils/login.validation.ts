import Joi from 'joi';
import { UserLogin } from '../interfaces/user.interface';

const userLoginValidation = (userLogin: UserLogin) => {
  const { error } = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
  }).validate(userLogin);

  if (error) {
    throw error;
  }
};

export default userLoginValidation;