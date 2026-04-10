import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { AppThemeProvider } from './context/ThemeContext';
import { SnackbarProvider } from './context/SnackbarContext';
import { LoaderProvider } from './context/LoaderContext';
import { UserList } from './pages/Sample/UserList';
import { Showcase } from './pages/Showcase';

function App() {
  return (
    <AppThemeProvider>
      <CssBaseline />
      <SnackbarProvider>
        <LoaderProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Showcase />} />
              <Route path="/users" element={<UserList />} />
            </Routes>
          </BrowserRouter>
        </LoaderProvider>
      </SnackbarProvider>
    </AppThemeProvider>
  );
}

export default App;
