import { 
  Accordion, AccordionSummary, AccordionDetails, Typography, 
  Box, Button, List, ListItem, ListItemText, Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import { useState, useEffect } from 'react';
import { getMockEndpointIntegrations } from '../../services/mockData';

export default function IntegrationsSection({ endpointId, expanded, handleAccordionChange, isCreateMode = false }) {
  const [integrations, setIntegrations] = useState([]);
  
  useEffect(() => {
    // Only load integrations if not in create mode and we have an endpointId
    if (!isCreateMode && endpointId) {
      setIntegrations(getMockEndpointIntegrations(endpointId));
    }
  }, [endpointId, isCreateMode]);
  
  return (
    <Accordion 
      expanded={expanded === 'integrations'} 
      onChange={handleAccordionChange('integrations')}
      sx={{ mb: 2 }}
      disabled={isCreateMode} // Disable in create mode
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IntegrationInstructionsIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Linked Integrations</Typography>
          {isCreateMode && (
            <Typography variant="caption" sx={{ ml: 2, color: 'text.secondary' }}>
              (Available after creation)
            </Typography>
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {isCreateMode ? (
          <Typography variant="body2" color="text.secondary">
            You'll be able to link integrations after creating the endpoint.
          </Typography>
        ) : integrations.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No integrations linked to this endpoint.
          </Typography>
        ) : (
          <List>
            {integrations.map((integration) => (
              <ListItem key={integration.id} divider>
                <ListItemText 
                  primary={integration.name}
                  secondary={`Type: ${integration.type}`}
                />
                <Chip 
                  label={integration.active ? 'Active' : 'Inactive'} 
                  color={integration.active ? 'success' : 'default'} 
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Button size="small" variant="outlined">View</Button>
              </ListItem>
            ))}
          </List>
        )}
        {!isCreateMode && (
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" size="small">
              Link Integration
            </Button>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
} 