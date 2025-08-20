'use client';

import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageIcon } from 'lucide-react';

export default function MediaPage({ params }: { params: { department: string }}) {
  const departmentName = params.department.charAt(0).toUpperCase() + params.department.slice(1);

  return (
    <AppLayout title={`${departmentName}`}>
      <div className="container mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
               <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                <ImageIcon className="w-8 h-8 text-blue-500" />
              </div>
              <CardTitle>Media & Gallery</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p>Media and gallery content for {departmentName} department will be displayed here.</p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
