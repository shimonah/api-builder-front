'use client';

import { Box, Typography, Paper } from '@mui/material';

export default function EndpointsPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Endpoints</Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1">
          This is the endpoints management page. You can view and manage your API endpoints here.
        </Typography>
      </Paper>
    </Box>
  );
} 