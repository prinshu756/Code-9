
'use client';

import { useState, useRef, useEffect, useContext } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, User, Cpu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RegistrationContext } from '@/context/RegistrationContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { RegistrationFormData } from '@/components/RegistrationForm';

interface Message {
  id: number;
  text: string;
  sender: {
    name: string;
    year: number;
    department: string;
  };
  timestamp: string;
}

const yearTitles: Record<number, string> = {
  1: 'Fresher',
  2: 'Junior',
  3: 'Senior',
  4: 'Super senior',
};

export default function DepartmentChatPage({ params }: { params: { department: string }}) {
  const { registeredUser, messages, addMessage, students } = useContext(RegistrationContext);
  const [newMessage, setNewMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const departmentName = params.department.charAt(0).toUpperCase() + params.department.slice(1);
  const departmentMessages = messages[departmentName] || [];
  const departmentStudents = students[departmentName] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [departmentMessages]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '' && registeredUser) {
        addMessage({
            text: newMessage,
            sender: registeredUser,
            department: departmentName,
        });
      setNewMessage('');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleTitleClick = () => {
    if (params.department === 'electronics') {
        setIsSidebarOpen(true);
    }
  };

  if (params.department !== 'electronics') {
    return (
        <AppLayout>
            <div className="flex-grow container mx-auto flex items-center justify-center purple-theme">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Chat Unavailable</CardTitle>
                        <CardDescription>This chat is currently unavailable in the prototype.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link href="/departments">
                            <Button className="w-full">Go to Departments</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
  }

  const studentsByYear = departmentStudents.reduce((acc, student) => {
    const year = student.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(student);
    return acc;
  }, {} as Record<number, RegistrationFormData[]>);

  return (
    <div className="purple-theme">
    <AppLayout hideFooter title={departmentName} onTitleClick={params.department === 'electronics' ? handleTitleClick : undefined}>
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                                <Cpu className="w-8 h-8 text-blue-500" />
                            </div>
                            <span>{departmentName}</span>
                        </div>
                    </SheetTitle>
                </SheetHeader>
                <div className="py-4 space-y-4">
                    {Object.keys(studentsByYear).map(Number).sort((a,b) => b-a).map(year => (
                        <div key={year}>
                            <h3 className="font-bold mb-2">{yearTitles[year]}</h3>
                             <div className="flex flex-col gap-2">
                                {studentsByYear[year].map(student => (
                                    <div key={student.name} className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                                        <Avatar className="w-8 h-8">
                                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span>{student.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
        <div className="flex flex-col h-full bg-muted/20 -m-6">
            <div className="flex-grow container mx-auto p-4 overflow-y-auto">
                 <div className="flex flex-col gap-4">
                    {departmentMessages.map((msg) => (
                        <div key={msg.id} className={`flex items-end gap-2 ${msg.sender.name === registeredUser?.name ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender.name !== registeredUser?.name && (
                                <Avatar className="w-8 h-8">
                                    <AvatarFallback>{msg.sender.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            )}
                            <div className={`rounded-lg px-4 py-2 max-w-sm ${
                                msg.sender.name === registeredUser?.name
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-card'
                            }`}>
                                <p className="font-bold text-sm">{msg.sender.name}</p>
                                <p>{msg.text}</p>
                                <p className="text-xs text-right opacity-70 mt-1">{msg.timestamp}</p>
                            </div>
                             {msg.sender.name === registeredUser?.name && (
                                <Avatar className="w-8 h-8">
                                    <AvatarFallback>{msg.sender.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className="p-4 bg-background border-t">
                <div className="flex items-center gap-2">
                    <Input 
                      placeholder="Type a message..." 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={!registeredUser}
                    />
                    <Button onClick={handleSendMessage} disabled={!registeredUser}>
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    </AppLayout>
    </div>
  );
}
