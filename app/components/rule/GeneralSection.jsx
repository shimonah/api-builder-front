import { 
  Box, Typography, TextField, FormControlLabel, Switch
} from '@mui/material';

export default function GeneralSection({ 
  formData, 
  handleChange, 
  errors 
}) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>General Information</Typography>
      
      <TextField
        label="Rule Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
        error={!!errors.name}
        helperText={errors.name || ''}
        sx={{ mb: 2 }}
      />
      
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        multiline
        rows={2}
        sx={{ mb: 2 }}
      />
      
      <TextField
        label="Priority"
        name="priority"
        type="number"
        value={formData.priority}
        onChange={handleChange}
        fullWidth
        required
        helperText="Higher numbers have higher priority"
        sx={{ mb: 2 }}
      />
      
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
    </Box>
  );
} 