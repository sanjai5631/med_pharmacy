import React, { useState } from 'react';
import { Box, Typography, Chip, useTheme } from '@mui/material';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DataTable, type Column, AppButton, CommonBreadcrumbs } from '../../components/common';
import { UserForm } from './UserForm';
import { ConfirmDialog } from '../../components/common';
import { useSnackbar } from '../../context/SnackbarContext';
import { useLoader } from '../../context/LoaderContext';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const INITIAL_DATA: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'manager', status: 'inactive' },
];

export const UserList: React.FC = () => {
  const theme = useTheme();
  const [data, setData] = useState<User[]>(INITIAL_DATA);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  const { showSnackbar } = useSnackbar();
  const { showLoader, hideLoader } = useLoader();

  const columns: Column<User>[] = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 200 },
    { id: 'role', label: 'Role', minWidth: 100, format: (val) => val.toUpperCase() },
    { 
      id: 'status', 
      label: 'Status', 
      minWidth: 100,
      format: (val) => (
        <Chip 
          label={val.toUpperCase()} 
          size="small" 
          variant="outlined" 
          sx={{ 
            fontWeight: 700,
            borderColor: val === 'active' ? theme.palette.success.main : theme.palette.divider,
            color: val === 'active' ? theme.palette.success.main : theme.palette.text.secondary,
            borderRadius: '4px'
          }}
        />
      )
    },
    { id: 'actions', label: 'Actions', minWidth: 100, align: 'center' },
  ];

  const handleAdd = () => {
    setSelectedUser(null);
    setIsFormOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setIsConfirmOpen(true);
  };

  const handleFormSubmit = (formData: any) => {
    showLoader();
    setTimeout(() => {
      if (selectedUser) {
        setData(data.map(u => u.id === selectedUser.id ? { ...u, ...formData } : u));
        showSnackbar('User updated successfully', 'success');
      } else {
        const newUser = { ...formData, id: Math.random().toString(36).substr(2, 9) };
        setData([...data, newUser]);
        showSnackbar('User created successfully', 'success');
      }
      hideLoader();
      setIsFormOpen(false);
    }, 1000);
  };

  const handleConfirmDelete = () => {
    if (selectedUser) {
      setData(data.filter(u => u.id !== selectedUser.id));
      showSnackbar('User deleted successfully', 'success');
      setIsConfirmOpen(false);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1200, margin: '0 auto', minHeight: '100vh', bgcolor: 'background.default' }}>
        <Box sx={{ mb: 4 }}>
            <CommonBreadcrumbs items={[{ label: 'Administration' }, { label: 'User Management' }]} />
        </Box>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4,
          p: 3,
          borderRadius: 3,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
        }}>
          <Typography variant="h4" sx={{ 
            fontWeight: 800, 
            color: 'text.primary',
          }}>
            User Management
          </Typography>
          <AppButton 
            variant="contained" 
            startIcon={<Plus size={20} />} 
            onClick={handleAdd}
          >
            Add User
          </AppButton>
        </Box>

        <AnimatePresence mode="wait">
          <motion.div
            key="table-container"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <DataTable 
              columns={columns} 
              data={data} 
              onEdit={handleEdit} 
              onDelete={handleDeleteClick} 
            />
          </motion.div>
        </AnimatePresence>

        <UserForm 
          open={isFormOpen} 
          onClose={() => setIsFormOpen(false)} 
          onSubmit={handleFormSubmit}
          initialValues={selectedUser || undefined}
        />

        <ConfirmDialog 
          open={isConfirmOpen}
          title="Delete User"
          message={`Are you sure you want to delete ${selectedUser?.name}? This action cannot be undone.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsConfirmOpen(false)}
        />
      </Box>
  );
};
