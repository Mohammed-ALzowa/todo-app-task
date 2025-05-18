import { Container, Box, CircularProgress, Typography } from "@mui/material"

export default function Loading() {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          gap: 3,
        }}
      >
        <CircularProgress size={60} thickness={4} />

        <Typography variant="h6" color="text.secondary">
          Loading...
        </Typography>
      </Box>
    </Container>
  )
}
