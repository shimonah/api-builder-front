'use client';

import { useState } from 'react';
import { 
  Box, Typography, Paper, TextField, Button, Grid, 
  FormControl, InputLabel, Select, MenuItem, 
  CircularProgress, Divider, Alert
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CodeIcon from '@mui/icons-material/Code';

export default function TestPage() {
  const [selectedIntegration, setSelectedIntegration] = useState('');
  const [testInput, setTestInput] = useState('{\n  "customerId": "CUST-001",\n  "amount": 125.50,\n  "currency": "USD"\n}');
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const handleRunTest = () => {
    setIsLoading(true);
    setTestResult(null);
    
    // Simulate API call
    setTimeout(() => {
      setTestResult({
        success: true,
        duration: 235,
        statusCode: 200,
        response: {
          transactionId: "TX-12345",
          status: "approved",
          timestamp: new Date().toISOString()
        }
      });
      setIsLoading(false);
    }, 1500);
  };

  const integrations = [
    { id: 'payment-gateway', name: 'Payment Gateway' },
    { id: 'shipping-api', name: 'Shipping API' },
    { id: 'inventory-check', name: 'Inventory Check' }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Test Integrations</Typography>
      <Typography variant="body1" paragraph>
        Test your integrations with sample data and view the results.
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Test Configuration</Typography>
            
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Select Integration</InputLabel>
              <Select
                value={selectedIntegration}
                label="Select Integration"
                onChange={(e) => setSelectedIntegration(e.target.value)}
              >
                {integrations.map(integration => (
                  <MenuItem key={integration.id} value={integration.id}>
                    {integration.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <Typography variant="subtitle2" gutterBottom>Test Input</Typography>
            <TextField
              multiline
              rows={10}
              fullWidth
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              sx={{ 
                fontFamily: 'monospace',
                mb: 3
              }}
            />
            
            <Button 
              variant="contained" 
              startIcon={<PlayArrowIcon />}
              onClick={handleRunTest}
              disabled={!selectedIntegration || isLoading}
              fullWidth
            >
              {isLoading ? 'Running Test...' : 'Run Test'}
            </Button>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Test Results</Typography>
            
            {isLoading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
                <CircularProgress />
              </Box>
            )}
            
            {!isLoading && !testResult && (
              <Typography variant="body2" color="text.secondary" sx={{ my: 5, textAlign: 'center' }}>
                Run a test to see results
              </Typography>
            )}
            
            {testResult && (
              <Box>
                <Alert 
                  severity={testResult.success ? "success" : "error"}
                  sx={{ mb: 3 }}
                >
                  {testResult.success 
                    ? `Test completed successfully with status code ${testResult.statusCode}` 
                    : `Test failed with status code ${testResult.statusCode}`}
                </Alert>
                
                <Typography variant="subtitle2" gutterBottom>
                  Duration: {testResult.duration}ms
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle2" gutterBottom>
                  Response:
                </Typography>
                
                <Paper 
                  sx={{ 
                    p: 2, 
                    bgcolor: 'grey.100', 
                    fontFamily: 'monospace',
                    overflow: 'auto',
                    maxHeight: '300px'
                  }}
                >
                  <pre>{JSON.stringify(testResult.response, null, 2)}</pre>
                </Paper>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 