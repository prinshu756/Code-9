'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Wand2, Link, Network as NetworkIcon, Info } from 'lucide-react';
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
  const [links, setLinks] = useState<string[]>([]);
  const [suggestedLinks, setSuggestedLinks] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedLinks = localStorage.getItem('network-links');
      if (savedLinks) {
        setLinks(JSON.parse(savedLinks));
      }
    } catch (error) {
      console.error('Failed to load links from local storage', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not load your saved links.',
      });
    }
  }, [toast]);

  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem('network-links', JSON.stringify(links));
      } catch (error) {
        console.error('Failed to save links to local storage', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Could not save your new link.',
        });
      }
    }
  }, [links, isMounted, toast]);

  const handleAddLink = (url: string) => {
    if (links.includes(url)) {
      toast({
        variant: 'default',
        title: 'Duplicate Link',
        description: 'This link is already in your network.',
      });
      return;
    }
    setLinks(prevLinks => [url, ...prevLinks]);
  };

  const handleDeleteLink = (urlToDelete: string) => {
    setLinks(prevLinks => prevLinks.filter(link => link !== urlToDelete));
  };

  const handleGetSuggestions = async () => {
    if (links.length === 0) {
      toast({
        title: 'Add Links First',
        description: 'You need to add some links before we can give suggestions.',
      });
      return;
    }
    setIsLoadingSuggestions(true);
    setSuggestedLinks([]);
    try {
      const result = await suggestLinks({ savedLinks: links });
      setSuggestedLinks(result.suggestedLinks);
    } catch (error) {
      console.error('Failed to get suggestions', error);
      toast({
        variant: 'destructive',
        title: 'AI Error',
        description: 'Could not generate link suggestions.',
      });
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const addSuggestedLink = (link: string) => {
    handleAddLink(link);
    setSuggestedLinks(prev => prev.filter(s => s !== link));
  }

  if (!isMounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <header className="py-8 text-center">
            <div className="inline-block p-4 bg-primary/20 rounded-full">
              <NetworkIcon className="w-12 h-12 text-primary" />
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold font-headline text-primary-foreground tracking-tight">
              Network
            </h1>
            <p className="mt-2 text-lg text-muted-foreground font-body">
              Your personal corner of the internet.
            </p>
        </header>
        <main className="space-y-8">
          <Card className="p-6">
            <Skeleton className="h-10 w-1/3 mb-4" />
            <Skeleton className="h-10 w-full" />
          </Card>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-lg" />
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="py-8 text-center">
          <div className="inline-block p-4 bg-primary/20 rounded-full">
            <NetworkIcon className="w-12 h-12 text-primary" />
          </div>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold font-headline text-primary-foreground tracking-tight">
            Network
          </h1>
          <p className="mt-2 text-lg text-muted-foreground font-body">
            Your personal corner of the internet.
          </p>
      </header>

      <main className="space-y-12">
        <Card className="p-4 sm:p-6 shadow-lg border-2 border-primary/20">
          <AddLinkForm onAddLink={handleAddLink} />
        </Card>

        <section>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-headline font-semibold flex items-center gap-2">
                    <Link className="text-primary"/>
                    My Links
                </h2>
                <Button onClick={handleGetSuggestions} disabled={isLoadingSuggestions} variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Wand2 className="mr-2 h-4 w-4" />
                    Suggest Links
                </Button>
            </div>
          
            <AnimatePresence>
                {links.length > 0 ? (
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {links.map(link => (
                    <LinkCard key={link} url={link} onDelete={handleDeleteLink} />
                    ))}
                </motion.div>
                ) : (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16 border-2 border-dashed rounded-lg bg-card"
                >
                    <Info className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-xl font-semibold font-headline">Your network is empty</h3>
                    <p className="text-muted-foreground mt-2 font-body">Add a link above to get started.</p>
                </motion.div>
                )}
            </AnimatePresence>
        </section>

        {(isLoadingSuggestions || suggestedLinks.length > 0) && (
            <SuggestedLinks 
                suggestions={suggestedLinks} 
                isLoading={isLoadingSuggestions}
                onAddLink={addSuggestedLink}
            />
        )}
      </main>
    </div>
  );
}
