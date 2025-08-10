'use client';

import { Button } from '@/components/ui/button';
import { HomeIcon } from 'lucide-react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RegistrationForm } from '@/components/RegistrationForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ComputersPage() {
  return (
    <div className="flex flex-col h-screen">
      <header className="sticky top-0 z-10 border-b border-border/40 bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-start">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold font-headline text-primary-foreground tracking-tight">
                  Network
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow overflow-y-auto p-6 flex justify-center items-center">
        <div className="container mx-auto text-center">
            <Card className="max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>Register to the branch</CardDescription>
                </CardHeader>
                <CardContent>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Register</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <RegistrationForm />
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>
        </div>
      </main>
      <footer className="sticky bottom-0 z-10 bg-background/95 backdrop-blur-sm shadow-inner mt-auto">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-center">
            <Link href="/">
              <Button variant="ghost" className="flex flex-col h-auto items-center gap-1 text-primary">
                <HomeIcon className="w-6 h-6" />
                <span className="text-xs font-semibold">Home</span>
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
