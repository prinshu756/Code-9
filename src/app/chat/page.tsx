'use client';

import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

export default function ChatPage() {
  return (
    <AppLayout hideFooter>
        <div className="flex flex-col h-full">
            <div className="flex-grow container mx-auto">
                <p>Global Chat page content goes here.</p>
            </div>
            <div className="p-4 bg-background border-t">
                <div className="flex items-center gap-2">
                    <Input placeholder="Type a message..." />
                    <Button>
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    </AppLayout>
  );
}
