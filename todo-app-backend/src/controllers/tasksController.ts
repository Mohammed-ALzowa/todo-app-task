import { Request, Response, NextFunction } from 'express';
import * as service from '../services/tasksService';

export const listTasks = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await service.getAllTasks();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

export const getTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await service.getTaskById(req.params.id);
    res.json(task);
  } catch (err) {
    next(err);
  }
};

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newTask = await service.createTask(req.body);
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await service.updateTask(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await service.deleteTask(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
