'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Box, Typography, Paper, CircularProgress, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { fetchEndpoints } from '../services/endpointService';

export default function EndpointsPage() {
  const router = useRouter();
  const [endpoints, setEndpoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const loadEndpoints = async () => {
      try {
        const data = await fetchEndpoints();
        setEndpoints(data);
      } catch (err) {
        console.error('Error fetching endpoints:', err);
        // Fallback to mock data if API fails
        setEndpoints([]);
      } finally {
        setLoading(false);
      }
    };

    loadEndpoints();
  }, []);

  const handleRowClick = (endpoint) => {
    // Navigate to endpoint details page (to be implemented)
    router.push(`/endpoints/${endpoint.id}`);
  };

  const handleEdit = (e, endpoint) => {
    e.stopPropagation(); // Prevent row click from triggering
    router.push(`/endpoints/${endpoint.id}/edit`);
  };
  
  const handleCreateNew = () => {
    // Navigate to endpoint creation page (to be implemented)
    router.push('/endpoints/create');
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Endpoints</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleCreateNew}
        >
          Create New Endpoint
        </Button>
      </Box>
      
      <Typography variant="body1" paragraph>
        Manage your API endpoints that other systems can connect to.
      </Typography>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="endpoints table">
          <TableHead>
            <TableRow>
              <TableCell>Endpoint Code</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>URL Path</TableCell>
              <TableCell align="center">Active</TableCell>
              <TableCell>Version</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {endpoints.map((endpoint) => (
              <TableRow 
                key={endpoint.id}
                onClick={() => handleRowClick(endpoint)}
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                }}
              >
                <TableCell>{endpoint.endpoint_code}</TableCell>
                <TableCell>{endpoint.name}</TableCell>
                <TableCell>{endpoint.url_path}</TableCell>
                <TableCell align="center">
                  <Chip 
                    label={endpoint.active ? 'Active' : 'Inactive'} 
                    color={endpoint.active ? 'success' : 'default'} 
                    size="small"
                  />
                </TableCell>
                <TableCell>{endpoint.version}</TableCell>
                <TableCell>
                  {new Date(endpoint.updatedAt).toISOString().split('T')[0]}
                </TableCell>
                <TableCell align="center">
                  <Button 
                    variant="contained" 
                    size="small" 
                    onClick={(e) => handleEdit(e, endpoint)}
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