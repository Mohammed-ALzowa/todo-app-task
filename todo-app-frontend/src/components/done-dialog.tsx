"use client"
import { Dialog, DialogContent, DialogActions, Typography, Box } from "@mui/material"
import { CheckCircle } from "@mui/icons-material"
import { Button } from "@/components/ui"

interface DoneDialogProps {
  open: boolean
  onClose: () => void
}

export default function DoneDialog({ open, onClose }: DoneDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent sx={{ textAlign: "center", py: 4 }}>
        <Box sx={{ mb: 3 }}>
          <CheckCircle color="success" sx={{ fontSize: 80 }} />
        </Box>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Task completed successfully
        </Typography>
        <Typography paragraph sx={{ mt: 2 }}>
          You have successfully completed the task. You can now return to your task list.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
        <Button onClick={onClose} sx={{ px: 4 }}>
          Back to Task List
        </Button>
      </DialogActions>
    </Dialog>
  )
}
