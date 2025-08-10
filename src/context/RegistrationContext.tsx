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
}

interface RegistrationContextType {
  registeredUser: RegistrationFormData | null;
  setRegisteredUser: (user: RegistrationFormData | null) => void;
  messages: Message[];
  addMessage: (message: NewMessage) => void;
}

export const RegistrationContext = createContext<RegistrationContextType>({
  registeredUser: null,
  setRegisteredUser: () => {},
  messages: [],
  addMessage: () => {},
});

export const RegistrationProvider = ({ children }: { children: ReactNode }) => {
  const [registeredUser, setRegisteredUser] = useState<RegistrationFormData | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (newMessage: NewMessage) => {
    const message: Message = {
        ...newMessage,
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prevMessages => [...prevMessages, message]);
  };

  return (
    <RegistrationContext.Provider value={{ registeredUser, setRegisteredUser, messages, addMessage }}>
      {children}
    </RegistrationContext.Provider>
  );
};
