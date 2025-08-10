'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Wand2, Link, Network as NetworkIcon, Info, Home as HomeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
} from "@/components/ui/alert"

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);


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
                <div className="p-2 bg-primary/20 rounded-full">
                  <NetworkIcon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold font-headline text-primary-foreground tracking-tight">
                    Network
                  </h1>
                </div>
              </div>
            </div>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto">
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
