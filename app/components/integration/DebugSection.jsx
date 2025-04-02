import { 
  Box, Typography, Button, Grid, Paper, Accordion, 
  AccordionSummary, AccordionDetails, Divider, List, 
  ListItem, ListItemText, ListItemIcon, Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import HistoryIcon from '@mui/icons-material/History';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { useState } from 'react';
import { getMockConnectionHistory, getMockTestResult } from '../../services/mockData';

export default function DebugSection({ 
  formData,
  expanded, 
  handleAccordionChange 
}) {
  const [testResults, setTestResults] = useState(null);
  const [connectionHistory, setConnectionHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [testLoading, setTestLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);

  const handleTestIntegration = () => {
    setTestLoading(true);
    setTestResults(null);
    
    // Simulate API call delay
    setTimeout(() => {
      // Get mock test result from the service
      const result = getMockTestResult(formData.id);
      setTestResults(result);
      setTestLoading(false);
    }, 1500);
  };

  const handleViewHistory = () => {
    setHistoryLoading(true);
    setShowHistory(false);
    
    // Simulate API call delay
    setTimeout(() => {
      // Get mock connection history from the service
      const history = getMockConnectionHistory(formData.id);
      setConnectionHistory(history);
      setShowHistory(true);
      setHistoryLoading(false);
    }, 1000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  return (
    <Accordion 
      expanded={expanded === 'debug'} 
      onChange={handleAccordionChange('debug')}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Debug & Testing</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" paragraph>
            Test your integration with mock data and review past connection attempts.
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item>
              <Button 
                variant="contained" 
                startIcon={<PlayArrowIcon />}
                onClick={handleTestIntegration}
                disabled={testLoading}
              >
                {testLoading ? 'Testing...' : 'Test Integration'}
              </Button>
            </Grid>
            <Grid item>
              <Button 
                variant="outlined" 
                startIcon={<HistoryIcon />}
                onClick={handleViewHistory}
                disabled={historyLoading}
              >
                {historyLoading ? 'Loading...' : 'View Connection History'}
              </Button>
            </Grid>
          </Grid>
          
          {testResults && (
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Test Results
                <Chip 
                  label={testResults.success ? 'Success' : 'Failed'} 
                  color={testResults.success ? 'success' : 'error'} 
                  size="small"
                  sx={{ ml: 2 }}
                />
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" color="text.secondary">Timestamp</Typography>
                  <Typography variant="body1">{formatDate(testResults.timestamp)}</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" color="text.secondary">Status Code</Typography>
                  <Typography variant="body1">{testResults.statusCode}</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" color="text.secondary">Duration</Typography>
                  <Typography variant="body1">{testResults.requestDuration}ms</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">Response Data</Typography>
                  <Paper 
                    sx={{ 
                      p: 1, 
                      mt: 1, 
                      bgcolor: 'grey.100', 
                      fontFamily: 'monospace',
                      overflow: 'auto',
                      maxHeight: '200px'
                    }}
                  >
                    <pre>{JSON.stringify(testResults.responseData, null, 2)}</pre>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          )}
          
          {showHistory && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Recent Connection History
              </Typography>
              <List>
                {connectionHistory.map((conn) => (
                  <Paper key={conn.id} sx={{ mb: 2 }}>
                    <ListItem>
                      <ListItemIcon>
                        {conn.status === 'success' ? 
                          <CheckCircleIcon color="success" /> : 
                          <ErrorIcon color="error" />
                        }
                      </ListItemIcon>
                      <ListItemText 
                        primary={`Connection ${conn.id}`}
                        secondary={formatDate(conn.timestamp)}
                      />
                      <Chip 
                        label={`${conn.statusCode}`} 
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
                    {conn.errorMessage && (
                      <Box sx={{ pl: 9, pr: 2, pb: 2 }}>
                        <Typography color="error" variant="body2">
                          Error: {conn.errorMessage}
                        </Typography>
                      </Box>
                    )}
                  </Paper>
                ))}
              </List>
            </Box>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
} 