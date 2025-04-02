import { 
  Grid, TextField, FormControlLabel, Switch, 
  Accordion, AccordionSummary, AccordionDetails, Typography 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function GeneralSection({ 
  formData, 
  handleChange, 
  expanded, 
  handleAccordionChange 
}) {
  return (
    <Accordion 
      expanded={expanded === 'general'} 
      onChange={handleAccordionChange('general')}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">General Information</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Integration Code"
              name="integrationCode"
              value={formData.integrationCode}
              onChange={handleChange}
              fullWidth
              required
              disabled
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
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Version"
              name="version"
              value={formData.version}
              onChange={handleChange}
              fullWidth
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
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
} 