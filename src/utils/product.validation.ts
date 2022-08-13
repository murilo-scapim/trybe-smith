import Joi from 'joi';
import Product from '../interfaces/product.interface';

const productBodyValidation = (productBody: Product) => {
  const { error } = Joi.object({
    name: Joi.string().min(3).required(),
    amount: Joi.string().min(3).required(),
  }).validate(productBody);

  if (error) {
    throw error;
  }
};

export default productBodyValidation;