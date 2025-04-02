'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import { fetchIntegrations, getMockIntegrations } from '../../../services/integrationService';

// Import components
import GeneralSection from '../../../components/integration/GeneralSection';
import InputDataSection from '../../../components/integration/InputDataSection';
import RequestSection from '../../../components/integration/RequestSection';
import ResponseSection from '../../../components/integration/ResponseSection';
import DebugSection from '../../../components/integration/DebugSection';

export default function EditIntegrationPage() {
  const params = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    integrationCode: '',
    name: '',
    description: '',
    version: '',
    active: false,
    type: '',
    input: {
      schema: {
        type: 'object',
        properties: {}
      }
    },
    request: {
      method: 'GET',
      baseUrl: '',
      path: '',
      pathParams: [],
      queryParams: [],
      headers: [],
      body: null
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
        action: 'return',
        errorMessage: '',
        errorCode: ''
      }
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState('general');
  const [inputProperties, setInputProperties] = useState([]);

  useEffect(() => {
    const loadIntegration = async () => {
      try {
        const allIntegrations = await fetchIntegrations();
        const found = allIntegrations.find(i => i.id.toString() === params.id);
        
        if (found) {
          const integration = {
            ...found,
            input: found.input || {
              schema: {
                type: 'object',
                properties: {}
              }
            },
            request: found.request || {
              method: 'GET',
              baseUrl: '',
              path: '',
              pathParams: [],
              queryParams: [],
              headers: [],
              body: null
            },
            response: found.response || {
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
                action: 'return',
                errorMessage: '',
                errorCode: ''
              }
            }
          };
          
          setFormData(integration);
          
          // Convert input properties object to array for easier form handling
          const properties = integration.input?.schema?.properties || {};
          const propsArray = Object.entries(properties).map(([name, config]) => ({
            name,
            type: config.type || 'string',
            description: config.description || '',
            required: config.required || false,
            default: config.default !== undefined ? String(config.default) : ''
          }));
          
          setInputProperties(propsArray);
        } else {
          throw new Error('Integration not found');
        }
      } catch (err) {
        const mockData = getMockIntegrations();
        const mockFound = mockData.find(i => i.id.toString() === params.id);
        
        if (mockFound) {
          const integration = {
            ...mockFound,
            input: mockFound.input || {
              schema: {
                type: 'object',
                properties: {}
              }
            },
            request: mockFound.request || {
              method: 'GET',
              baseUrl: '',
              path: '',
              pathParams: [],
              queryParams: [],
              headers: [],
              body: null
            },
            response: mockFound.response || {
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
                action: 'return',
                errorMessage: '',
                errorCode: ''
              }
            }
          };
          
          setFormData(integration);
          
          // Convert input properties object to array for easier form handling
          const properties = integration.input?.schema?.properties || {};
          const propsArray = Object.entries(properties).map(([name, config]) => ({
            name,
            type: config.type || 'string',
            description: config.description || '',
            required: config.required || false,
            default: config.default !== undefined ? String(config.default) : ''
          }));
          
          setInputProperties(propsArray);
        } else {
          setError('Integration not found');
        }
      } finally {
        setLoading(false);
      }
    };

    loadIntegration();
  }, [params.id]);

  // Convert input properties array back to object format before submission
  const prepareFormDataForSubmission = () => {
    const properties = {};
    
    inputProperties.forEach(prop => {
      properties[prop.name] = {
        type: prop.type,
        description: prop.description
      };
      
      if (prop.required) {
        properties[prop.name].required = true;
      }
      
      if (prop.default) {
        // Convert default value to appropriate type
        if (prop.type === 'boolean') {
          properties[prop.name].default = prop.default === 'true';
        } else if (prop.type === 'number' || prop.type === 'integer') {
          properties[prop.name].default = Number(prop.default);
        } else {
          properties[prop.name].default = prop.default;
        }
      }
    });
    
    return {
      ...formData,
      input: {
        schema: {
          type: 'object',
          properties
        }
      }
    };
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: field === 'active' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'active' ? checked : value
      }));
    }
  };

  const handleNestedChange = (section, subsection, field, value) => {
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
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Input properties handlers
  const handleAddInputProperty = () => {
    setInputProperties([
      ...inputProperties,
      { name: '', type: 'string', description: '', required: false, default: '' }
    ]);
  };

  const handleRemoveInputProperty = (index) => {
    setInputProperties(inputProperties.filter((_, i) => i !== index));
  };

  const handleInputPropertyChange = (index, field, value) => {
    const updatedProperties = [...inputProperties];
    updatedProperties[index] = { ...updatedProperties[index], [field]: value };
    setInputProperties(updatedProperties);
  };

  // Request handlers
  const handleAddHeader = () => {
    setFormData(prev => ({
      ...prev,
      request: {
        ...prev.request,
        headers: [...prev.request.headers, { key: '', value: '' }]
      }
    }));
  };

  const handleRemoveHeader = (index) => {
    setFormData(prev => ({
      ...prev,
      request: {
        ...prev.request,
        headers: prev.request.headers.filter((_, i) => i !== index)
      }
    }));
  };

  const handleHeaderChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      request: {
        ...prev.request,
        headers: prev.request.headers.map((header, i) => 
          i === index ? { ...header, [field]: value } : header
        )
      }
    }));
  };

  const handleAddPathParam = () => {
    setFormData(prev => ({
      ...prev,
      request: {
        ...prev.request,
        pathParams: [...prev.request.pathParams, { key: '', value: '' }]
      }
    }));
  };

  const handleRemovePathParam = (index) => {
    setFormData(prev => ({
      ...prev,
      request: {
        ...prev.request,
        pathParams: prev.request.pathParams.filter((_, i) => i !== index)
      }
    }));
  };

  const handlePathParamChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      request: {
        ...prev.request,
        pathParams: prev.request.pathParams.map((param, i) => 
          i === index ? { ...param, [field]: value } : param
        )
      }
    }));
  };

  // Response handlers
  const handleAddCondition = () => {
    setFormData(prev => ({
      ...prev,
      response: {
        ...prev.response,
        validation: {
          ...prev.response.validation,
          conditions: [...prev.response.validation.conditions, { 
            path: '', 
            operator: 'equals', 
            value: '' 
          }]
        }
      }
    }));
  };

  const handleRemoveCondition = (index) => {
    setFormData(prev => ({
      ...prev,
      response: {
        ...prev.response,
        validation: {
          ...prev.response.validation,
          conditions: prev.response.validation.conditions.filter((_, i) => i !== index)
        }
      }
    }));
  };

  const handleConditionChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      response: {
        ...prev.response,
        validation: {
          ...prev.response.validation,
          conditions: prev.response.validation.conditions.map((condition, i) => 
            i === index ? { ...condition, [field]: value } : condition
          )
        }
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = prepareFormDataForSubmission();
    console.log('Submitting updated integration:', dataToSubmit);
    alert('Integration updated (simulated)');
    router.push('/integrations');
  };

  const handleCancel = () => {
    router.push('/integrations');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error" variant="h6">Error: {error}</Typography>
        <Button variant="contained" onClick={() => router.push('/integrations')} sx={{ mt: 2 }}>
          Back to Integrations
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Edit Integration</Typography>
      
      <form onSubmit={handleSubmit}>
        <GeneralSection 
          formData={formData}
          handleChange={handleChange}
          expanded={expanded}
          handleAccordionChange={handleAccordionChange}
        />

        <InputDataSection 
          inputProperties={inputProperties}
          handleAddInputProperty={handleAddInputProperty}
          handleRemoveInputProperty={handleRemoveInputProperty}
          handleInputPropertyChange={handleInputPropertyChange}
          expanded={expanded}
          handleAccordionChange={handleAccordionChange}
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
        
        <DebugSection 
          formData={formData}
          expanded={expanded}
          handleAccordionChange={handleAccordionChange}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
          <Button variant="outlined" onClick={handleCancel}>
            Back to List
          </Button>
          <Button type="submit" variant="contained">
            Save Changes
          </Button>
        </Box>
      </form>
    </Box>
  );
} 