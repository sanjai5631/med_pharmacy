import React from 'react';
import { Grid } from '@mui/material';
import { type Control } from 'react-hook-form';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { FormCheckbox } from './FormCheckbox';
import { FormDatePicker } from './FormDatePicker';
import { FormRadio } from './FormRadio';

export interface FormFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'password' | 'select' | 'checkbox' | 'date' | 'radio';
  options?: { label: string; value: any }[];
  grid?: { xs?: number; sm?: number; md?: number };
  props?: any;
}

interface DynamicFormBuilderProps {
  config: FormFieldConfig[];
  control: Control<any>;
}

export const DynamicFormBuilder: React.FC<DynamicFormBuilderProps> = ({ config, control }) => {
  return (
    <Grid container spacing={3}>
      {config.map((field) => (
        <Grid 
          key={field.name} 
          size={{
            xs: field.grid?.xs || 12, 
            sm: field.grid?.sm || 12, 
            md: field.grid?.md || field.grid?.sm || 12
          }}
        >
          {field.type === 'select' ? (
            <FormSelect 
              name={field.name} 
              label={field.label} 
              control={control} 
              options={field.options || []} 
              {...field.props}
            />
          ) : field.type === 'checkbox' ? (
            <FormCheckbox 
              name={field.name} 
              label={field.label} 
              control={control} 
              {...field.props}
            />
          ) : field.type === 'date' ? (
            <FormDatePicker 
              name={field.name} 
              label={field.label} 
              control={control} 
              {...field.props}
            />
          ) : field.type === 'radio' ? (
            <FormRadio 
              name={field.name} 
              label={field.label} 
              control={control} 
              options={field.options || []} 
              {...field.props}
            />
          ) : (
            <FormInput 
              name={field.name} 
              label={field.label} 
              control={control} 
              type={field.type}
              {...field.props}
            />
          )}
        </Grid>
      ))}
    </Grid>
  );
};
