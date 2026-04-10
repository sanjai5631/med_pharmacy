import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  userRole?: string;
  allowedRoles?: string[];
  redirectPath?: string;
}

/**
 * Higher Order Component to protect routes based on authentication and role.
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isAuthenticated,
  userRole,
  allowedRoles,
  redirectPath = '/login',
}) => {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    // If authenticated but unauthorized, redirect to a generic unauthorized page or home
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
