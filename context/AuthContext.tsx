import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, role: UserRole) => void;
  signup: (name: string, email: string, password: string, role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock Users for Demo
const MOCK_USER: User = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  role: UserRole.USER,
  avatar: 'https://picsum.photos/200',
  profile: {
    age: 24,
    height: 175,
    weight: 70,
    gender: 'Male',
    bloodType: 'O+',
    allergies: ['Peanuts']
  }
};

const MOCK_DOCTOR: User = {
  id: 'd1',
  name: 'Dr. Sarah Smith',
  email: 'sarah@hospital.com',
  role: UserRole.DOCTOR,
  avatar: 'https://picsum.photos/201'
};

const MOCK_ADMIN: User = {
  id: 'a1',
  name: 'System Admin',
  email: 'admin@sys.com',
  role: UserRole.ADMIN,
  avatar: 'https://picsum.photos/202'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check local storage for persisted session
    const storedUser = localStorage.getItem('health_app_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, role: UserRole) => {
    let selectedUser = MOCK_USER;
    if (role === UserRole.DOCTOR) selectedUser = MOCK_DOCTOR;
    if (role === UserRole.ADMIN) selectedUser = MOCK_ADMIN;
    
    // Simulate API delay
    setTimeout(() => {
        const userWithEmail = { ...selectedUser, email };
        setUser(userWithEmail);
        localStorage.setItem('health_app_user', JSON.stringify(userWithEmail));
    }, 500);
  };

  const signup = (name: string, email: string, password: string, role: UserRole) => {
    // Simulate API delay and creation
    setTimeout(() => {
        const newUser: User = {
            id: Date.now().toString(),
            name,
            email,
            role,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0d9488&color=fff`,
            profile: {
                age: 0,
                height: 0,
                weight: 0,
                gender: 'Other',
                bloodType: 'Unknown',
                allergies: []
            }
        };
        setUser(newUser);
        localStorage.setItem('health_app_user', JSON.stringify(newUser));
    }, 1000);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('health_app_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};