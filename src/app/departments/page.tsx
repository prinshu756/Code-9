'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { HomeIcon, Cpu, Laptop, Zap, Cog, Construction } from 'lucide-react';
import Link from 'next/link';

export default function DepartmentsPage() {
  return (
    <div className="flex flex-col h-screen">
       <header className="sticky top-0 z-10 border-b border-border/40 bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-start">
              <div className="flex items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold font-headline text-primary-foreground tracking-tight">
                    Departments
                  </h1>
                </div>
              </div>
            </div>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto p-6 container mx-auto">
        <div className="grid grid-cols-2 gap-6">
            <Link href="/departments/electronics">
                <Card className="w-full hover:bg-accent/50 transition-colors flex flex-col">
                <CardContent className="flex-grow flex flex-col items-center justify-center p-6 gap-4">
                    <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                    <Cpu className="w-8 h-8 text-blue-500" />
                    </div>
                    <CardTitle className="text-center text-base">Electronics</CardTitle>
                </CardContent>
                </Card>
            </Link>
            <Link href="/departments/computers">
                <Card className="w-full hover:bg-accent/50 transition-colors flex flex-col">
                <CardContent className="flex-grow flex flex-col items-center justify-center p-6 gap-4">
                    <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900">
                    <Laptop className="w-8 h-8 text-indigo-500" />
                    </div>
                    <CardTitle className="text-center text-base">Computer Science</CardTitle>
                </CardContent>
                </Card>
            </Link>
            <Link href="/departments/electrical">
                <Card className="w-full hover:bg-accent/50 transition-colors flex flex-col">
                <CardContent className="flex-grow flex flex-col items-center justify-center p-6 gap-4">
                    <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
                    <Zap className="w-8 h-8 text-yellow-500" />
                    </div>
                    <CardTitle className="text-center text-base">Electrical</CardTitle>
                </CardContent>
                </Card>
            </Link>
            <Link href="/departments/mechanical">
                <Card className="w-full hover:bg-accent/50 transition-colors flex flex-col">
                <CardContent className="flex-grow flex flex-col items-center justify-center p-6 gap-4">
                    <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-900">
                    <Cog className="w-8 h-8 text-gray-500" />
                    </div>
                    <CardTitle className="text-center text-base">Mechanical</CardTitle>
                </CardContent>
                </Card>
            </Link>
            <Link href="/departments/civil">
                <Card className="w-full col-span-2 hover:bg-accent/50 transition-colors flex flex-col">
                <CardContent className="flex-grow flex flex-col items-center justify-center p-6 gap-4">
                    <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900">
                    <Construction className="w-8 h-8 text-orange-500" />
                    </div>
                    <CardTitle className="text-center text-base">Civil</CardTitle>
                </CardContent>
                </Card>
            </Link>
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
