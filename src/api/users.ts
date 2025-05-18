import { db, collections } from '../firebase';
import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { User, UserProfile, UserRole } from '../types/user';

export const createUser = async (userData: Partial<User>): Promise<void> => {
  if (!userData.id) throw new Error('User ID is required');
  
  const userRef = doc(db, collections.users, userData.id);
  await setDoc(userRef, {
    ...userData,
    role: userData.role || UserRole.CUSTOMER, // По умолчанию роль заказчика
    balance: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  });
};

export const getUser = async (userId: string): Promise<User | null> => {
  const userRef = doc(db, collections.users, userId);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) return null;
  
  return userSnap.data() as User;
};

export const updateUser = async (userId: string, userData: Partial<User>): Promise<void> => {
  const userRef = doc(db, collections.users, userId);
  await updateDoc(userRef, {
    ...userData,
    updatedAt: new Date()
  });
};

export const updateUserRole = async (userId: string, role: UserRole): Promise<void> => {
  const userRef = doc(db, collections.users, userId);
  await updateDoc(userRef, {
    role,
    updatedAt: new Date()
  });
};

export const getUsersByRole = async (role: UserRole): Promise<User[]> => {
  const usersRef = collection(db, collections.users);
  const q = query(usersRef, where('role', '==', role));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => doc.data() as User);
};

export const getExecutorsByCategory = async (category: string): Promise<UserProfile[]> => {
  const usersRef = collection(db, collections.users);
  const q = query(
    usersRef,
    where('role', '==', UserRole.EXECUTOR),
    where('category', '==', category)
  );
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => doc.data() as UserProfile);
};

export const updateUserBalance = async (userId: string, amount: number): Promise<void> => {
  const userRef = doc(db, collections.users, userId);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) throw new Error('User not found');
  
  const currentBalance = userSnap.data().balance || 0;
  await updateDoc(userRef, {
    balance: currentBalance + amount,
    updatedAt: new Date()
  });
}; 