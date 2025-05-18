"use client";
import { Button as MuiButton, ButtonProps } from "@mui/material";

export default function Button(props: ButtonProps) {
  return (
    <MuiButton
      variant="contained"
      color="primary"
      disableElevation
      {...props}              
    />
  );
}
