'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Box, Typography, Paper, CircularProgress, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RuleIcon from '@mui/icons-material/Rule';
import { fetchRules, getMockRules } from '../services/ruleService';

export default function RulesPage() {
  const router = useRouter();
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRules = async () => {
      try {
        const data = await fetchRules();
        setRules(data);
      } catch (err) {
        console.error('Error fetching rules:', err);
        // Fallback to mock data if API fails
        setRules(getMockRules());
      } finally {
        setLoading(false);
      }
    };

    loadRules();
  }, []);

  const handleRowClick = (rule) => {
    router.push(`/rules/${rule.id}`);
  };

  const handleEdit = (e, rule) => {
    e.stopPropagation(); // Prevent row click from triggering
    router.push(`/rules/${rule.id}/edit`);
  };
  
  const handleCreateNew = () => {
    router.push('/rules/create');
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
        <Typography variant="h4">Rules</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleCreateNew}
        >
          Create New Rule
        </Button>
      </Box>
      
      <Typography variant="body1" paragraph>
        Manage routing rules that determine how incoming requests are processed.
      </Typography>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="rules table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Conditions</TableCell>
              <TableCell>Integration</TableCell>
              <TableCell align="center">Priority</TableCell>
              <TableCell align="center">Active</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rules.map((rule) => (
              <TableRow 
                key={rule.id}
                onClick={() => handleRowClick(rule)}
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                }}
              >
                <TableCell>{rule.name}</TableCell>
                <TableCell>{rule.description}</TableCell>
                <TableCell>{rule.conditions?.length || 0}</TableCell>
                <TableCell>{rule.integration_code}</TableCell>
                <TableCell align="center">{rule.priority}</TableCell>
                <TableCell align="center">
                  <Chip 
                    label={rule.active ? 'Active' : 'Inactive'} 
                    color={rule.active ? 'success' : 'default'} 
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Button 
                    variant="contained" 
                    size="small" 
                    onClick={(e) => handleEdit(e, rule)}
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