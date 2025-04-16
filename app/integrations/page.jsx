'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Typography, Box, CircularProgress, Button
} from '@mui/material';
import { fetchIntegrations } from '../services/integrationService';

export default function IntegrationsPage() {
  const router = useRouter();
  const [integrations, setIntegrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const loadIntegrations = async () => {
      try {
        const data = await fetchIntegrations();
        setIntegrations(data);
      } catch (err) {
        setIntegrations([]);
      } finally {
        setLoading(false);
      }
    };

    loadIntegrations();
  }, []);

  const handleRowClick = (integration) => {
    router.push(`/integrations/${integration.id}`);
  };

  const handleEdit = (e, integration) => {
    e.stopPropagation(); // Prevent row click from triggering
    router.push(`/integrations/${integration.id}/edit`);
  };

  if (!mounted) {
    return null;
  }

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
      <Typography variant="h4" gutterBottom>Integrations</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="integrations table">
          <TableHead>
            <TableRow>
              <TableCell>Integration Code</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="center">Active</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {integrations.map((integration) => (
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
                <TableCell align="center">{integration.active ? 'Yes' : 'No'}</TableCell>
                <TableCell>{integration.type}</TableCell>
                <TableCell>
                  {new Date(integration.updatedAt).toISOString().split('T')[0]}
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
} 