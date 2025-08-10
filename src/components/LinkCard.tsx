'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, ExternalLink } from 'lucide-react';
import Image from 'next/image';

type LinkCardProps = {
  url: string;
  onDelete: (url: string) => void;
};

export function LinkCard({ url, onDelete }: LinkCardProps) {
  const getFaviconUrl = (linkUrl: string) => {
    try {
      const urlObject = new URL(linkUrl);
      return `https://www.google.com/s2/favicons?sz=64&domain_url=${urlObject.hostname}`;
    } catch (error) {
      return `https://placehold.co/64x64.png`;
    }
  };

  const faviconUrl = getFaviconUrl(url);

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(url);
  };
  
  const openLink = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <Card
        className="h-full group transition-all duration-300 ease-in-out hover:shadow-xl hover:border-primary/50 overflow-hidden cursor-pointer"
        onClick={openLink}
      >
        <CardContent className="p-4 flex flex-col justify-between h-full">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Image
                src={faviconUrl}
                alt="favicon"
                width={24}
                height={24}
                className="rounded-full"
                data-ai-hint="website logo"
              />
              <p className="font-semibold text-sm break-all text-primary-foreground group-hover:text-accent transition-colors">
                {new URL(url).hostname}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 opacity-50 group-hover:opacity-100 transition-opacity"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-xs text-muted-foreground break-all truncate pr-2">
                {url}
            </p>
            <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
