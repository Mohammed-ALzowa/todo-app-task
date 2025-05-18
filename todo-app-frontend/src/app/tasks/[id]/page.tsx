"use client"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { fetchTaskById, updateTask, deleteTask } from "../../../store/tasks/tasksSlice"
import { Container, Typography, Paper, Box, FormControlLabel, Checkbox, Divider } from "@mui/material"
import { ArrowBack, Delete, Save } from "@mui/icons-material"
import { Button, TextInput } from "@/components/ui"
import DoneDialog from "../../../components/done-dialog"

export default function TaskDetailPage() {
  const router = useRouter()
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { currentTask, error } = useAppSelector((s) => s.tasks)
  const [welcomeDialogOpen, setWelcomeDialogOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [done, setDone] = useState(false)
  const [formError, setFormError] = useState("")

  useEffect(() => {
    if (typeof id === "string") dispatch(fetchTaskById(id))
  }, [dispatch, id])

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title)
      setDescription(currentTask.description || "")
      setDone(currentTask.done)
    }
  }, [currentTask])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      setFormError("Task title is required")
      return
    }
    if (typeof id === "string") {
      try {
        const result = await dispatch(updateTask({ id, task: { title, description, done } })).unwrap()
        if (result.done) {
          setWelcomeDialogOpen(true)
        } else {
          router.push("/")
        }
      } catch {
        setFormError("Error updating task")
      }
    }
  }

  const handleDelete = async () => {
    if (typeof id === "string" && confirm("Are you sure you want to delete this task?")) {
      try {
        await dispatch(deleteTask(id)).unwrap()
        router.push("/")
      } catch {}
    }
  }


  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
        <Button startIcon={<ArrowBack />} onClick={() => router.push("/")} sx={{ mt: 2 }}>
          Back to Main List
        </Button>
      </Container>
    )
  }

  if (!currentTask) {
    return (
      <Container>
        <Typography>Task not found</Typography>
        <Button startIcon={<ArrowBack />} onClick={() => router.push("/")} sx={{ mt: 2 }}>
          Back to Main List
        </Button>
      </Container>
    )
  }

  return (
    <Container sx={{ py: 4 }}>
      <Button startIcon={<ArrowBack />} onClick={() => router.push("/")} sx={{ mb: 2 }}>
        Back to Main List
      </Button>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Task Details
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Box component="form" onSubmit={handleSubmit}>
          <TextInput
            label="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={!!formError}
            helperText={formError}
            required
          />
          <TextInput
            label="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
          />
          <FormControlLabel
            control={<Checkbox checked={done} onChange={(e) => setDone(e.target.checked)} />}
            label="Completed"
            sx={{ my: 1, display: "block" }}
          />
          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
            <Button type="submit" startIcon={<Save />}>
              Save Changes
            </Button>
            <Button variant="outlined" color="error" startIcon={<Delete />} onClick={handleDelete}>
              Delete Task
            </Button>
          </Box>
        </Box>
      </Paper>
      <DoneDialog open={welcomeDialogOpen} onClose={() => router.push("/")} />
    </Container>
  )
}
