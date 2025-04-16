'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Box, Typography, Paper, CircularProgress, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { fetchIntegrations } from '../services/integrationService';

export default function IntegrationsPage() {
  const router = useRouter();
  const [integrations, setIntegrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadIntegrations = async () => {
      try {
        const data = await fetchIntegrations();
        setIntegrations(data);
      } catch (err) {
        console.error('Error fetching integrations:', err);
        setError(err.message);
        // Fallback to empty array if API fails
        setIntegrations([]);
      } finally {
        setLoading(false);
      }
    };

    loadIntegrations();
  }, []);

  const handleRowClick = (integration) => {
    router.push(`/integrations/${integration.integrationCode}`);
  };

  const handleEdit = (e, integration) => {
    e.stopPropagation(); // Prevent row click from triggering
    router.push(`/integrations/${integration.integrationCode}/edit`);
  };
  
  const handleCreateNew = () => {
    router.push('/integrations/create');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 64px)' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error" variant="h6">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Integrations</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleCreateNew}
        >
          Add New Integration
        </Button>
      </Box>
      
      <Typography variant="body1" paragraph>
        Manage your integrations with external systems and services.
      </Typography>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="integrations table">
          <TableHead>
            <TableRow>
              <TableCell>Integration Code</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="center">Active</TableCell>
              <TableCell>Version</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {integrations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body1" sx={{ py: 2 }}>
                    No integrations found. Click "Add New Integration" to create one.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              integrations.map((integration) => (
                <TableRow 
                  key={integration.id}
                  onClick={() => handleRowClick(integration)}
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                  }}
                >
                  <TableCell>{integration.integrationCode}</TableCell>
                  <TableCell>{integration.name}</TableCell>
                  <TableCell>{integration.type}</TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={integration.active ? 'Active' : 'Inactive'} 
                      color={integration.active ? 'success' : 'default'} 
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{integration.version}</TableCell>
                  <TableCell>
                    {integration.updatedAt ? new Date(integration.updatedAt).toLocaleDateString() : 'N/A'}
                  </TableCell>
                  <TableCell align="center">
                    <Button 
                      variant="contained" 
                      size="small" 
                      onClick={(e) => handleEdit(e, integration)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
} 