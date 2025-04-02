import { 
  Box, Typography, Button, Paper, Grid, TextField, 
  FormControl, InputLabel, Select, MenuItem, FormControlLabel, 
  Switch, IconButton, Accordion, AccordionSummary, AccordionDetails 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function InputDataSection({ 
  inputProperties, 
  handleAddInputProperty, 
  handleRemoveInputProperty, 
  handleInputPropertyChange, 
  expanded, 
  handleAccordionChange 
}) {
  return (
    <Accordion 
      expanded={expanded === 'input'} 
      onChange={handleAccordionChange('input')}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Input Data</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" paragraph>
            Define the input schema for this integration. This describes the data that users need to provide when executing the integration.
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle1">Input Properties</Typography>
          <Button 
            startIcon={<AddIcon />} 
            onClick={handleAddInputProperty}
            size="small"
          >
            Add Property
          </Button>
        </Box>
        
        {inputProperties.length === 0 ? (
          <Typography variant="body2" color="text.secondary">No input properties defined</Typography>
        ) : (
          inputProperties.map((property, index) => (
            <Paper key={index} sx={{ p: 2, mb: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Property Name"
                    value={property.name}
                    onChange={(e) => handleInputPropertyChange(index, 'name', e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select
                      value={property.type}
                      label="Type"
                      onChange={(e) => handleInputPropertyChange(index, 'type', e.target.value)}
                    >
                      <MenuItem value="string">String</MenuItem>
                      <MenuItem value="number">Number</MenuItem>
                      <MenuItem value="integer">Integer</MenuItem>
                      <MenuItem value="boolean">Boolean</MenuItem>
                      <MenuItem value="array">Array</MenuItem>
                      <MenuItem value="object">Object</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    value={property.description}
                    onChange={(e) => handleInputPropertyChange(index, 'description', e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Default Value"
                    value={property.default}
                    onChange={(e) => handleInputPropertyChange(index, 'default', e.target.value)}
                    fullWidth
                    helperText={`Default value for this ${property.type}`}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={property.required}
                        onChange={(e) => handleInputPropertyChange(index, 'required', e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Required"
                  />
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button 
                    startIcon={<DeleteIcon />} 
                    color="error"
                    onClick={() => handleRemoveInputProperty(index)}
                  >
                    Remove
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          ))
        )}
      </AccordionDetails>
    </Accordion>
  );
} 