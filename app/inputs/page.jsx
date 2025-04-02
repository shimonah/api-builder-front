'use client';

import { Box, Typography, Paper, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import InputIcon from '@mui/icons-material/Input';

export default function InputsPage() {
  const sampleInputs = [
    { id: 1, name: 'Customer Data', type: 'JSON', fields: 12 },
    { id: 2, name: 'Product Catalog', type: 'XML', fields: 8 },
    { id: 3, name: 'Order Information', type: 'JSON', fields: 15 },
    { id: 4, name: 'Payment Details', type: 'Form', fields: 6 }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Input Schemas</Typography>
      <Typography variant="body1" paragraph>
        Manage input data schemas that define the structure of data received by your integrations.
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {sampleInputs.map((input) => (
          <Grid item xs={12} sm={6} md={4} key={input.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <InputIcon sx={{ mr: 1 }} color="primary" />
                  <Typography variant="h6">{input.name}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Type: {input.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fields: {input.fields}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">View</Button>
                <Button size="small">Edit</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 