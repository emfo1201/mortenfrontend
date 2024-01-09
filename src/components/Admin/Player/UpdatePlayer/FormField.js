// FormField.js
import React from 'react';
import TextField from '@material-ui/core/TextField';

function FormField({ name, label, value, onChange }) {
  return (
    <TextField
      fullWidth
      name={name}
      label={label}
      variant="outlined"
      value={value}
      onChange={onChange}
    />
  );
}

export default FormField;