import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { UserRole } from './types/roles';

const firebaseConfig = {
  apiKey: "AIzaSyDseHIGOCQSRKOoYAJmuXTt6sV3OTV6YdQ",
  authDomain: "taska-4fee2.firebaseapp.com",
  projectId: "taska-4fee2",
  storageBucket: "taska-4fee2.firebasestorage.app",
  messagingSenderId: "461235597833",
  appId: "1:461235597833:web:116dbd608558f004adfed8",
  measurementId: "G-WJCZ738RCB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

// Коллекции Firestore
export const collections = {
  users: 'users',
  projects: 'projects',
  applications: 'applications',
  teams: 'teams',
  chats: 'chats',
  categories: 'categories',
  notifications: 'notifications'
} as const;

// Правила безопасности для Firestore
export const firestoreRules = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Функции для проверки ролей
    function isCustomer() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == '${UserRole.CUSTOMER}';
    }
    
    function isExecutor() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == '${UserRole.EXECUTOR}';
    }
    
    function isPresaleManager() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == '${UserRole.PRESALE_MANAGER}';
    }
    
    function isProjectManager() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == '${UserRole.PROJECT_MANAGER}';
    }

    // Правила для пользователей
    match /users/{userId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth.uid == userId || isPresaleManager();
      allow delete: if isPresaleManager();
    }

    // Правила для проектов
    match /projects/{projectId} {
      allow read: if request.auth != null;
      allow create: if isCustomer();
      allow update: if isProjectManager() || isPresaleManager();
      allow delete: if isPresaleManager();
    }

    // Правила для заявок
    match /applications/{applicationId} {
      allow read: if request.auth != null;
      allow create: if isCustomer() || isExecutor();
      allow update: if isPresaleManager() || isProjectManager();
      allow delete: if isPresaleManager();
    }

    // Правила для команд
    match /teams/{teamId} {
      allow read: if request.auth != null;
      allow create: if isProjectManager() || isPresaleManager();
      allow update: if isProjectManager() || isPresaleManager();
      allow delete: if isPresaleManager();
    }

    // Правила для чатов
    match /chats/{chatId} {
      allow read: if request.auth != null;
      allow create: if isProjectManager() || isPresaleManager();
      allow update: if request.auth != null;
      allow delete: if isPresaleManager();
    }

    // Правила для категорий
    match /categories/{categoryId} {
      allow read: if request.auth != null;
      allow create: if isPresaleManager();
      allow update: if isPresaleManager();
      allow delete: if isPresaleManager();
    }

    // Правила для уведомлений
    match /notifications/{notificationId} {
      allow read: if request.auth != null;
      allow create: if isProjectManager() || isPresaleManager();
      allow update: if request.auth != null;
      allow delete: if request.auth != null;
    }
  }
}
`; 