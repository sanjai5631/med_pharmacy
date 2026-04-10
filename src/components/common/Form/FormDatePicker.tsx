import React from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller } from 'react-hook-form';

interface FormDatePickerProps {
  name: string;
  label: string;
  control: any;
}

export const FormDatePicker: React.FC<FormDatePickerProps> = ({ name, label, control }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <DatePicker
            label={label}
            value={value}
            onChange={onChange}
            slotProps={{
              textField: {
                fullWidth: true,
                margin: 'normal',
                error: !!error,
                helperText: error?.message,
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};
