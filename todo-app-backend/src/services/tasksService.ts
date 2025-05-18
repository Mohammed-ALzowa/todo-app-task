import { Task, ITask } from '../models/Task';
import NotFound from 'http-errors';

export const getAllTasks = async (): Promise<ITask[]> => {
  return Task.find().sort({ createdAt: -1 });
};

export const getTaskById = async (id: string): Promise<ITask> => {
  const task = await Task.findById(id);
  if (!task) throw NotFound('Task not found');
  return task;
};

export const createTask = async (data: { title: string; description?: string; done?: boolean }): Promise<ITask> => {
  const task = new Task(data);
  return task.save();
};

export const updateTask = async (
  id: string,
  data: { title?: string; description?: string; done?: boolean }
): Promise<ITask> => {
  const task = await Task.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!task) throw NotFound('Task not found');
  return task;
};

export const deleteTask = async (id: string): Promise<void> => {
  const task = await Task.findByIdAndDelete(id);
  if (!task) throw NotFound('Task not found');
};
