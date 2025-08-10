'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Wand2, Plus } from 'lucide-react';
import Image from 'next/image';

type SuggestedLinksProps = {
  suggestions: string[];
  isLoading: boolean;
  onAddLink: (url: string) => void;
};

export function SuggestedLinks({ suggestions, isLoading, onAddLink }: SuggestedLinksProps) {
  const getFaviconUrl = (linkUrl: string) => {
    try {
      const urlObject = new URL(linkUrl);
      return `https://www.google.com/s2/favicons?sz=64&domain_url=${urlObject.hostname}`;
    } catch (error) {
      return `https://placehold.co/64x64.png`;
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-headline font-semibold mb-6 flex items-center gap-2">
        <Wand2 className="text-accent"/>
        AI Suggestions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading &&
          [...Array(3)].map((_, i) => (
            <Card key={i} className="h-28">
              <CardContent className="p-4 flex flex-col justify-center h-full">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <Skeleton className="h-3 w-full mt-3" />
              </CardContent>
            </Card>
          ))}
        <AnimatePresence>
          {!isLoading &&
            suggestions.map(suggestion => (
              <motion.div
                key={suggestion}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <Card className="h-full group transition-all duration-300 ease-in-out hover:shadow-lg hover:border-accent/50">
                   <CardContent className="p-4 flex flex-col justify-between h-full">
                        <div className="flex items-start justify-between">
                            <a href={suggestion} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full overflow-hidden">
                                <Image
                                    src={getFaviconUrl(suggestion)}
                                    alt="favicon"
                                    width={24}
                                    height={24}
                                    className="rounded-full"
                                    data-ai-hint="website logo"
                                />
                                <p className="font-semibold text-sm break-all text-primary-foreground group-hover:text-accent transition-colors truncate">
                                    {new URL(suggestion).hostname}
                                </p>
                            </a>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 shrink-0"
                                onClick={() => onAddLink(suggestion)}
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground break-all truncate">
                            {suggestion}
                        </p>
                    </CardContent>
                </Card>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
