'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Wand2, Link as LinkIcon, Network as NetworkIcon, Info, Home as HomeIcon, Building2, Users, GraduationCap, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { AddLinkForm } from '@/components/AddLinkForm';
import { LinkCard } from '@/components/LinkCard';
import { SuggestedLinks } from '@/components/SuggestedLinks';
import { suggestLinks } from '@/ai/flows/suggest-links';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';


export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [voted, setVoted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleVote = () => {
    if (!voted) {
      setProgress(prev => Math.min(prev + 10, 100));
      setVoted(true);
    }
  };


  if (!isMounted) {
    return (
      <div className="flex flex-col min-h-screen">
          <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-8">
              <div className="text-center">
                  <div className="inline-block p-4 bg-primary/20 rounded-full">
                    <NetworkIcon className="w-12 h-12 text-primary" />
                  </div>
                  <h1 className="mt-4 text-4xl md:text-5xl font-bold font-headline text-primary-foreground tracking-tight">
                    Network
                  </h1>
                  <p className="mt-2 text-lg text-muted-foreground font-body">
                    Your personal corner of the internet.
                  </p>
              </div>
            </div>
          </header>
          <main className="flex-grow container mx-auto px-4 py-8">
          </main>
      </div>
    );
  }

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

      <main className="flex-grow overflow-y-auto p-6 container mx-auto">
        <div className="grid grid-cols-2 gap-6">
            <Link href="/departments" className="flex">
              <Card className="w-full hover:bg-accent/50 transition-colors flex flex-col">
                <CardContent className="flex-grow flex flex-col items-center justify-center p-6 gap-4">
                  <div className="p-3 rounded-full bg-sky-100 dark:bg-sky-900">
                    <Building2 className="w-8 h-8 text-sky-500" />
                  </div>
                  <CardTitle className="text-center">Departments</CardTitle>
                </CardContent>
              </Card>
            </Link>
            <Link href="/clubs" className="flex">
              <Card className="w-full hover:bg-accent/50 transition-colors flex flex-col">
                <CardContent className="flex-grow flex flex-col items-center justify-center p-6 gap-4">
                   <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                    <Users className="w-8 h-8 text-purple-500" />
                  </div>
                  <CardTitle className="text-center">Clubs</CardTitle>
                </CardContent>
              </Card>
            </Link>
            <Link href="/faculty" className="flex">
              <Card className="w-full hover:bg-accent/50 transition-colors flex flex-col">
                <CardContent className="flex-grow flex flex-col items-center justify-center p-6 gap-4">
                   <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                    <GraduationCap className="w-8 h-8 text-green-500" />
                  </div>
                  <CardTitle className="text-center">Faculty</CardTitle>
                </CardContent>
              </Card>
            </Link>
            <Link href="/alumni" className="flex">
               <Card className="w-full hover:bg-accent/50 transition-colors flex flex-col">
                <CardContent className="flex-grow flex flex-col items-center justify-center p-6 gap-4">
                   <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900">
                    <NetworkIcon className="w-8 h-8 text-orange-500" />
                  </div>
                  <CardTitle className="text-center">Alumni Network</CardTitle>
                </CardContent>
              </Card>
            </Link>
            <Card className="col-span-2 w-full flex flex-col bg-card">
              <CardContent className="flex-grow flex flex-col justify-center p-6 gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                    <BookOpen className="w-8 h-8 text-green-500" />
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="flex items-center gap-2">
                      <CardTitle>Ecam desk</CardTitle>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Coming soon</Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                        <Button variant="link" className="p-0 h-auto justify-start text-primary" onClick={handleVote} disabled={voted}>Vote for this feature</Button>
                        <Progress value={progress} className="w-1/2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
        </div>
      </main>
      <footer className="sticky bottom-0 z-10 bg-background/95 backdrop-blur-sm shadow-inner mt-auto">
        <div className="container mx-auto px-4 py-2">
            <div className="flex justify-center">
                <Button variant="ghost" className="flex flex-col h-auto items-center gap-1 text-primary">
                    <HomeIcon className="w-6 h-6" />
                    <span className="text-xs font-semibold">Home</span>
                </Button>
            </div>
        </div>
      </footer>
    </div>
  );
}
