import Link from "next/link"
import { Container, Typography, Button, Paper } from "@mui/material"
import { Home, ErrorOutline } from "@mui/icons-material"

export default function NotFound() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 2,
        }}
      >
        <ErrorOutline color="error" sx={{ fontSize: 80, mb: 2 }} />

        <Typography variant="h2" component="h1" gutterBottom align="center">
          404
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom align="center">
          Page Not Found
        </Typography>

        <Button component={Link} href="/" variant="contained" size="large" startIcon={<Home />}>
          Back to Home
        </Button>
      </Paper>
    </Container>
  )
}
