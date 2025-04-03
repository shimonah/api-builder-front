'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Alert,
  IconButton,
  Grid,
  Divider,
  Chip,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CodeIcon from '@mui/icons-material/Code';
import HttpIcon from '@mui/icons-material/Http';
import DescriptionIcon from '@mui/icons-material/Description';
import SchemaIcon from '@mui/icons-material/Schema';
import { fetchInputById, deleteInput } from '../../services/inputService';

export default function ViewInputPage({ params }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  
  const [input, setInput] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    const loadInput = async () => {
      try {
        const data = await fetchInputById(id);
        setInput(data);
      } catch (err) {
        console.error('Error loading input:', err);
        setError(`Failed to load input: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadInput();
  }, [id]);

  const handleEdit = () => {
    router.push(`/inputs/${id}/edit`);
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this input?')) {
      return;
    }

    setDeleting(true);
    setError(null);
    
    try {
      await deleteInput(id);
      setDeleteSuccess(true);
      
      // Navigate back to inputs list after successful deletion
      setTimeout(() => {
        router.push('/inputs');
      }, 1500);
    } catch (err) {
      setError(`Failed to delete input: ${err.message}`);
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 64px)' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error && !input) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => router.push('/inputs')}
          sx={{ mt: 2 }}
        >
          Back to Inputs
        </Button>
      </Box>
    );
  }

  const schemaProperties = input?.schema?.properties || {};
  const propertyCount = Object.keys(schemaProperties).length;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => router.push('/inputs')} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">Input Details</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button 
          startIcon={<EditIcon />} 
          variant="outlined" 
          onClick={handleEdit}
          sx={{ mr: 1 }}
          disabled={deleting}
        >
          Edit
        </Button>
        <Button 
          startIcon={deleting ? <CircularProgress size={20} /> : <DeleteIcon />} 
          variant="outlined" 
          color="error"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? 'Deleting...' : 'Delete'}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {deleteSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Input deleted successfully!
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CodeIcon sx={{ mr: 1 }} color="primary" />
                <Typography variant="h6">Basic Information</Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Code</Typography>
                <Typography variant="body1">{input?.code}</Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">HTTP Method</Typography>
                <Chip 
                  icon={<HttpIcon />} 
                  label={input?.method} 
                  color="primary" 
                  variant="outlined" 
                  size="small"
                />
              </Box>
              
              {input?.description && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">Description</Typography>
                  <Typography variant="body1">{input.description}</Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <DescriptionIcon sx={{ mr: 1 }} color="primary" />
                <Typography variant="h6">Schema Properties</Typography>
              </Box>
              
              {propertyCount === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No properties defined for this schema.
                </Typography>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Key</strong></TableCell>
                        <TableCell><strong>Type</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(schemaProperties).map(([key, details]) => (
                        <TableRow key={key}>
                          <TableCell>{key}</TableCell>
                          <TableCell>
                            <Chip 
                              label={details.type} 
                              size="small" 
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
} 