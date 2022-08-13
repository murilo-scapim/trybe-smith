import Joi from 'joi';
import { OrderOnlyProductsIds } from '../interfaces/order.interface';

const orderBodyValidation = (orderBody: OrderOnlyProductsIds) => {
  const { error } = Joi.object({
    productsIds: Joi.array().items(Joi.number()).min(1).required()
      .messages({
        'number.base': '"productsIds" must include only numbers',
        'array.min': '"productsIds" must include only numbers',
      }),
  }).validate(orderBody);

  if (error) {
    throw error;
  }
};

export default orderBodyValidation;