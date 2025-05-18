"use client";
import { TextField, TextFieldProps } from "@mui/material";

export default function TextInput(props: TextFieldProps) {
  return (
    <TextField
      margin="normal"
      fullWidth
      variant="outlined"
      {...props}
    />
  );
}
