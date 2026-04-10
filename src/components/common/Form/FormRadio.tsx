import React from 'react';
import { 
  FormControl, 
  FormLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  FormHelperText 
} from '@mui/material';
import { Controller } from 'react-hook-form';

interface Option {
  label: string;
  value: string | number;
}

interface FormRadioProps {
  name: string;
  label: string;
  control: any;
  options: Option[];
  row?: boolean;
}

export const FormRadio: React.FC<FormRadioProps> = ({ 
  name, 
  label, 
  control, 
  options, 
  row = true 
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset" error={!!error} margin="normal">
          <FormLabel component="legend">{label}</FormLabel>
          <RadioGroup {...field} row={row}>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
