import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types/quiz';
import { DEMO_STUDENT, DEMO_ADMIN } from '../data/sampleUsers';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (email: string, role: UserRole) => boolean;
  register: (name: string, email: string, role: UserRole, department?: string) => boolean;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_USER = 'quizmaster_auth_user';
const STORAGE_KEY_USERS_LIST = 'quizmaster_registered_users';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_USER);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    // Default to demo student so visitor gets full experience immediately
    return DEMO_STUDENT;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
    }
  }, [user]);

  const login = (email: string, selectedRole: UserRole): boolean => {
    // Check if matching demo student
    if (email.toLowerCase().includes('admin') || selectedRole === 'admin') {
      setUser({
        ...DEMO_ADMIN,
        email: email || DEMO_ADMIN.email
      });
      return true;
    }

    // Check registered users list
    try {
      const registered = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS_LIST) || '[]');
      const match = registered.find((u: User) => u.email.toLowerCase() === email.toLowerCase());
      if (match) {
        setUser(match);
        return true;
      }
    } catch {
      // ignore
    }

    // Default to student login with given email
    setUser({
      ...DEMO_STUDENT,
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email: email,
      role: selectedRole
    });
    return true;
  };

  const register = (name: string, email: string, selectedRole: UserRole, department?: string): boolean => {
    const newUser: User = {
      id: 'usr_' + Date.now(),
      name,
      email,
      role: selectedRole,
      department: department || (selectedRole === 'student' ? 'Computer Science & Engineering' : 'Faculty of Engineering'),
      joinedDate: new Date().toISOString().split('T')[0],
      studentId: selectedRole === 'student' ? `STU-${Math.floor(1000 + Math.random() * 9000)}` : undefined,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`
    };

    try {
      const registered = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS_LIST) || '[]');
      registered.push(newUser);
      localStorage.setItem(STORAGE_KEY_USERS_LIST, JSON.stringify(registered));
    } catch {
      // ignore
    }

    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (newRole: UserRole) => {
    if (newRole === 'admin') {
      setUser(DEMO_ADMIN);
    } else {
      setUser(DEMO_STUDENT);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : 'student',
        isAuthenticated: !!user,
        login,
        register,
        logout,
        switchRole
      }}
    >
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
