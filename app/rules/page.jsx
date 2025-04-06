'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Box, Typography, Paper, CircularProgress, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RuleIcon from '@mui/icons-material/Rule';
import { fetchRules } from '../services/ruleService';

export default function RulesPage() {
  const router = useRouter();
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRules = async () => {
      try {
        setLoading(true);
        const data = await fetchRules();
        // Make sure we have an array of rules
        setRules(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error loading rules:', err);
        setError('Failed to load rules. Please try again later.');
        setRules([]);
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
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : rules.length > 0 ? (
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
                  sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
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
      ) : (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No rules found
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Create your first rule to get started.
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={() => router.push('/rules/create')}
          >
            Create New Rule
          </Button>
        </Paper>
      )}
    </Box>
  );
} 