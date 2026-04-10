import React from 'react';

interface RoleBasedUIProps {
  children: React.ReactNode;
  userRole: string;
  allowedRoles?: string[];
  deniedRoles?: string[];
  fallback?: React.ReactNode;
}

/**
 * Functional component to show/hide UI pieces based on user roles.
 */
export const RoleBasedUI: React.FC<RoleBasedUIProps> = ({
  children,
  userRole,
  allowedRoles,
  deniedRoles,
  fallback = null,
}) => {
  // If allowedRoles is provided, userRole must be in it
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <>{fallback}</>;
  }

  // If deniedRoles is provided, userRole must NOT be in it
  if (deniedRoles && deniedRoles.includes(userRole)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
