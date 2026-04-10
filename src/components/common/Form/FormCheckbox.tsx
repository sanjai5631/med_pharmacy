import React from 'react';
import { FormControlLabel, Checkbox, FormControl, FormHelperText } from '@mui/material';
import { Controller } from 'react-hook-form';

interface FormCheckboxProps {
  name: string;
  label: string;
  control: any;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({ name, label, control }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={!!error} component="fieldset">
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label={label}
          />
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
