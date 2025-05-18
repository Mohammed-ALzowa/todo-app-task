import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {http} from "@/lib/http"
import { RootState } from "../index"
import { initialState, Task } from "../../types"


export const getTasks = (state: RootState) => state.tasks.items

export const fetchTasks = createAsyncThunk("tasks/fetch", async () => {
  const res = await http.get<Task[]>("/tasks")
  return res.data
})

export const fetchTaskById = createAsyncThunk("tasks/fetchById", async (id: string) => {
  const res = await http.get<Task>(`/tasks/${id}`)
  return res.data
})

export const createTask = createAsyncThunk("tasks/create", async (task: Omit<Task, "_id">) => {
  const res = await http.post<Task>("/tasks", task)
  return res.data
})

export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, task }: { id: string; task: Partial<Task> }) => {
    const res = await http.put<Task>(`/tasks/${id}`, task)
    return res.data
  },
)

export const deleteTask = createAsyncThunk("tasks/delete", async (id: string) => {
  await http.delete(`/tasks/${id}`)
  return id
})

export const toggleTaskStatus = createAsyncThunk(
  "tasks/toggleStatus",
  async ({ id, done }: { id: string; done: boolean }) => {
    const res = await http.put<Task>(`/tasks/${id}`, { done })
    return res.data
  },
)

export const reorderTasks = createAsyncThunk("tasks/reorder", async (newOrder: Task[]) => {
  return newOrder
})

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    clearCurrentTask: (state) => {
      state.currentTask = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (s) => {
        s.loading = true
      })
      .addCase(fetchTasks.fulfilled, (s, { payload }) => {
        s.loading = false
        s.items = payload
      })
      .addCase(fetchTasks.rejected, (s, { error }) => {
        s.loading = false
        s.error = error.message
      })
      .addCase(reorderTasks.fulfilled, (s, { payload }) => {
        s.items = payload
      })
      .addCase(createTask.fulfilled, (s, { payload }) => {
        s.items.push(payload)
      })
      .addCase(updateTask.fulfilled, (s, { payload }) => {
        const index = s.items.findIndex((item) => item._id === payload._id)
        if (index !== -1) {
          s.items[index] = payload
        }
        if (s.currentTask && s.currentTask._id === payload._id) {
          s.currentTask = payload
        }
      })
      .addCase(deleteTask.fulfilled, (s, { payload }) => {
        s.items = s.items.filter((item) => item._id !== payload)
      })
      .addCase(toggleTaskStatus.fulfilled, (s, { payload }) => {
        const index = s.items.findIndex((item) => item._id === payload._id)
        if (index !== -1) {
          s.items[index] = payload
        }
      })
      .addCase(fetchTaskById.pending, (s) => {
        s.loading = true
      })
      .addCase(fetchTaskById.fulfilled, (s, { payload }) => {
        s.loading = false
        s.currentTask = payload
      })
      .addCase(fetchTaskById.rejected, (s, { error }) => {
        s.loading = false
        s.error = error.message
      })
  },
})

export const { clearCurrentTask } = slice.actions
export default slice.reducer
