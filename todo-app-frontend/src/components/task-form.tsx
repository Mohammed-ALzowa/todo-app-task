"use client"
import { useState } from "react"
import type React from "react"
import { useAppDispatch } from "../store/hooks"
import { createTask } from "../store/tasks/tasksSlice"
import { Paper, Box, Typography } from "@mui/material"
import { Button, TextInput } from "@/components/ui"

export default function TaskForm() {
  const dispatch = useAppDispatch()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      setError("Task title is required")
      return
    }
    try {
      await dispatch(createTask({ title, description, done: false })).unwrap()
      setTitle("")
      setDescription("")
      setError("")
    } catch {
      setError("Error creating task")
    }
  }

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add New Task
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextInput
          label="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={!!error}
          helperText={error}
          required
        />
        <TextInput
          label="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
        />
        <Button type="submit" sx={{ mt: 2 }}>
          Add Task
        </Button>
      </Box>
    </Paper>
  )
}
