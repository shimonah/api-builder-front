'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  IconButton,
  Grid,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchInputById, updateInput } from '../../../services/inputService';

const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
const DATA_TYPES = ['string', 'number', 'boolean', 'object', 'array', 'integer'];

export default function EditInputPage({ params }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const [inputData, setInputData] = useState({
    code: '',
    description: '',
    method: 'POST',
    schema: {
      type: 'object',
      properties: {}
    }
  });
  
  const [properties, setProperties] = useState([
    { key: '', type: 'string' }
  ]);

  useEffect(() => {
    const loadInput = async () => {
      try {
        const data = await fetchInputById(id);
        setInputData({
          code: data.code || '',
          description: data.description || '',
          method: data.method || 'POST',
          schema: data.schema || { type: 'object', properties: {} }
        });
        
        // Convert schema properties to array format for the form
        if (data.schema && data.schema.properties) {
          const propsArray = Object.entries(data.schema.properties).map(([key, value]) => ({
            key,
            type: value.type || 'string'
          }));
          
          setProperties(propsArray.length > 0 ? propsArray : [{ key: '', type: 'string' }]);
        }
        
      } catch (err) {
        console.error('Error loading input:', err);
        setError(`Failed to load input: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadInput();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value
    });
  };

  const handlePropertyChange = (index, field, value) => {
    const updatedProperties = [...properties];
    updatedProperties[index][field] = value;
    setProperties(updatedProperties);
  };

  const addProperty = () => {
    setProperties([
      ...properties,
      { key: '', type: 'string' }
    ]);
  };

  const removeProperty = (index) => {
    const updatedProperties = [...properties];
    updatedProperties.splice(index, 1);
    setProperties(updatedProperties);
  };

  const buildSchemaFromProperties = () => {
    const schemaProperties = {};

    properties.forEach(prop => {
      if (prop.key) {
        schemaProperties[prop.key] = {
          type: prop.type
        };
      }
    });

    return {
      type: 'object',
      properties: schemaProperties
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      // Build the complete input data with schema
      const schema = buildSchemaFromProperties();
      const completeInputData = {
        ...inputData,
        schema
      };

      await updateInput(id, completeInputData);
      setSuccess(true);
      
      // Navigate back to inputs list after successful update
      setTimeout(() => {
        router.push('/inputs');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to update input');
    } finally {
      setSaving(false);
    }
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
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => router.push('/inputs')} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">Edit Input</Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Input updated successfully!
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Code"
                name="code"
                value={inputData.code}
                onChange={handleInputChange}
                fullWidth
                required
                helperText="Unique identifier for the input"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Method</InputLabel>
                <Select
                  name="method"
                  value={inputData.method}
                  onChange={handleInputChange}
                  label="Method"
                >
                  {HTTP_METHODS.map(method => (
                    <MenuItem key={method} value={method}>{method}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={inputData.description}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={2}
                helperText="Optional description of the input"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Schema Properties</Typography>
                <Button 
                  startIcon={<AddIcon />} 
                  onClick={addProperty}
                  variant="outlined"
                  size="small"
                >
                  Add Property
                </Button>
              </Box>
              
              {properties.map((property, index) => (
                <Box key={index} sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Key"
                        value={property.key}
                        onChange={(e) => handlePropertyChange(index, 'key', e.target.value)}
                        fullWidth
                        required
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth required>
                        <InputLabel>Type</InputLabel>
                        <Select
                          value={property.type}
                          onChange={(e) => handlePropertyChange(index, 'type', e.target.value)}
                          label="Type"
                        >
                          {DATA_TYPES.map(type => (
                            <MenuItem key={type} value={type}>{type}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={12} display="flex" justifyContent="flex-end">
                      <IconButton 
                        color="error" 
                        onClick={() => removeProperty(index)}
                        disabled={properties.length === 1}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              ))}
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                <Button 
                  variant="outlined" 
                  onClick={() => router.push('/inputs')} 
                  sx={{ mr: 2 }}
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="contained" 
                  disabled={saving}
                  startIcon={saving ? <CircularProgress size={20} /> : null}
                >
                  {saving ? 'Saving...' : 'Save'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
} 