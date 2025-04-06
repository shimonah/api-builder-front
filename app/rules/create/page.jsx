'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box, Typography, Paper, Button, TextField, FormControlLabel,
  Switch, Divider, IconButton, MenuItem, Select, FormControl,
  InputLabel, Grid, Card, CardContent, Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import { createRule } from '@/app/services/ruleService';

export default function CreateRulePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  
  const [rule, setRule] = useState({
    name: '',
    description: '',
    active: true,
    logical_operator: 'AND',
    conditions: [
      {
        property_value: '',
        property_type: 'body_json',
        operator: 'equals',
        value: '',
        transform: ''
      }
    ],
    integration_code: ''
  });

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'active') {
      setRule({ ...rule, [name]: checked });
    } else {
      setRule({ ...rule, [name]: value });
    }
  };

  const handleConditionChange = (index, field, value) => {
    const updatedConditions = [...rule.conditions];
    updatedConditions[index] = {
      ...updatedConditions[index],
      [field]: value
    };
    setRule({ ...rule, conditions: updatedConditions });
  };

  const addCondition = () => {
    setRule({
      ...rule,
      conditions: [
        ...rule.conditions,
        {
          property_value: '',
          property_type: 'body_json',
          operator: 'equals',
          value: '',
          transform: ''
        }
      ]
    });
  };

  const removeCondition = (index) => {
    if (rule.conditions.length > 1) {
      const updatedConditions = rule.conditions.filter((_, i) => i !== index);
      setRule({ ...rule, conditions: updatedConditions });
    }
  };

  const handleCancel = () => {
    router.push('/rules');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      // Create a new rule object that matches the expected format
      const ruleData = {
        name: rule.name,
        description: rule.description,
        active: rule.active,
        logical_operator: rule.logical_operator,
        conditions: rule.conditions,
        integration_code: rule.integration_code
      };

      // Call the createRule service function
      await createRule(ruleData);
      
      router.push('/rules');
    } catch (err) {
      console.error('Error saving rule:', err);
      setError('Failed to save rule. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const propertyTypes = [
    { value: 'body_json', label: 'JSON Body' },
    { value: 'query_param', label: 'Query Parameter' },
    { value: 'header', label: 'Header' },
    { value: 'path', label: 'URL Path' }
  ];

  const operators = [
    { value: 'equals', label: 'Equals' },
    { value: 'not_equals', label: 'Not Equals' },
    { value: 'contains', label: 'Contains' },
    { value: 'greater_than', label: 'Greater Than' },
    { value: 'less_than', label: 'Less Than' },
    { value: 'in', label: 'In List' },
    { value: 'not_in', label: 'Not In List' }
  ];

  const transforms = [
    { value: '', label: 'None' },
    { value: 'lowercase', label: 'Lowercase' },
    { value: 'uppercase', label: 'Uppercase' },
    { value: 'number', label: 'Number' },
    { value: 'boolean', label: 'Boolean' },
    { value: 'trim', label: 'Trim' }
  ];

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={handleCancel} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">Create New Rule</Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Basic Information</Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Rule Name"
              name="name"
              value={rule.name}
              onChange={handleInputChange}
              margin="normal"
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={rule.active}
                  onChange={handleInputChange}
                  name="active"
                  color="primary"
                />
              }
              label="Active"
              sx={{ mt: 2 }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={rule.description}
              onChange={handleInputChange}
              margin="normal"
              multiline
              rows={2}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Integration Code"
              name="integration_code"
              value={rule.integration_code}
              onChange={handleInputChange}
              margin="normal"
              helperText="The service that will handle requests matching this rule"
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="logical-operator-label">Logical Operator</InputLabel>
              <Select
                labelId="logical-operator-label"
                name="logical_operator"
                value={rule.logical_operator}
                onChange={handleInputChange}
                label="Logical Operator"
              >
                <MenuItem value="AND">AND (All conditions must match)</MenuItem>
                <MenuItem value="OR">OR (Any condition can match)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Conditions</Typography>
          <Button 
            startIcon={<AddIcon />} 
            onClick={addCondition}
            variant="outlined"
          >
            Add Condition
          </Button>
        </Box>

        {rule.conditions.map((condition, index) => (
          <Card key={index} sx={{ mb: 2, position: 'relative' }}>
            <CardContent>
              <IconButton 
                sx={{ position: 'absolute', top: 8, right: 8 }}
                onClick={() => removeCondition(index)}
                disabled={rule.conditions.length <= 1}
              >
                <DeleteIcon />
              </IconButton>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Property Path"
                    value={condition.property_value}
                    onChange={(e) => handleConditionChange(index, 'property_value', e.target.value)}
                    helperText="e.g., order.payment.method"
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Property Type</InputLabel>
                    <Select
                      value={condition.property_type}
                      onChange={(e) => handleConditionChange(index, 'property_type', e.target.value)}
                      label="Property Type"
                    >
                      {propertyTypes.map(type => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Operator</InputLabel>
                    <Select
                      value={condition.operator}
                      onChange={(e) => handleConditionChange(index, 'operator', e.target.value)}
                      label="Operator"
                    >
                      {operators.map(op => (
                        <MenuItem key={op.value} value={op.value}>
                          {op.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    required
                    label="Value"
                    value={condition.value}
                    onChange={(e) => handleConditionChange(index, 'value', e.target.value)}
                  />
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Transform</InputLabel>
                    <Select
                      value={condition.transform}
                      onChange={(e) => handleConditionChange(index, 'transform', e.target.value)}
                      label="Transform"
                    >
                      {transforms.map(transform => (
                        <MenuItem key={transform.value} value={transform.value}>
                          {transform.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button 
          variant="outlined" 
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          variant="contained" 
          startIcon={<SaveIcon />}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Rule'}
        </Button>
      </Box>
    </Box>
  );
} 