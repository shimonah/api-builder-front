import { 
  Accordion, AccordionSummary, AccordionDetails, Typography, 
  Box, Button, List, ListItem, ListItemText
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InputIcon from '@mui/icons-material/Input';
import { useState, useEffect } from 'react';
import { getMockEndpointInputs } from '../../services/mockData';

export default function InputSection({ endpointId, expanded, handleAccordionChange, isCreateMode = false }) {
  const [inputs, setInputs] = useState([]);
  
  useEffect(() => {
    // Only load inputs if not in create mode and we have an endpointId
    if (!isCreateMode && endpointId) {
      setInputs(getMockEndpointInputs(endpointId));
    }
  }, [endpointId, isCreateMode]);
  
  return (
    <Accordion 
      expanded={expanded === 'input'} 
      onChange={handleAccordionChange('input')}
      sx={{ mb: 2 }}
      disabled={isCreateMode} // Disable in create mode
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <InputIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Input Schemas</Typography>
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
            You'll be able to add input schemas after creating the endpoint.
          </Typography>
        ) : inputs.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No input schemas defined for this endpoint.
          </Typography>
        ) : (
          <List>
            {inputs.map((input) => (
              <ListItem key={input.id} divider>
                <ListItemText 
                  primary={input.name}
                  secondary={`Type: ${input.type} | Fields: ${input.fields}`}
                />
                <Button size="small" variant="outlined">View</Button>
              </ListItem>
            ))}
          </List>
        )}
        {!isCreateMode && (
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" size="small">
              Add Input Schema
            </Button>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
} 