'use client';

import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

export default function CreatePage() {
  return (
    <AppLayout>
      <div className="container mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900">
                <Plus className="w-8 h-8 text-indigo-500" />
              </div>
              <CardTitle>Add Clubs</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="text" placeholder="Club name" />
              <Button type="submit">Add Club</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
