import * as yup from 'yup';

export const userSchema = yup.object().shape({
  name: yup.string().required('Name is required').min(3, 'At least 3 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  role: yup.string().required('Role is required'),
  status: yup.string().required('Status is required'),
});

export type UserFormValues = yup.InferType<typeof userSchema>;
