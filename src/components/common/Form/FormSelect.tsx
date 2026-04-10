import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, type SelectProps } from '@mui/material';
import { Controller } from 'react-hook-form';

type Option = {
  label: string;
  value: string | number;
};

type FormSelectProps = SelectProps & {
  name: string;
  label: string;
  control: any;
  options: Option[];
};

export const FormSelect: React.FC<FormSelectProps> = ({ name, label, control, options, ...props }) => {
  const labelId = `${name}-label`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth margin="normal" error={!!error}>
          <InputLabel id={labelId}>{label}</InputLabel>
          <Select
            labelId={labelId}
            label={label}
            {...field}
            {...props}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
