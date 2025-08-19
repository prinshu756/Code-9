
'use client';

import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Cpu, Laptop, Zap, Cog, Construction } from 'lucide-react';
import Link from 'next/link';

export default function DepartmentsPage() {
  return (
    <AppLayout>
      <div className="flex overflow-x-auto space-x-4 pb-4">
        <Link href="/departments/electronics">
          <Card className="w-40 h-40 hover:bg-accent/50 transition-colors flex flex-col flex-shrink-0">
            <CardContent className="flex-grow flex flex-col items-center justify-center p-4 gap-2">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                <Cpu className="w-8 h-8 text-blue-500" />
              </div>
              <CardTitle className="text-center text-sm">Electronics</CardTitle>
            </CardContent>
          </Card>
        </Link>
        <Link href="/departments/computers">
          <Card className="w-40 h-40 hover:bg-accent/50 transition-colors flex flex-col flex-shrink-0">
            <CardContent className="flex-grow flex flex-col items-center justify-center p-4 gap-2">
              <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900">
                <Laptop className="w-8 h-8 text-indigo-500" />
              </div>
              <CardTitle className="text-center text-sm">Computer Science</CardTitle>
            </CardContent>
          </Card>
        </Link>
        <Link href="/departments/electrical">
          <Card className="w-40 h-40 hover:bg-accent/50 transition-colors flex flex-col flex-shrink-0">
            <CardContent className="flex-grow flex flex-col items-center justify-center p-4 gap-2">
              <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
                <Zap className="w-8 h-8 text-yellow-500" />
              </div>
              <CardTitle className="text-center text-sm">Electrical</CardTitle>
            </CardContent>
          </Card>
        </Link>
        <Link href="/departments/mechanical">
          <Card className="w-40 h-40 hover:bg-accent/50 transition-colors flex flex-col flex-shrink-0">
            <CardContent className="flex-grow flex flex-col items-center justify-center p-4 gap-2">
              <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-900">
                <Cog className="w-8 h-8 text-gray-500" />
              </div>
              <CardTitle className="text-center text-sm">Mechanical</CardTitle>
            </CardContent>
          </Card>
        </Link>
        <Link href="/departments/civil">
          <Card className="w-40 h-40 hover:bg-accent/50 transition-colors flex flex-col flex-shrink-0">
            <CardContent className="flex-grow flex flex-col items-center justify-center p-4 gap-2">
              <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900">
                <Construction className="w-8 h-8 text-orange-500" />
              </div>
              <CardTitle className="text-center text-sm">Civil</CardTitle>
            </CardContent>
          </Card>
        </Link>
      </div>
    </AppLayout>
  );
}
