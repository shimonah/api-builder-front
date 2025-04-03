'use client';

import { Box, Typography, Paper, Button, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import ApiIcon from '@mui/icons-material/Api';

export default function Home() {
  const router = useRouter();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Welcome to Integration Hub</Typography>
    </Box>
  );
}
