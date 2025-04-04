import { 
  Box, Typography, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';

export default function LogicalOperatorSelector({ 
  value, 
  onChange 
}) {
  return (
    <Box sx={{ mb: 3 }}>
      <FormControl fullWidth>
        <InputLabel>Logical Operator</InputLabel>
        <Select
          name="logical_operator"
          value={value}
          onChange={onChange}
          label="Logical Operator"
        >
          <MenuItem value="AND">AND (All conditions must match)</MenuItem>
          <MenuItem value="OR">OR (Any condition can match)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
} 