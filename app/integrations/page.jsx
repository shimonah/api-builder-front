'use client';

import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, CircularProgress } from '@mui/material';

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const fetchIntegrations = async () => {
      try {
        console.log('Attempting to fetch from API...');
        const response = await fetch('http://127.0.0.1:3073/api/integration/list');
        
        if (!response.ok) {
          console.error('Response not OK:', response.status, response.statusText);
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        
        console.log('Fetch successful, parsing JSON...');
        const data = await response.json();
        console.log('Data received:', data);
        setIntegrations(data);
      } catch (err) {
        console.error('Fetch error details:', err);
        
        // Use mock data if the fetch fails
        const mockData = [
          {
            id: 1,
            integrationCode: "mock",
            name: "Payment Transaction Check Test",
            active: true,
            type: "rest",
            updatedAt: "2025-04-01T10:00:00.000Z"
          }
        ];
        
        setIntegrations(mockData);
      } finally {
        setLoading(false);
      }
    };

    fetchIntegrations();
  }, []);

  // Don't render anything on the server
  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {integrations.map((integration) => (
              <TableRow key={integration.id}>
                <TableCell>{integration.integrationCode}</TableCell>
                <TableCell>{integration.name}</TableCell>
                <TableCell align="center">{integration.active ? 'Yes' : 'No'}</TableCell>
                <TableCell>{integration.type}</TableCell>
                <TableCell>
                  {new Date(integration.updatedAt).toISOString().split('T')[0]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
} 