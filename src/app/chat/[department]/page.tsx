
'use client';

import { useState, useRef, useEffect, useContext } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, User, Cpu, FileText, Image as ImageIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RegistrationContext } from '@/context/RegistrationContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { RegistrationFormData } from '@/components/RegistrationForm';
import { Separator } from '@/components/ui/separator';

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

  const firstYearStudents = (students[departmentName] || []).filter(s => s.year === 1);
  const firstYearStudentNames = new Set(firstYearStudents.map(s => s.name));
  
  const departmentMessages = (messages[departmentName] || []).filter(
    msg => firstYearStudentNames.has(msg.sender.name)
  );
  
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
            <div className="flex-grow container mx-auto flex items-center justify-center">
                <Card className="w-full max-w-md shadow-lg">
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

  return (
    <div className="h-full flex flex-col">
    <AppLayout hideFooter title={departmentName} onTitleClick={params.department === 'electronics' ? handleTitleClick : undefined}>
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900">
                                <Cpu className="w-8 h-8 text-blue-500" />
                            </div>
                            <div className="flex flex-col">
                                <span>{departmentName}</span>
                                <span className="text-sm font-normal text-muted-foreground">1st Year Students</span>
                            </div>
                        </div>
                    </SheetTitle>
                </SheetHeader>
                <div className="py-4 space-y-4">
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground px-2">Resources</h3>
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <ImageIcon className="w-5 h-5" />
                            <span>Media & Gallery</span>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <FileText className="w-5 h-5" />
                            <span>Documents</span>
                        </Button>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground px-2">Students</h3>
                        <ul className="space-y-1">
                            {firstYearStudents.map(student => (
                                <li key={student.name} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                                    <Avatar className="w-9 h-9">
                                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium">{student.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
        <div className="flex flex-col h-full bg-muted/30 dark:bg-card -m-6 flex-grow">
            <div className="flex-grow p-4 overflow-y-auto">
                 <div className="flex flex-col gap-4">
                    {departmentMessages.map((msg) => (
                        <div key={msg.id} className={`flex items-end gap-2 ${msg.sender.name === registeredUser?.name ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender.name !== registeredUser?.name && (
                                <Avatar className="w-8 h-8">
                                    <AvatarFallback>{msg.sender.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            )}
                            <div className={`rounded-lg px-4 py-2 max-w-sm shadow-sm ${
                                msg.sender.name === registeredUser?.name
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-card'
                            }`}>
                                <p className="font-bold text-sm">{msg.sender.name}</p>
                                <p className="mt-1">{msg.text}</p>
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
                <div className="relative flex items-center">
                    <Input 
                      placeholder="Type a message..." 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={!registeredUser}
                      className="pr-12"
                    />
                    <Button onClick={handleSendMessage} disabled={!registeredUser} size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8">
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    </AppLayout>
    </div>
  );
}
