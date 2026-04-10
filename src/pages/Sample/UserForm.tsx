import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Slide, Typography } from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import { motion } from 'framer-motion';
import { FormInput } from '../../components/common/Form/FormInput';
import { FormSelect } from '../../components/common/Form/FormSelect';
import { useFormHandler } from '../../hooks/useFormHandler';
import { userSchema, type UserFormValues } from './userSchema';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface UserFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormValues) => void;
  initialValues?: UserFormValues;
}

export const UserForm: React.FC<UserFormProps> = ({ open, onClose, onSubmit, initialValues }) => {
  const { control, handleSubmit, reset } = useFormHandler({
    schema: userSchema,
    defaultValues: initialValues || { name: '', email: '', role: '', status: 'active' },
  });

  useEffect(() => {
    if (open) {
      reset(initialValues || { name: '', email: '', role: '', status: 'active' });
    }
  }, [open, initialValues, reset]);

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      slots={{ transition: Transition as any }}
      slotProps={{
        paper: {
          sx: {
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            borderRadius: 6
          }
        }
      }}
    >
      <DialogTitle sx={{ pb: 0 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b' }}>
          {initialValues ? 'Edit User' : 'Add New User'}
        </Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <FormInput name="name" label="Full Name" control={control} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <FormInput name="email" label="Email Address" control={control} />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <FormSelect
                  name="role"
                  label="Role"
                  control={control}
                  options={[
                    { label: 'Admin', value: 'admin' },
                    { label: 'User', value: 'user' },
                    { label: 'Manager', value: 'manager' },
                  ]}
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <FormSelect
                  name="status"
                  label="Status"
                  control={control}
                  options={[
                    { label: 'Active', value: 'active' },
                    { label: 'Inactive', value: 'inactive' },
                  ]}
                />
              </Grid>
            </Grid>
          </motion.div>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onClose} color="inherit">Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {initialValues ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
