import { Container, Typography } from "@mui/material"
import TaskListClient from "../components/task-list-client"
import { getTasks } from "@/lib/api/tasks"

export default async function HomePage() {

  const initialTasks = await getTasks()

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Task List
      </Typography>
        <TaskListClient initialTasks={initialTasks} />
    </Container>
  )
}
