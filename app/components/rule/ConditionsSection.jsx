import { 
  Box, Typography, Button, TextField, FormControl, 
  InputLabel, Select, MenuItem, IconButton, Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ConditionsSection({ 
  conditions, 
  handleConditionChange, 
  handleAddCondition, 
  handleRemoveCondition, 
  errors 
}) {
  const propertyTypes = [
    { value: 'body_json', label: 'JSON Body' },
    { value: 'body_text', label: 'Text Body' },
    { value: 'header', label: 'Header' },
    { value: 'url_parameter', label: 'URL Parameter' }
  ];

  const operators = [
    { value: 'equals', label: 'Equals' },
    { value: 'not_equals', label: 'Not Equals' },
    { value: 'contains', label: 'Contains' },
    { value: 'in', label: 'In' },
    { value: 'greater_than', label: 'Greater Than' },
    { value: 'less_than', label: 'Less Than' },
    { value: 'matches_regex', label: 'Matches Regex' }
  ];

  const transforms = [
    { value: '', label: 'None' },
    { value: 'lowercase', label: 'Lowercase' },
    { value: 'uppercase', label: 'Uppercase' },
    { value: 'trim', label: 'Trim' }
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Conditions</Typography>
        <Button 
          startIcon={<AddIcon />} 
          onClick={handleAddCondition}
          variant="outlined"
        >
          Add Condition
        </Button>
      </Box>
      
      {conditions.map((condition, index) => (
        <Box key={index} sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1">Condition {index + 1}</Typography>
            <IconButton 
              color="error" 
              onClick={() => handleRemoveCondition(index)}
              disabled={conditions.length === 1}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Property Path"
              value={condition.property_path}
              onChange={(e) => handleConditionChange(index, 'property_path', e.target.value)}
              fullWidth
              required
              error={errors?.[index]?.property_path}
              helperText={errors?.[index]?.property_path || 'e.g., order.payment.method'}
            />
            
            <FormControl fullWidth>
              <InputLabel>Property Type</InputLabel>
              <Select
                value={condition.property_type}
                onChange={(e) => handleConditionChange(index, 'property_type', e.target.value)}
                label="Property Type"
              >
                {propertyTypes.map(type => (
                  <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Operator</InputLabel>
              <Select
                value={condition.operator}
                onChange={(e) => handleConditionChange(index, 'operator', e.target.value)}
                label="Operator"
              >
                {operators.map(op => (
                  <MenuItem key={op.value} value={op.value}>{op.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <TextField
              label="Value"
              value={condition.value}
              onChange={(e) => handleConditionChange(index, 'value', e.target.value)}
              fullWidth
              required
              error={errors?.[index]?.value}
              helperText={
                errors?.[index]?.value || 
                (condition.operator === 'in' ? 'For "in" operator, use JSON array format: ["value1", "value2"]' : '')
              }
            />
          </Box>
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Transform</InputLabel>
            <Select
              value={condition.transform}
              onChange={(e) => handleConditionChange(index, 'transform', e.target.value)}
              label="Transform"
            >
              {transforms.map(transform => (
                <MenuItem key={transform.value} value={transform.value}>{transform.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Divider sx={{ my: 2 }} />
          
          <TextField
            label="Integration Code"
            value={condition.integration_code || ''}
            onChange={(e) => handleConditionChange(index, 'integration_code', e.target.value)}
            fullWidth
            required
            error={errors?.[index]?.integration_code}
            helperText={errors?.[index]?.integration_code || 'The integration to route to when this condition matches'}
          />
        </Box>
      ))}
    </Box>
  );
} 