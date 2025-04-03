import { 
  Accordion, AccordionSummary, AccordionDetails, Typography, 
  Box, Grid, TextField, FormControlLabel, Switch
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';

export default function GeneralSection({ 
  formData, 
  handleChange, 
  errors, 
  expanded, 
  handleAccordionChange,
  isCreateMode = false // New prop to determine if we're in create mode
}) {
  return (
    <Accordion 
      expanded={expanded === 'general'} 
      onChange={handleAccordionChange('general')}
      sx={{ mb: 2 }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SettingsIcon sx={{ mr: 1 }} />
          <Typography variant="h6">General Information</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Endpoint Code"
              name="endpoint_code"
              value={formData.endpoint_code}
              onChange={handleChange}
              fullWidth
              required
              disabled={!isCreateMode} // Only disabled in edit mode
              error={!!errors.endpoint_code}
              helperText={errors.endpoint_code || 'Unique identifier for the endpoint (lowercase, no spaces)'}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              label="URL Path"
              name="url_path"
              value={formData.url_path}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.url_path}
              helperText={errors.url_path || 'Path where this endpoint will be accessible (e.g., /api/webhook)'}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              label="Version"
              name="version"
              value={formData.version}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.version}
              helperText={errors.version}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.active}
                  onChange={handleChange}
                  name="active"
                  color="primary"
                />
              }
              label="Active"
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              helperText="Optional description of what this endpoint does"
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
} 