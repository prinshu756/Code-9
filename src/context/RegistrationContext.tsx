'use client';

import React, { createContext, useState, ReactNode } from 'react';
import { RegistrationFormData } from '@/components/RegistrationForm';

interface Message {
  id: number;
  text: string;
  sender: RegistrationFormData;
  timestamp: string;
}

interface NewMessage {
    text: string;
    sender: RegistrationFormData;
    department: string;
}

interface Club {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface RegistrationContextType {
  registeredUser: RegistrationFormData | null;
  setRegisteredUser: (user: RegistrationFormData | null) => void;
  messages: Record<string, Message[]>;
  addMessage: (message: NewMessage) => void;
  userRole: 'student' | 'admin';
  toggleRole: () => void;
  clubs: Club[];
  addClub: (club: Omit<Club, 'id'>) => void;
}

export const RegistrationContext = createContext<RegistrationContextType>({
  registeredUser: null,
  setRegisteredUser: () => {},
  messages: {},
  addMessage: () => {},
  userRole: 'student',
  toggleRole: () => {},
  clubs: [],
  addClub: () => {},
});

export const RegistrationProvider = ({ children }: { children: ReactNode }) => {
  const [registeredUser, setRegisteredUser] = useState<RegistrationFormData | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [userRole, setUserRole] = useState<'student' | 'admin'>('student');
  const [clubs, setClubs] = useState<Club[]>([]);

  const addMessage = (newMessage: NewMessage) => {
    const { department, ...rest } = newMessage;
    const message: Message = {
        ...rest,
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prevMessages => ({
        ...prevMessages,
        [department]: [...(prevMessages[department] || []), message]
    }));
  };

  const addClub = (clubData: Omit<Club, 'id'>) => {
    const newClub = { ...clubData, id: Date.now().toString() };
    setClubs(prevClubs => [...prevClubs, newClub]);
  };

  const toggleRole = () => {
    setUserRole(prevRole => (prevRole === 'student' ? 'admin' : 'student'));
  };

  return (
    <RegistrationContext.Provider value={{ registeredUser, setRegisteredUser, messages, addMessage, userRole, toggleRole, clubs, addClub }}>
      {children}
    </RegistrationContext.Provider>
  );
};
