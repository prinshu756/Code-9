'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, HomeIcon, MessageSquare, Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { RegistrationContext } from '@/context/RegistrationContext';

export function AppLayout({ children, hideFooter }: { children: React.ReactNode, hideFooter?: boolean }) {
  const router = useRouter();
  const { registeredUser } = useContext(RegistrationContext);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.className = savedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.className = newTheme;
  };

  const getChatLink = () => {
    if (registeredUser && registeredUser.department) {
      return `/chat/${registeredUser.department.toLowerCase()}`;
    }
    return '/chat';
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="sticky top-0 z-10 border-b border-border/40 bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <h1 className="text-2xl font-bold font-headline text-primary-foreground tracking-tight">
                Network
              </h1>
            </div>
            <div className="flex items-center gap-2">
               {/* Desktop Nav */}
               <nav className="hidden md:flex items-center gap-2">
                  <Link href="/">
                    <Button variant="ghost" className="flex items-center gap-2 text-primary">
                      <HomeIcon className="w-5 h-5" />
                      <span>Home</span>
                    </Button>
                  </Link>
                  <Link href={getChatLink()}>
                    <Button variant="ghost" className="flex items-center gap-2 text-primary">
                      <MessageSquare className="w-5 h-5" />
                      <span>Chat</span>
                    </Button>
                  </Link>
                </nav>
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow overflow-y-auto p-6 flex flex-col">{children}</main>
      {/* Mobile Footer */}
      {!hideFooter && (
      <footer className="sticky bottom-0 z-10 bg-background/95 backdrop-blur-sm shadow-inner mt-auto md:hidden">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-around">
            <Link href="/">
              <Button variant="ghost" className="flex flex-col h-auto items-center gap-1 text-primary">
                <HomeIcon className="w-6 h-6" />
                <span className="text-xs font-semibold">Home</span>
              </Button>
            </Link>
            <Link href={getChatLink()}>
              <Button variant="ghost" className="flex flex-col h-auto items-center gap-1 text-primary">
                <MessageSquare className="w-6 h-6" />
                <span className="text-xs font-semibold">Chat</span>
              </Button>
            </Link>
          </div>
        </div>
      </footer>
      )}
    </div>
  );
}
