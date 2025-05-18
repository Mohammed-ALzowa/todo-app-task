"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchTasks,
  reorderTasks,
  toggleTaskStatus,
  deleteTask,
} from "../store/tasks/tasksSlice";
import TaskForm from "./task-form";
import DoneDialog from "./done-dialog";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import {
  Typography,
  Box,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Task } from "@/types";
import { CardSkeleton } from "@/components/ui"

interface TaskListClientProps {
  initialTasks: Task[];
}

export default function TaskListClient({ initialTasks }: TaskListClientProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((s) => s.tasks);
  const [welcomeDialogOpen, setWelcomeDialogOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      dispatch(fetchTasks());
      setIsInitialized(true);
    }
  }, [dispatch, isInitialized]);

  const onDragEnd = (res: DropResult) => {
    if (!res.destination) return;
    const newItems = Array.from(items) as Task[];
    const [moved] = newItems.splice(res.source.index, 1);
    newItems.splice(res.destination.index, 0, moved);
    dispatch(reorderTasks(newItems));
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const result = await dispatch(
        toggleTaskStatus({ id, done: !currentStatus })
      ).unwrap();
      if (result.done) setWelcomeDialogOpen(true);
    } catch {}
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await dispatch(deleteTask(id)).unwrap();
    } catch {}
  };

  const handleEditTask = (id: string) => router.push(`/tasks/${id}`);

  const tasksToDisplay = isInitialized ? items : initialTasks;

  const skeletons = [...Array(4)].map((_, i) => <CardSkeleton key={i} />);

  if (loading && tasksToDisplay.length === 0) {
    return (
      <>
        <TaskForm />
        {skeletons}
      </>
    );
  }
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
      <TaskForm />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {tasksToDisplay.length === 0 ? (
                <Paper sx={{ p: 3, textAlign: "center" }}>
                  <Typography>
                    No tasks available. Add a new task to get started.
                  </Typography>
                </Paper>
              ) : (
                tasksToDisplay.map((task: Task, idx: number) => (
                  <Draggable key={task._id} draggableId={task._id} index={idx}>
                    {(prov) => (
                      <Paper
                        ref={prov.innerRef}
                        {...prov.draggableProps}
                        {...(prov.dragHandleProps ? prov.dragHandleProps : {})}
                        sx={{
                          p: 2,
                          mb: 1,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          bgcolor: task.done
                            ? "rgba(76, 175, 80, 0.1)"
                            : "inherit",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Checkbox
                            checked={task.done}
                            onChange={() =>
                              handleToggleStatus(task._id, task.done)
                            }
                          />
                          <Box>
                            <Typography
                              sx={{
                                textDecoration: task.done
                                  ? "line-through"
                                  : "none",
                                color: task.done
                                  ? "text.secondary"
                                  : "text.primary",
                              }}
                            >
                              {task.title}
                            </Typography>
                            {task.description && (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {task.description}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                        <Box>
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() => handleEditTask(task._id)}
                              size="small"
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              onClick={() => handleDeleteTask(task._id)}
                              size="small"
                              color="error"
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Paper>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <DoneDialog
        open={welcomeDialogOpen}
        onClose={() => setWelcomeDialogOpen(false)}
      />
    </>
  );
}
