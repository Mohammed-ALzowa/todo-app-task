"use client";
import { Card as MuiCard, CardProps, CardContent, Typography } from "@mui/material";

interface CardUIProps extends CardProps {
  title?: string;
  children: React.ReactNode;
}


export default function Card({ title, children, ...rest }: CardUIProps) {
  return (
    <MuiCard {...rest} sx={{ p: 2, ...rest.sx }}>
      {title && (
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      )}
      <CardContent sx={{ p: 0 }}>{children}</CardContent>
    </MuiCard>
  );
}
