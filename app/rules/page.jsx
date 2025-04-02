'use client';

import { Box, Typography, Paper, List, ListItem, ListItemText, ListItemIcon, Divider, Chip } from '@mui/material';
import RuleIcon from '@mui/icons-material/Rule';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

export default function RulesPage() {
  const sampleRules = [
    { 
      id: 1, 
      name: 'Payment Validation', 
      description: 'Validates payment information before processing', 
      active: true,
      lastTriggered: '2023-05-15T14:30:00Z'
    },
    { 
      id: 2, 
      name: 'Inventory Check', 
      description: 'Checks if product is in stock before order confirmation', 
      active: true,
      lastTriggered: '2023-05-14T09:45:00Z'
    },
    { 
      id: 3, 
      name: 'Customer Verification', 
      description: 'Verifies customer identity for high-value transactions', 
      active: false,
      lastTriggered: '2023-05-10T16:20:00Z'
    },
    { 
      id: 4, 
      name: 'Shipping Rate Calculation', 
      description: 'Calculates shipping rates based on destination and weight', 
      active: true,
      lastTriggered: '2023-05-15T11:15:00Z'
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Business Rules</Typography>
      <Typography variant="body1" paragraph>
        Manage business rules that control the logic and flow of your integrations.
      </Typography>
      
      <Paper sx={{ mt: 3 }}>
        <List>
          {sampleRules.map((rule, index) => (
            <Box key={rule.id}>
              {index > 0 && <Divider />}
              <ListItem sx={{ py: 2 }}>
                <ListItemIcon>
                  <RuleIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {rule.name}
                      <Chip 
                        label={rule.active ? 'Active' : 'Inactive'} 
                        color={rule.active ? 'success' : 'default'} 
                        size="small"
                        sx={{ ml: 2 }}
                      />
                    </Box>
                  }
                  secondary={rule.description}
                />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Last triggered: {new Date(rule.lastTriggered).toLocaleString()}
                  </Typography>
                </Box>
              </ListItem>
            </Box>
          ))}
        </List>
      </Paper>
    </Box>
  );
} 