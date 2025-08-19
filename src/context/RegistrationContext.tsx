
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
  students: Record<string, RegistrationFormData[]>;
}

const dummyStudents: Record<string, RegistrationFormData[]> = {
  Electronics: [
    { name: 'Alice', year: 4, interests: 'VLSI, Embedded Systems', department: 'Electronics' },
    { name: 'Bob', year: 3, interests: 'Signal Processing', department: 'Electronics' },
    { name: 'Charlie', year: 2, interests: 'Analog Circuits', department: 'Electronics' },
    { name: 'Diana', year: 1, interests: 'Basic Electronics', department: 'Electronics' },
    { name: 'Ethan', year: 1, interests: 'Digital Logic', department: 'Electronics' },
  ],
  Computers: [
    { name: 'David', year: 4, interests: 'AI/ML', department: 'Computers' },
    { name: 'Eve', year: 2, interests: 'Web Development', department: 'Computers' },
  ],
  Electrical: [
    { name: 'Frank', year: 3, interests: 'Power Systems', department: 'Electrical' },
  ],
  Mechanical: [
    { name: 'Grace', year: 4, interests: 'Thermodynamics', department: 'Mechanical' },
  ],
  Civil: [
    { name: 'Heidi', year: 2, interests: 'Structural Engineering', department: 'Civil' },
  ]
};

const dummyClubs: Club[] = [
    { id: '1', title: 'AI Club', description: 'A club for AI enthusiasts.', imageUrl: 'https://placehold.co/600x400.png' },
    { id: '2', title: 'Robotics Club', description: 'Build and program robots!', imageUrl: 'https://placehold.co/600x400.png' },
    { id: '3', title: 'Coding Club', description: 'For competitive programmers.', imageUrl: 'https://placehold.co/600x400.png' },
];

const dummyMessages: Record<string, Message[]> = {
  Electronics: [
    { id: 1, text: 'Hello everyone!', sender: dummyStudents.Electronics[3], timestamp: '10:00 AM' },
    { id: 2, text: 'Hi Diana!', sender: dummyStudents.Electronics[4], timestamp: '10:01 AM' },
    { id: 3, text: 'Any idea about the first assignment?', sender: dummyStudents.Electronics[3], timestamp: '10:02 AM' },
    { id: 4, text: 'Not yet, maybe professor will tell us tomorrow.', sender: dummyStudents.Electronics[4], timestamp: '10:03 AM' },
    { id: 5, text: 'This message is from a senior and should not be visible.', sender: dummyStudents.Electronics[0], timestamp: '10:05 AM' },
  ]
};

export const RegistrationContext = createContext<RegistrationContextType>({
  registeredUser: null,
  setRegisteredUser: () => {},
  messages: {},
  addMessage: () => {},
  userRole: 'student',
  toggleRole: () => {},
  clubs: [],
  addClub: () => {},
  students: {},
});

export const RegistrationProvider = ({ children }: { children: ReactNode }) => {
  const [registeredUser, setRegisteredUser] = useState<RegistrationFormData | null>(dummyStudents.Electronics[3]);
  const [messages, setMessages] = useState<Record<string, Message[]>>(dummyMessages);
  const [userRole, setUserRole] = useState<'student' | 'admin'>('student');
  const [clubs, setClubs] = useState<Club[]>(dummyClubs);
  const [students, setStudents] = useState<Record<string, RegistrationFormData[]>>(dummyStudents);

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
    <RegistrationContext.Provider value={{ registeredUser, setRegisteredUser, messages, addMessage, userRole, toggleRole, clubs, addClub, students }}>
      {children}
    </RegistrationContext.Provider>
  );
};
