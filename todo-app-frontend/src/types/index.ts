export interface Task {
  _id: string
  title: string
  description?: string
  done: boolean
}

export interface TasksState {
  items: Task[]
  loading: boolean
  error?: string
  currentTask: Task | null
}

export const initialState: TasksState = {
  items: [],
  loading: false,
  currentTask: null,
}