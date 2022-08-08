import Joi from 'joi';

interface UserLogin {
  username: string;
  password: string;
}

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