import { UserRole } from './roles';

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  telegramId?: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends User {
  skills?: string[];
  experience?: string;
  bio?: string;
  rating?: number;
  completedProjects?: number;
  category?: string;
} 