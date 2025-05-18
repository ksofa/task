import { useAuth } from './useAuth';
import { rolePermissions, UserRole } from '../types/roles';

export const usePermissions = () => {
  const { user } = useAuth();

  const hasPermission = (permission: keyof typeof rolePermissions[UserRole]) => {
    if (!user?.role) return false;
    return rolePermissions[user.role][permission];
  };

  const canCreateProject = () => hasPermission('canCreateProject');
  const canCreateApplication = () => hasPermission('canCreateApplication');
  const canManageTeam = () => hasPermission('canManageTeam');
  const canManageFinances = () => hasPermission('canManageFinances');
  const canAssignCategories = () => hasPermission('canAssignCategories');
  const canCreateCategories = () => hasPermission('canCreateCategories');
  const canManageNotifications = () => hasPermission('canManageNotifications');
  const canViewAllProjects = () => hasPermission('canViewAllProjects');
  const canManageProject = () => hasPermission('canManageProject');
  const canSendInvitations = () => hasPermission('canSendInvitations');
  const canRespondToInvitations = () => hasPermission('canRespondToInvitations');
  const canUpdateTaskStatus = () => hasPermission('canUpdateTaskStatus');
  const canCreateChats = () => hasPermission('canCreateChats');
  const canManagePresale = () => hasPermission('canManagePresale');

  return {
    canCreateProject,
    canCreateApplication,
    canManageTeam,
    canManageFinances,
    canAssignCategories,
    canCreateCategories,
    canManageNotifications,
    canViewAllProjects,
    canManageProject,
    canSendInvitations,
    canRespondToInvitations,
    canUpdateTaskStatus,
    canCreateChats,
    canManagePresale
  };
}; 