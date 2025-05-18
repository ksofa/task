export enum UserRole {
  CUSTOMER = 'customer',           // Заказчик
  EXECUTOR = 'executor',           // Исполнитель
  PRESALE_MANAGER = 'presale_manager', // Пресейл менеджер
  PROJECT_MANAGER = 'project_manager'  // Проектный менеджер
}

export interface RolePermissions {
  canCreateProject: boolean;
  canCreateApplication: boolean;
  canManageTeam: boolean;
  canManageFinances: boolean;
  canAssignCategories: boolean;
  canCreateCategories: boolean;
  canManageNotifications: boolean;
  canViewAllProjects: boolean;
  canManageProject: boolean;
  canSendInvitations: boolean;
  canRespondToInvitations: boolean;
  canUpdateTaskStatus: boolean;
  canCreateChats: boolean;
  canManagePresale: boolean;
}

export const rolePermissions: Record<UserRole, RolePermissions> = {
  [UserRole.CUSTOMER]: {
    canCreateProject: true,
    canCreateApplication: true,
    canManageTeam: false,
    canManageFinances: true,
    canAssignCategories: false,
    canCreateCategories: false,
    canManageNotifications: false,
    canViewAllProjects: false,
    canManageProject: false,
    canSendInvitations: false,
    canRespondToInvitations: false,
    canUpdateTaskStatus: false,
    canCreateChats: false,
    canManagePresale: false
  },
  [UserRole.EXECUTOR]: {
    canCreateProject: false,
    canCreateApplication: true,
    canManageTeam: false,
    canManageFinances: false,
    canAssignCategories: false,
    canCreateCategories: false,
    canManageNotifications: false,
    canViewAllProjects: false,
    canManageProject: false,
    canSendInvitations: false,
    canRespondToInvitations: true,
    canUpdateTaskStatus: true,
    canCreateChats: false,
    canManagePresale: false
  },
  [UserRole.PRESALE_MANAGER]: {
    canCreateProject: false,
    canCreateApplication: false,
    canManageTeam: true,
    canManageFinances: true,
    canAssignCategories: true,
    canCreateCategories: true,
    canManageNotifications: true,
    canViewAllProjects: true,
    canManageProject: false,
    canSendInvitations: true,
    canRespondToInvitations: false,
    canUpdateTaskStatus: false,
    canCreateChats: true,
    canManagePresale: true
  },
  [UserRole.PROJECT_MANAGER]: {
    canCreateProject: false,
    canCreateApplication: false,
    canManageTeam: true,
    canManageFinances: true,
    canAssignCategories: false,
    canCreateCategories: false,
    canManageNotifications: true,
    canViewAllProjects: true,
    canManageProject: true,
    canSendInvitations: true,
    canRespondToInvitations: false,
    canUpdateTaskStatus: true,
    canCreateChats: true,
    canManagePresale: true
  }
}; 