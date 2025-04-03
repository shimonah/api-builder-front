import { 
  Accordion, AccordionSummary, AccordionDetails, Typography, 
  Box, Button, List, ListItem, ListItemText, Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RuleIcon from '@mui/icons-material/Rule';
import { useState, useEffect } from 'react';
import { getMockEndpointRules } from '../../services/mockData';

export default function RulesSection({ endpointId, expanded, handleAccordionChange, isCreateMode = false }) {
  const [rules, setRules] = useState([]);
  
  useEffect(() => {
    // Only load rules if not in create mode and we have an endpointId
    if (!isCreateMode && endpointId) {
      setRules(getMockEndpointRules(endpointId));
    }
  }, [endpointId, isCreateMode]);
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };
  
  return (
    <Accordion 
      expanded={expanded === 'rules'} 
      onChange={handleAccordionChange('rules')}
      sx={{ mb: 2 }}
      disabled={isCreateMode} // Disable in create mode
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <RuleIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Rules</Typography>
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
            You'll be able to add rules after creating the endpoint.
          </Typography>
        ) : rules.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No rules defined for this endpoint.
          </Typography>
        ) : (
          <List>
            {rules.map((rule) => (
              <ListItem key={rule.id} divider>
                <ListItemText 
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {rule.name}
                      <Chip 
                        label={rule.active ? 'Active' : 'Inactive'} 
                        color={rule.active ? 'success' : 'default'} 
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    </Box>
                  }
                  secondary={`Last triggered: ${formatDate(rule.lastTriggered)}`}
                />
                <Button size="small" variant="outlined">Edit</Button>
              </ListItem>
            ))}
          </List>
        )}
        {!isCreateMode && (
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" size="small">
              Add Rule
            </Button>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
} 