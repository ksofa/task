import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { usePermissions } from '../hooks/usePermissions';
import { UserRole } from '../types/roles';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
  requiredPermission?: keyof ReturnType<typeof usePermissions>;
}

export const ProtectedRoute = ({
  children,
  requiredRole,
  requiredPermission
}: ProtectedRouteProps) => {
  const { user } = useAuth();
  const permissions = usePermissions();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  if (requiredPermission && !permissions[requiredPermission]()) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}; 