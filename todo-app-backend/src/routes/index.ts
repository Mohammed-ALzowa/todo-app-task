import express from 'express';
import taskRouter from './tasksRoutes';

const router = express.Router();

router.use('/tasks', taskRouter);

export default router;
