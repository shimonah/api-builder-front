'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Box, Typography, Paper, Grid, Card, CardContent, 
  CardActions, Button, CircularProgress, Alert
} from '@mui/material';
import InputIcon from '@mui/icons-material/Input';
import AddIcon from '@mui/icons-material/Add';
import { fetchInputs } from '../services/inputService';

export default function InputsPage() {
  const router = useRouter();
  const [inputs, setInputs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInputs = async () => {
      try {
        const data = await fetchInputs();
        setInputs(data);
      } catch (err) {
        console.error('Error loading inputs:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadInputs();
  }, []);

  const handleCreateNew = () => {
    router.push('/inputs/create');
  };

  const countSchemaFields = (schema) => {
    if (!schema || !schema.properties) return 0;
    return Object.keys(schema.properties).length;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 64px)' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Input Schemas</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleCreateNew}
        >
          Create New Input
        </Button>
      </Box>
      
      <Typography variant="body1" paragraph>
        Manage input data schemas that define the structure of data received by your integrations.
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {!error && inputs.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary" paragraph>
            No input schemas found.
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Create your first input schema to define the structure of data for your integrations.
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={handleCreateNew}
            sx={{ mt: 2 }}
          >
            Create New Input
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {inputs.map((input) => (
            <Grid item xs={12} sm={6} md={4} key={input.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <InputIcon sx={{ mr: 1 }} color="primary" />
                    <Typography variant="h6">{input.code}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Method: {input.method}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Fields: {countSchemaFields(input.schema)}
                  </Typography>
                  {input.description && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {input.description}
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => router.push(`/inputs/${input.id}`)}>View</Button>
                  <Button size="small" onClick={() => router.push(`/inputs/${input.id}/edit`)}>Edit</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
} 