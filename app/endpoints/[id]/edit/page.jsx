'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Box, Typography, Button, Alert, Snackbar, CircularProgress
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { fetchEndpointById, updateEndpoint } from '../../../services/endpointService';

// Import section components
import GeneralSection from '../../../components/endpoint/GeneralSection';
import InputSection from '../../../components/endpoint/InputSection';
import RulesSection from '../../../components/endpoint/RulesSection';
import IntegrationsSection from '../../../components/endpoint/IntegrationsSection';
import ConnectionsSection from '../../../components/endpoint/ConnectionsSection';

export default function EditEndpointPage() {
  const params = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    endpoint_code: '',
    url_path: '',
    name: '',
    description: '',
    version: '1.0',
    active: true
  });
  
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [expanded, setExpanded] = useState('general');

  useEffect(() => {
    const loadEndpoint = async () => {
      try {
        const data = await fetchEndpointById(params.id);
        setFormData({
          endpoint_code: data.endpoint_code || '',
          url_path: data.url_path || '',
          name: data.name || '',
          description: data.description || '',
          version: data.version || '1.0',
          active: data.active !== undefined ? data.active : true
        });
      } catch (err) {
        console.error('Error loading endpoint:', err);
        setNotification({
          open: true,
          message: `Error loading endpoint: ${err.message}`,
          severity: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    loadEndpoint();
  }, [params.id]);

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
      const result = await updateEndpoint(params.id, formData);
      
      console.log('Endpoint updated:', result);
      
      setNotification({
        open: true,
        message: 'Endpoint updated successfully!',
        severity: 'success'
      });
      
      // Navigate back to endpoints list after a short delay
      setTimeout(() => {
        router.push('/endpoints');
      }, 1500);
      
    } catch (error) {
      console.error('Error updating endpoint:', error);
      setNotification({
        open: true,
        message: `Failed to update endpoint: ${error.message}`,
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
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={handleCancel}
          sx={{ mr: 2 }}
        >
          Back
        </Button>
        <Typography variant="h4">Edit Endpoint</Typography>
      </Box>
      
      <form onSubmit={handleSubmit}>
        <GeneralSection 
          formData={formData}
          handleChange={handleChange}
          errors={errors}
          expanded={expanded}
          handleAccordionChange={handleAccordionChange}
        />
        
        <InputSection 
          endpointId={params.id}
          expanded={expanded}
          handleAccordionChange={handleAccordionChange}
        />
        
        <RulesSection 
          endpointId={params.id}
          expanded={expanded}
          handleAccordionChange={handleAccordionChange}
        />
        
        <IntegrationsSection 
          endpointId={params.id}
          expanded={expanded}
          handleAccordionChange={handleAccordionChange}
        />
        
        <ConnectionsSection 
          endpointId={params.id}
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
            startIcon={<SaveIcon />}
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