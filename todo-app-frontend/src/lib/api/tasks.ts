import { http } from "../http"
import { Task } from "@/types"

export async function getTasks(): Promise<Task[]> {
  const { data } = await http.get<Task[]>("/tasks")
  return data
}

export async function getTask(id: string): Promise<Task> {
  const { data } = await http.get<Task>(`/tasks/${id}`)
  return data
}
