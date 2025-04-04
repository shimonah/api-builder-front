'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Box, Typography, Button, Alert, Snackbar, Paper
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { createRule } from '../../services/ruleService';

// Import components
import GeneralSection from '../../components/rule/GeneralSection';
import ConditionsSection from '../../components/rule/ConditionsSection';
import LogicalOperatorSelector from '../../components/rule/LogicalOperatorSelector';

export default function CreateRulePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logical_operator: 'AND',
    conditions: [
      {
        property_path: '',
        property_type: 'body_json',
        operator: 'equals',
        value: '',
        transform: '',
        integration_code: ''
      }
    ],
    priority: 100,
    active: true
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'active' ? checked : value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleConditionChange = (index, field, value) => {
    const updatedConditions = [...formData.conditions];
    updatedConditions[index] = { ...updatedConditions[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      conditions: updatedConditions
    }));
  };

  const handleAddCondition = () => {
    setFormData(prev => ({
      ...prev,
      conditions: [
        ...prev.conditions,
        {
          property_path: '',
          property_type: 'body_json',
          operator: 'equals',
          value: '',
          transform: '',
          integration_code: ''
        }
      ]
    }));
  };

  const handleRemoveCondition = (index) => {
    if (formData.conditions.length === 1) {
      return; // Don't remove the last condition
    }
    
    const updatedConditions = [...formData.conditions];
    updatedConditions.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      conditions: updatedConditions
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Rule name is required';
    }
    
    // Validate conditions
    const conditionErrors = [];
    formData.conditions.forEach((condition, index) => {
      const condError = {};
      
      if (!condition.property_path.trim()) {
        condError.property_path = 'Property path is required';
      }
      
      if (!condition.integration_code?.trim()) {
        condError.integration_code = 'Integration code is required';
      }
      
      if (condition.operator === 'in' && typeof condition.value === 'string') {
        try {
          // Try to parse as JSON array
          JSON.parse(condition.value);
        } catch (e) {
          condError.value = 'Invalid JSON array format';
        }
      }
      
      if (Object.keys(condError).length > 0) {
        conditionErrors[index] = condError;
      }
    });
    
    if (conditionErrors.length > 0) {
      newErrors.conditions = conditionErrors;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Process the form data
      const processedFormData = {
        ...formData,
        conditions: formData.conditions.map(condition => {
          if (condition.operator === 'in' && typeof condition.value === 'string') {
            return {
              ...condition,
              value: JSON.parse(condition.value)
            };
          }
          return condition;
        })
      };
      
      const result = await createRule(processedFormData);
      
      setNotification({
        open: true,
        message: 'Rule created successfully!',
        severity: 'success'
      });
      
      // Navigate back to rules list after a short delay
      setTimeout(() => {
        router.push('/rules');
      }, 1500);
      
    } catch (error) {
      console.error('Error creating rule:', error);
      setNotification({
        open: true,
        message: `Failed to create rule: ${error.message}`,
        severity: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/rules');
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={handleCancel}
          sx={{ mr: 2 }}
        >
          Back
        </Button>
        <Typography variant="h4">Create New Rule</Typography>
      </Box>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="body1" paragraph>
          Create a new rule to determine how incoming requests are routed to integrations.
        </Typography>
      </Paper>
      
      <form onSubmit={handleSubmit}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <GeneralSection 
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
        </Paper>
        
        <Paper sx={{ p: 3, mb: 3 }}>
          <LogicalOperatorSelector 
            value={formData.logical_operator}
            onChange={handleChange}
          />
          
          <ConditionsSection 
            formData={formData}
            handleConditionChange={handleConditionChange}
            handleAddCondition={handleAddCondition}
            handleRemoveCondition={handleRemoveCondition}
            errors={errors}
          />
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
          <Button 
            variant="outlined" 
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            startIcon={<SaveIcon />}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Rule'}
          </Button>
        </Box>
      </form>
      
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
} 