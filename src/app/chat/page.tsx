'use client';

import { useState, useRef, useEffect, useContext } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RegistrationContext } from '@/context/RegistrationContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface Message {
  id: number;
  text: string;
  sender: {
    name: string;
    year: number;
  };
  timestamp: string;
}

export default function ChatPage() {
  const { registeredUser, messages, addMessage } = useContext(RegistrationContext);
  const [newMessage, setNewMessage] = useState('');
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!registeredUser) {
      // User is not registered. They can see a prompt to register.
    }
  }, [registeredUser, router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '' && registeredUser) {
        addMessage({
            text: newMessage,
            sender: registeredUser,
        });
      setNewMessage('');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };


  if (!registeredUser) {
    return (
        <AppLayout>
            <div className="flex-grow container mx-auto flex items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Chat Locked</CardTitle>
                        <CardDescription>You must be registered to join the global chat.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4">Please register in one of the departments to continue.</p>
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
    <AppLayout hideFooter>
        <div className="flex flex-col h-full bg-muted/20">
            <div className="flex-grow container mx-auto p-4 overflow-y-auto">
                 <div className="flex flex-col gap-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex items-end gap-2 ${msg.sender.name === registeredUser.name ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender.name !== registeredUser.name && (
                                <Avatar className="w-8 h-8">
                                    <AvatarFallback>{msg.sender.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            )}
                            <div className={`rounded-lg px-4 py-2 max-w-sm ${
                                msg.sender.name === registeredUser.name
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-card'
                            }`}>
                                <p className="font-bold text-sm">{msg.sender.name}</p>
                                <p>{msg.text}</p>
                                <p className="text-xs text-right opacity-70 mt-1">{msg.timestamp}</p>
                            </div>
                             {msg.sender.name === registeredUser.name && (
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
                    />
                    <Button onClick={handleSendMessage}>
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    </AppLayout>
  );
}
