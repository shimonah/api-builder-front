import { 
  Accordion, AccordionSummary, AccordionDetails, Typography, 
  Box, Button, List, ListItem, ListItemText, Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HistoryIcon from '@mui/icons-material/History';
import { useState, useEffect } from 'react';
import { getMockEndpointConnections } from '../../services/mockData';

export default function ConnectionsSection({ endpointId, expanded, handleAccordionChange }) {
  const [connections, setConnections] = useState([]);
  
  useEffect(() => {
    // Load connections for this endpoint
    setConnections(getMockEndpointConnections(endpointId));
  }, [endpointId]);
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };
  
  return (
    <Accordion 
      expanded={expanded === 'connections'} 
      onChange={handleAccordionChange('connections')}
      sx={{ mb: 2 }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <HistoryIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Connection History</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {connections.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No connection history for this endpoint.
          </Typography>
        ) : (
          <List>
            {connections.map((conn) => (
              <ListItem key={conn.id} divider>
                <ListItemText 
                  primary={conn.id}
                  secondary={formatDate(conn.timestamp)}
                />
                <Chip 
                  label={conn.status} 
                  color={conn.status === 'success' ? 'success' : 'error'} 
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Chip 
                  label={`${conn.duration}ms`} 
                  variant="outlined"
                  size="small"
                />
              </ListItem>
            ))}
          </List>
        )}
        <Box sx={{ mt: 2 }}>
          <Button variant="outlined" size="small">
            View All History
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
} 