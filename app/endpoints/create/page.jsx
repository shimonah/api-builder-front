'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Box, Typography, Button, Alert, Snackbar, Paper
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { createEndpoint } from '../../services/endpointService';

// Import section components
import GeneralSection from '../../components/endpoint/GeneralSection';
import InputSection from '../../components/endpoint/InputSection';
import RulesSection from '../../components/endpoint/RulesSection';
import IntegrationsSection from '../../components/endpoint/IntegrationsSection';

export default function CreateEndpointPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    endpoint_code: '',
    url_path: '',
    name: '',
    description: '',
    version: '1.0',
    active: true
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [expanded, setExpanded] = useState('general');

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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.endpoint_code.trim()) {
      newErrors.endpoint_code = 'Endpoint code is required';
    } else if (!/^[a-z0-9_]+$/.test(formData.endpoint_code)) {
      newErrors.endpoint_code = 'Endpoint code can only contain lowercase letters, numbers, and underscores';
    }
    
    if (!formData.url_path.trim()) {
      newErrors.url_path = 'URL path is required';
    } else if (!formData.url_path.startsWith('/')) {
      newErrors.url_path = 'URL path must start with /';
    }
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.version.trim()) {
      newErrors.version = 'Version is required';
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
      // Call the createEndpoint function from endpointService
      const result = await createEndpoint(formData);
      
      console.log('Endpoint created:', result);
      
      setNotification({
        open: true,
        message: 'Endpoint created successfully!',
        severity: 'success'
      });
      
      // Navigate to the edit page for the new endpoint after a short delay
      setTimeout(() => {
        router.push(`/endpoints/${result.id}/edit`);
      }, 1500);
      
    } catch (error) {
      console.error('Error creating endpoint:', error);
      setNotification({
        open: true,
        message: `Failed to create endpoint: ${error.message}`,
        severity: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/endpoints');
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
        <Typography variant="h4">Create New Endpoint</Typography>
      </Box>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="body1" paragraph>
          Create a new endpoint to receive data from external systems. After creation, you'll be able to configure input schemas, rules, and integrations.
        </Typography>
      </Paper>
      
      <form onSubmit={handleSubmit}>
        <GeneralSection 
          formData={formData}
          handleChange={handleChange}
          errors={errors}
          expanded={expanded}
          handleAccordionChange={handleAccordionChange}
          isCreateMode={true}
        />
        
        {/* Additional sections with disabled state */}
        <InputSection 
          endpointId={null}
          expanded={expanded}
          handleAccordionChange={handleAccordionChange}
          isCreateMode={true}
        />
        
        <RulesSection 
          endpointId={null}
          expanded={expanded}
          handleAccordionChange={handleAccordionChange}
          isCreateMode={true}
        />
        
        <IntegrationsSection 
          endpointId={null}
          expanded={expanded}
          handleAccordionChange={handleAccordionChange}
          isCreateMode={true}
        />

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
            {isSubmitting ? 'Creating...' : 'Create Endpoint'}
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