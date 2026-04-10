import React from 'react';
import { TextField, type TextFieldProps } from '@mui/material';
import { Controller } from 'react-hook-form';

type FormInputProps = TextFieldProps & {
  name: string;
  control: any;
};

export const FormInput: React.FC<FormInputProps> = ({ name, control, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...props}
          error={!!error}
          helperText={error?.message}
          fullWidth
          margin="normal"
        />
      )}
    />
  );
};
