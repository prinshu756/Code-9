'use client';

import { useContext } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { RegistrationContext } from '@/context/RegistrationContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ChatPage() {
  const { registeredUser } = useContext(RegistrationContext);
  const router = useRouter();

  if (!registeredUser) {
    return (
        <AppLayout>
            <div className="flex-grow container mx-auto flex items-center justify-center purple-theme">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Chat Locked</CardTitle>
                        <CardDescription>You must be registered to join the chat.</CardDescription>
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

  // If registered, redirect to their department chat
  if (registeredUser && registeredUser.department) {
    router.replace(`/chat/${registeredUser.department.toLowerCase()}`);
    return null; // or a loading spinner
  }
  
  // Fallback for registered users without a department (shouldn't happen in normal flow)
  return (
    <AppLayout>
        <div className="flex-grow container mx-auto flex items-center justify-center purple-theme">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>No Department</CardTitle>
                    <CardDescription>You are not registered to any department.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="mb-4">Please register in a department to start chatting.</p>
                    <Link href="/departments">
                        <Button className="w-full">Go to Departments</Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
  );
}
