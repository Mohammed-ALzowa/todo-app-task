import { baseQuerySchema } from './baseQueryValidation';
import Joi from 'joi';


export const taskIdParamSchema =baseQuerySchema.keys({
  id: Joi.string().hex().length(24).required(),

});
