'use client';

import { useState } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Chip, 
  FormControl, InputLabel, Select, MenuItem,
  TextField, Button, Grid
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function ConnectionHistoryPage() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample connection history data
  const connections = [
    { 
      id: 'conn-001', 
      integrationName: 'Payment Gateway',
      timestamp: '2023-05-15T14:30:00Z', 
      status: 'success', 
      duration: 245,
      statusCode: 200,
      endpoint: '/api/payments/process'
    },
    { 
      id: 'conn-002', 
      integrationName: 'Shipping API',
      timestamp: '2023-05-15T13:15:00Z', 
      status: 'error', 
      duration: 1245,
      statusCode: 500,
      endpoint: '/api/shipping/rates',
      errorMessage: 'Gateway timeout'
    },
    { 
      id: 'conn-003', 
      integrationName: 'Inventory Check',
      timestamp: '2023-05-15T12:45:00Z', 
      status: 'success', 
      duration: 189,
      statusCode: 200,
      endpoint: '/api/inventory/check'
    },
    { 
      id: 'conn-004', 
      integrationName: 'Customer Verification',
      timestamp: '2023-05-15T11:30:00Z', 
      status: 'warning', 
      duration: 350,
      statusCode: 207,
      endpoint: '/api/customers/verify'
    },
    { 
      id: 'conn-005', 
      integrationName: 'Payment Gateway',
      timestamp: '2023-05-15T10:15:00Z', 
      status: 'success', 
      duration: 220,
      statusCode: 200,
      endpoint: '/api/payments/process'
    }
  ];

  // Filter connections based on status and search term
  const filteredConnections = connections.filter(conn => {
    const matchesFilter = filter === 'all' || conn.status === filter;
    const matchesSearch = searchTerm === '' || 
      conn.integrationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conn.endpoint.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Connection History</Typography>
      <Typography variant="body1" paragraph>
        View the history of connections made by your integrations.
      </Typography>
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Status Filter</InputLabel>
              <Select
                value={filter}
                label="Status Filter"
                onChange={(e) => setFilter(e.target.value)}
                startAdornment={<FilterListIcon sx={{ mr: 1, color: 'text.secondary' }} />}
              >
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="success">Success</MenuItem>
                <MenuItem value="error">Error</MenuItem>
                <MenuItem value="warning">Warning</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Integration</TableCell>
              <TableCell>Endpoint</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Status Code</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredConnections.map((conn) => (
              <TableRow key={conn.id}>
                <TableCell>{conn.id}</TableCell>
                <TableCell>{conn.integrationName}</TableCell>
                <TableCell>{conn.endpoint}</TableCell>
                <TableCell>{formatDate(conn.timestamp)}</TableCell>
                <TableCell>
                  <Chip 
                    label={conn.status} 
                    color={
                      conn.status === 'success' ? 'success' : 
                      conn.status === 'error' ? 'error' : 
                      'warning'
                    } 
                    size="small"
                  />
                </TableCell>
                <TableCell>{conn.duration}ms</TableCell>
                <TableCell>{conn.statusCode}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
} 