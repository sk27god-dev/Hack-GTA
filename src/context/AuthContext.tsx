import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { SAMPLE_USERS } from '../data/initialData';
import { playClickSound, playMissionPassedSound } from '../utils/audio';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, role?: UserRole) => Promise<boolean>;
  loginAdmin: (adminId: string, passcode: string) => Promise<{ success: boolean; message?: string }>;
  exitAdminMode: () => void;
  signup: (userData: Partial<User>) => Promise<boolean>;
  logout: () => void;
  switchUserPersona: (userId: string) => void;
  allUsers: User[];
  publicPersonas: User[];
  updateUserProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('vice_users');
    if (saved) {
      try {
        const parsed: User[] = JSON.parse(saved);
        // Sanitize: remove any legacy cam or captain roles and keep single sample runner
        const sanitized = parsed
          .filter(u => u.uid !== 'user-cam' && u.email !== 'cam.jones@vice.city')
          .map(u => ({
            ...u,
            role: u.role === ('captain' as any) ? 'user' : u.role
          }));
        return sanitized.length > 0 ? sanitized : SAMPLE_USERS;
      } catch (e) {
        console.error('Failed to parse users', e);
      }
    }
    return SAMPLE_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('vice_current_user');
    if (saved) {
      try {
        const parsed: User = JSON.parse(saved);
        if (parsed.uid === 'user-cam' || parsed.email === 'cam.jones@vice.city') {
          return SAMPLE_USERS[0];
        }
        if (parsed.role === 'admin') {
          return parsed;
        }
        return {
          ...parsed,
          role: 'user'
        };
      } catch (e) {
        console.error('Failed to parse current user', e);
      }
    }
    // Default to the single standard participant runner Lance Vance (role: 'user')
    return SAMPLE_USERS[0];
  });

  useEffect(() => {
    localStorage.setItem('vice_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('vice_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('vice_current_user');
    }
  }, [currentUser]);

  const login = async (email: string, role: UserRole = 'user'): Promise<boolean> => {
    playClickSound();
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setCurrentUser(existing);
      playMissionPassedSound();
      return true;
    } else {
      // Auto-create account for smooth demo testing
      const newUser: User = {
        uid: `user-${Date.now()}`,
        email,
        displayName: email.split('@')[0].toUpperCase(),
        college: 'Vice City University of Technology',
        year: 2,
        phone: '+1 (305) 555-0100',
        role: 'user',
        registeredCompetitions: [],
        teamIds: [],
        createdAt: new Date().toISOString().split('T')[0]
      };
      setUsers(prev => [newUser, ...prev]);
      setCurrentUser(newUser);
      playMissionPassedSound();
      return true;
    }
  };

  const loginAdmin = async (
    adminId: string,
    passcode: string
  ): Promise<{ success: boolean; message?: string }> => {
    playClickSound();
    const cleanId = adminId.trim().toLowerCase();
    const cleanPass = passcode.trim();

    const validAdminIds = ['admin', 'tommy', 'tommy.vercetti@vice.city', 'admin@vice.city', 'root'];
    const validPasscodes = ['admin123', 'vicecity2025', 'admin', 'root', 'tommy123'];

    const isIdValid = validAdminIds.includes(cleanId) || cleanId.includes('admin') || cleanId.includes('tommy');
    const isPassValid = validPasscodes.includes(cleanPass.toLowerCase());

    if (isIdValid && isPassValid) {
      // Find or create the Admin user
      let adminUser = users.find(u => u.role === 'admin');
      if (!adminUser) {
        adminUser = {
          uid: 'user-tommy',
          email: 'tommy.vercetti@vice.city',
          displayName: 'Tommy V. (Admin)',
          college: 'Ocean View Institute of Tech',
          year: 4,
          phone: '+1 (305) 555-0192',
          role: 'admin',
          registeredCompetitions: ['cyber-heist', 'neon-drift'],
          teamIds: ['team-starfish'],
          createdAt: '2025-04-10'
        };
        setUsers(prev => [adminUser!, ...prev]);
      }
      setCurrentUser(adminUser);
      playMissionPassedSound();
      return { success: true };
    }

    return {
      success: false,
      message: 'Invalid Admin credentials! Use ID: "admin" and Passcode: "admin123"'
    };
  };

  const exitAdminMode = () => {
    playClickSound();
    // Revert back to standard user persona (Lance Vance)
    const defaultUser = users.find(u => u.role === 'user') || SAMPLE_USERS[0];
    setCurrentUser(defaultUser);
  };

  const signup = async (userData: Partial<User>): Promise<boolean> => {
    playClickSound();
    const newUser: User = {
      uid: `user-${Date.now()}`,
      email: userData.email || `runner-${Date.now()}@vice.city`,
      displayName: userData.displayName || 'Vice Runner',
      college: userData.college || 'Vice City Tech Institute',
      year: userData.year || 1,
      phone: userData.phone || '+1 (305) 555-0199',
      role: 'user',
      registeredCompetitions: userData.registeredCompetitions || [],
      teamIds: userData.teamIds || [],
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    playMissionPassedSound();
    return true;
  };

  const logout = () => {
    playClickSound();
    // Default back to standard participant
    setCurrentUser(SAMPLE_USERS[0]);
  };

  const switchUserPersona = (userId: string) => {
    playClickSound();
    const target = users.find(u => u.uid === userId);
    if (target) {
      setCurrentUser(target);
    }
  };

  const updateUserProfile = (data: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => (u.uid === updated.uid ? updated : u)));
  };

  // Only expose regular user personas in the public switcher
  const publicPersonas = users.filter(u => u.role === 'user');

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isAdmin: currentUser?.role === 'admin',
        login,
        loginAdmin,
        exitAdminMode,
        signup,
        logout,
        switchUserPersona,
        allUsers: users,
        publicPersonas,
        updateUserProfile
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
