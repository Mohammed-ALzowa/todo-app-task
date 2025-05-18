import express from 'express';
import * as controller from '../controllers/tasksController';
import { validate } from '../middleware/validateMiddleware';
import {
  createTaskSchema,
  updateTaskSchema,
} from '../validation/taskSchemas';
import {  taskIdParamSchema} from '../validation/query/taskQueryValidation';
import {  baseQuerySchema} from '../validation/query/baseQueryValidation';

const taskRouter = express.Router();

taskRouter.get(
  '/',
  validate(baseQuerySchema, 'query'),
  controller.listTasks
);

taskRouter.get(
  '/:id',
  validate(taskIdParamSchema, 'params'),
  controller.getTask
);

taskRouter.post(
  '/',
  validate(createTaskSchema, 'body'),
  controller.createTask
);

taskRouter.put(
  '/:id',
  validate(taskIdParamSchema, 'params'),
  validate(updateTaskSchema, 'body'),
  controller.updateTask
);

taskRouter.delete(
  '/:id',
  validate(taskIdParamSchema, 'params'),
  controller.deleteTask
);

export default taskRouter;