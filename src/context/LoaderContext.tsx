import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { Backdrop, CircularProgress, Box } from '@mui/material';
import { DeliveryLoader } from '../components/common/UI/DeliveryLoader';

type LoaderType = 'default' | 'delivery';

interface LoaderContextType {
  showLoader: (type?: LoaderType) => void;
  hideLoader: () => void;
  isLoading: boolean;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const LoaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<LoaderType>('default');

  const showLoader = (newType: LoaderType = 'default') => {
    setType(newType);
    setLoading(true);
  };
  
  const hideLoader = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader, isLoading: loading }}>
      {children}
      <Backdrop
        sx={{ 
          color: '#fff', 
          zIndex: (theme) => theme.zIndex.drawer + 9999,
          backdropFilter: 'blur(10px)',
          background: 'rgba(2, 6, 23, 0.8)'
        }}
        open={loading}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {type === 'delivery' ? (
            <DeliveryLoader />
          ) : (
            <CircularProgress color="primary" thickness={5} size={60} />
          )}
        </Box>
      </Backdrop>
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) throw new Error('useLoader must be used within a LoaderProvider');
  return context;
};
