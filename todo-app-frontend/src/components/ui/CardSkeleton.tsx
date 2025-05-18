"use client"
import { Paper, Skeleton, Box } from "@mui/material"

export default function CardSkeleton() {
  return (
    <Paper sx={{ p: 2, mb: 1 }}>
      <Box display="flex" alignItems="center">
        <Skeleton variant="circular" width={28} height={28} sx={{ mr: 2 }} />
        <Box flexGrow={1}>
          <Skeleton height={20} width="60%" />
          <Skeleton height={16} width="40%" />
        </Box>
      </Box>
    </Paper>
  )
}
