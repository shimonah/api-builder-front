import { 
  Box, Typography, Button, Grid, TextField, 
  FormControl, InputLabel, Select, MenuItem, IconButton,
  Accordion, AccordionSummary, AccordionDetails 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function RequestSection({ 
  formData, 
  handleNestedChange, 
  handleAddHeader, 
  handleRemoveHeader, 
  handleHeaderChange, 
  handleAddPathParam, 
  handleRemovePathParam, 
  handlePathParamChange, 
  expanded, 
  handleAccordionChange 
}) {
  const isPostMethod = formData.request.method === 'POST';

  return (
    <Accordion 
      expanded={expanded === 'request'} 
      onChange={handleAccordionChange('request')}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Request Configuration</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="request-method-label">Method</InputLabel>
              <Select
                labelId="request-method-label"
                id="request-method"
                value={formData.request.method}
                label="Method"
                onChange={(e) => handleNestedChange('request', null, 'method', e.target.value)}
              >
                <MenuItem value="GET">GET</MenuItem>
                <MenuItem value="POST">POST</MenuItem>
                <MenuItem value="PUT">PUT</MenuItem>
                <MenuItem value="DELETE">DELETE</MenuItem>
                <MenuItem value="PATCH">PATCH</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Base URL"
              value={formData.request.baseUrl}
              onChange={(e) => handleNestedChange('request', null, 'baseUrl', e.target.value)}
              fullWidth
              required
              placeholder="https://api.example.com"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Path"
              value={formData.request.path}
              onChange={(e) => handleNestedChange('request', null, 'path', e.target.value)}
              fullWidth
              placeholder="/v1/resource/{id}"
              helperText="Use {paramName} for path parameters"
            />
          </Grid>

          {/* Body field for POST requests */}
          {isPostMethod && (
            <Grid item xs={12}>
              <TextField
                label="Request Body"
                value={formData.request.body || ''}
                onChange={(e) => handleNestedChange('request', null, 'body', e.target.value)}
                fullWidth
                multiline
                rows={5}
                placeholder='{"key": "value"}'
                helperText="Enter JSON request body"
              />
            </Grid>
          )}
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1">Headers</Typography>
              <Button 
                startIcon={<AddIcon />} 
                onClick={handleAddHeader}
                size="small"
              >
                Add Header
              </Button>
            </Box>
            {formData.request.headers.length === 0 ? (
              <Typography variant="body2" color="text.secondary">No headers defined</Typography>
            ) : (
              formData.request.headers.map((header, index) => (
                <Box key={index} sx={{ display: 'flex', mb: 2 }}>
                  <TextField
                    label="Key"
                    value={header.key}
                    onChange={(e) => handleHeaderChange(index, 'key', e.target.value)}
                    sx={{ mr: 2, flex: 1 }}
                  />
                  <TextField
                    label="Value"
                    value={header.value}
                    onChange={(e) => handleHeaderChange(index, 'value', e.target.value)}
                    sx={{ mr: 2, flex: 1 }}
                  />
                  <IconButton 
                    color="error" 
                    onClick={() => handleRemoveHeader(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))
            )}
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1">Path Parameters</Typography>
              <Button 
                startIcon={<AddIcon />} 
                onClick={handleAddPathParam}
                size="small"
              >
                Add Parameter
              </Button>
            </Box>
            {formData.request.pathParams.length === 0 ? (
              <Typography variant="body2" color="text.secondary">No path parameters defined</Typography>
            ) : (
              formData.request.pathParams.map((param, index) => (
                <Box key={index} sx={{ display: 'flex', mb: 2 }}>
                  <TextField
                    label="Key"
                    value={param.key}
                    onChange={(e) => handlePathParamChange(index, 'key', e.target.value)}
                    sx={{ mr: 2, flex: 1 }}
                  />
                  <TextField
                    label="Value"
                    value={param.value}
                    onChange={(e) => handlePathParamChange(index, 'value', e.target.value)}
                    sx={{ mr: 2, flex: 1 }}
                  />
                  <IconButton 
                    color="error" 
                    onClick={() => handleRemovePathParam(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))
            )}
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
} 