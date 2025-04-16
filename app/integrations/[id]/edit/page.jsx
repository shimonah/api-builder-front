'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Box, Typography, Button, Alert, Snackbar, Paper, CircularProgress
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { fetchIntegrationById, updateIntegration } from '../../../services/integrationService';

// Import section components
import GeneralSection from '../../../components/integration/GeneralSection';
import RequestSection from '../../../components/integration/RequestSection';
import ResponseSection from '../../../components/integration/ResponseSection';

export default function EditIntegrationPage({ params }) {
  console.log('params', params);
  const router = useRouter();
  const { id } = params;
  const [expanded, setExpanded] = useState('general');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // Initial form data
  const [formData, setFormData] = useState({
    integrationCode: '',
    name: '',
    type: 'http',
    version: '1.0',
    active: true,
    description: '',
    request: {
      method: 'GET',
      baseUrl: '',
      path: '',
      headers: [],
      pathParams: [],
      body: ''
    },
    response: {
      expectedStatus: [200],
      validation: {
        mode: 'all',
        conditions: []
      },
      onValidationSuccess: {
        action: 'return',
        data: 'transformed'
      },
      onValidationFailure: {
        action: 'error',
        errorCode: 'VALIDATION_FAILED',
        errorMessage: 'Response validation failed'
      }
    }
  });

  useEffect(() => {
    const loadIntegration = async () => {
      setIsLoading(true);
      try {
        const data = await fetchIntegrationById(id);
        
        if (!data || Object.keys(data).length === 0) {
          setNotification({
            open: true,
            message: 'Integration not found',
            severity: 'error'
          });
          setTimeout(() => router.push('/integrations'), 2000);
          return;
        }
        
        // Ensure all required properties exist
        const integration = {
          ...formData,
          ...data,
          request: {
            ...formData.request,
            ...(data.request || {})
          },
          response: {
            ...formData.response,
            ...(data.response || {}),
            validation: {
              ...formData.response.validation,
              ...(data.response?.validation || {})
            },
            onValidationSuccess: {
              ...formData.response.onValidationSuccess,
              ...(data.response?.onValidationSuccess || {})
            },
            onValidationFailure: {
              ...formData.response.onValidationFailure,
              ...(data.response?.onValidationFailure || {})
            }
          }
        };
        
        setFormData(integration);
      } catch (error) {
        console.error('Error loading integration:', error);
        setNotification({
          open: true,
          message: `Error loading integration: ${error.message}`,
          severity: 'error'
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadIntegration();
    }
  }, [id, router]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'active' ? checked : value
    }));
  };

  const handleNestedChange = (section, subsection, field, value) => {
    if (subsection) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [subsection]: {
            ...prev[section][subsection],
            [field]: value
          }
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    }
  };

  // Header management
  const handleAddHeader = () => {
    setFormData(prev => ({
      ...prev,
      request: {
        ...prev.request,
        headers: [...(prev.request.headers || []), { key: '', value: '' }]
      }
    }));
  };

  const handleRemoveHeader = (index) => {
    setFormData(prev => {
      const newHeaders = [...(prev.request.headers || [])];
      newHeaders.splice(index, 1);
      return {
        ...prev,
        request: {
          ...prev.request,
          headers: newHeaders
        }
      };
    });
  };

  const handleHeaderChange = (index, field, value) => {
    setFormData(prev => {
      const newHeaders = [...(prev.request.headers || [])];
      newHeaders[index] = {
        ...newHeaders[index],
        [field]: value
      };
      return {
        ...prev,
        request: {
          ...prev.request,
          headers: newHeaders
        }
      };
    });
  };

  // Path parameter management
  const handleAddPathParam = () => {
    setFormData(prev => ({
      ...prev,
      request: {
        ...prev.request,
        pathParams: [...(prev.request.pathParams || []), { key: '', value: '' }]
      }
    }));
  };

  const handleRemovePathParam = (index) => {
    setFormData(prev => {
      const newParams = [...(prev.request.pathParams || [])];
      newParams.splice(index, 1);
      return {
        ...prev,
        request: {
          ...prev.request,
          pathParams: newParams
        }
      };
    });
  };

  const handlePathParamChange = (index, field, value) => {
    setFormData(prev => {
      const newParams = [...(prev.request.pathParams || [])];
      newParams[index] = {
        ...newParams[index],
        [field]: value
      };
      return {
        ...prev,
        request: {
          ...prev.request,
          pathParams: newParams
        }
      };
    });
  };

  // Validation condition management
  const handleAddCondition = () => {
    setFormData(prev => ({
      ...prev,
      response: {
        ...prev.response,
        validation: {
          ...prev.response.validation,
          conditions: [...(prev.response.validation?.conditions || []), { path: '', operator: 'equals', value: '' }]
        }
      }
    }));
  };

  const handleRemoveCondition = (index) => {
    setFormData(prev => {
      const newConditions = [...(prev.response.validation?.conditions || [])];
      newConditions.splice(index, 1);
      return {
        ...prev,
        response: {
          ...prev.response,
          validation: {
            ...prev.response.validation,
            conditions: newConditions
          }
        }
      };
    });
  };

  const handleConditionChange = (index, field, value) => {
    setFormData(prev => {
      const newConditions = [...(prev.response.validation?.conditions || [])];
      newConditions[index] = {
        ...newConditions[index],
        [field]: value
      };
      return {
        ...prev,
        response: {
          ...prev.response,
          validation: {
            ...prev.response.validation,
            conditions: newConditions
          }
        }
      };
    });
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const validateForm = () => {
    // Basic validation
    
    if (!formData.name.trim()) {
      setNotification({
        open: true,
        message: 'Name is required',
        severity: 'error'
      });
      return false;
    }
    
    if (!formData.request.baseUrl.trim()) {
      setNotification({
        open: true,
        message: 'Base URL is required',
        severity: 'error'
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Call the API to update the integration
      await updateIntegration(id, formData);
      
      setNotification({
        open: true,
        message: 'Integration updated successfully!',
        severity: 'success'
      });
      
    } catch (error) {
      console.error('Error updating integration:', error);
      setNotification({
        open: true,
        message: `Failed to update integration: ${error.message}`,
        severity: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/integrations');
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 64px)' }}>
        <CircularProgress />
      </Box>
    );
  }

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
        <Typography variant="h4">Edit Integration</Typography>
      </Box>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="body1" paragraph>
          Edit integration settings to modify how your system connects with external services.
        </Typography>
      </Paper>
      
      <form onSubmit={handleSubmit}>
        <GeneralSection 
          formData={formData}
          handleChange={handleChange}
          expanded={expanded}
          handleAccordionChange={handleAccordionChange}
          isCreateMode={false}
        />
        
        <RequestSection 
          formData={formData}
          handleNestedChange={handleNestedChange}
          handleAddHeader={handleAddHeader}
          handleRemoveHeader={handleRemoveHeader}
          handleHeaderChange={handleHeaderChange}
          handleAddPathParam={handleAddPathParam}
          handleRemovePathParam={handleRemovePathParam}
          handlePathParamChange={handlePathParamChange}
          expanded={expanded}
          handleAccordionChange={handleAccordionChange}
        />
        
        <ResponseSection 
          formData={formData}
          handleNestedChange={handleNestedChange}
          handleAddCondition={handleAddCondition}
          handleRemoveCondition={handleRemoveCondition}
          handleConditionChange={handleConditionChange}
          expanded={expanded}
          handleAccordionChange={handleAccordionChange}
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
            startIcon={isSubmitting ? <CircularProgress size={20} /> : <SaveIcon />}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
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