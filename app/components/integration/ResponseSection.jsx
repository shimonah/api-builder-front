import { 
  Box, Typography, Button, Grid, TextField, 
  FormControl, InputLabel, Select, MenuItem, IconButton,
  Accordion, AccordionSummary, AccordionDetails, Divider 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ResponseSection({ 
  formData, 
  handleNestedChange, 
  handleAddCondition, 
  handleRemoveCondition, 
  handleConditionChange, 
  expanded, 
  handleAccordionChange 
}) {
  return (
    <Accordion 
      expanded={expanded === 'response'} 
      onChange={handleAccordionChange('response')}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Response Configuration</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Expected Status Codes (comma separated)"
              value={formData.response.expectedStatus.join(',')}
              onChange={(e) => {
                const statusCodes = e.target.value
                  .split(',')
                  .map(code => parseInt(code.trim()))
                  .filter(code => !isNaN(code));
                handleNestedChange('response', null, 'expectedStatus', statusCodes);
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Validation Mode</InputLabel>
              <Select
                value={formData.response.validation.mode}
                label="Validation Mode"
                onChange={(e) => handleNestedChange('response', 'validation', 'mode', e.target.value)}
              >
                <MenuItem value="all">All conditions must pass</MenuItem>
                <MenuItem value="any">Any condition must pass</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1">Validation Conditions</Typography>
              <Button 
                startIcon={<AddIcon />} 
                onClick={handleAddCondition}
                size="small"
              >
                Add Condition
              </Button>
            </Box>
            {formData.response.validation.conditions.length === 0 ? (
              <Typography variant="body2" color="text.secondary">No validation conditions defined</Typography>
            ) : (
              formData.response.validation.conditions.map((condition, index) => (
                <Box key={index} sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
                  <TextField
                    label="Path"
                    value={condition.path}
                    onChange={(e) => handleConditionChange(index, 'path', e.target.value)}
                    sx={{ mr: 2, flex: 2 }}
                  />
                  <FormControl sx={{ mr: 2, flex: 1 }}>
                    <InputLabel>Operator</InputLabel>
                    <Select
                      value={condition.operator}
                      label="Operator"
                      onChange={(e) => handleConditionChange(index, 'operator', e.target.value)}
                    >
                      <MenuItem value="equals">equals</MenuItem>
                      <MenuItem value="notEquals">not equals</MenuItem>
                      <MenuItem value="contains">contains</MenuItem>
                      <MenuItem value="greaterThan">greater than</MenuItem>
                      <MenuItem value="lessThan">less than</MenuItem>
                      <MenuItem value="exists">exists</MenuItem>
                      <MenuItem value="regex">regex</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    label="Value"
                    value={condition.value}
                    onChange={(e) => handleConditionChange(index, 'value', e.target.value)}
                    sx={{ mr: 2, flex: 1 }}
                  />
                  <IconButton 
                    color="error" 
                    onClick={() => handleRemoveCondition(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))
            )}
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>On Validation Success</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Action</InputLabel>
                  <Select
                    value={formData.response.onValidationSuccess.action}
                    label="Action"
                    onChange={(e) => handleNestedChange('response', 'onValidationSuccess', 'action', e.target.value)}
                  >
                    <MenuItem value="return">Return</MenuItem>
                    <MenuItem value="forward">Forward</MenuItem>
                    <MenuItem value="notify">Notify</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Data</InputLabel>
                  <Select
                    value={formData.response.onValidationSuccess.data}
                    label="Data"
                    onChange={(e) => handleNestedChange('response', 'onValidationSuccess', 'data', e.target.value)}
                  >
                    <MenuItem value="transformed">Transformed</MenuItem>
                    <MenuItem value="original">Original</MenuItem>
                    <MenuItem value="custom">Custom</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>On Validation Failure</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Action</InputLabel>
                  <Select
                    value={formData.response.onValidationFailure.action}
                    label="Action"
                    onChange={(e) => handleNestedChange('response', 'onValidationFailure', 'action', e.target.value)}
                  >
                    <MenuItem value="return">Return</MenuItem>
                    <MenuItem value="error">Error</MenuItem>
                    <MenuItem value="forward">Forward</MenuItem>
                    <MenuItem value="notify">Notify</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Error Code"
                  value={formData.response.onValidationFailure.errorCode}
                  onChange={(e) => handleNestedChange('response', 'onValidationFailure', 'errorCode', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Error Message"
                  value={formData.response.onValidationFailure.errorMessage}
                  onChange={(e) => handleNestedChange('response', 'onValidationFailure', 'errorMessage', e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
} 