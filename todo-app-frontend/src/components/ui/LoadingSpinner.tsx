"use client"
import { Box, CircularProgress } from "@mui/material"

export default function LoadingSpinner() {
  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <CircularProgress />
    </Box>
  )
}
