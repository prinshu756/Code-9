'use client';

import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Cpu, Laptop, Zap, Cog, Construction } from 'lucide-react';
import Link from 'next/link';

export default function DepartmentsPage() {
  return (
    <AppLayout>
      <div className="grid grid-cols-2 gap-6">
        <Link href="/departments/electronics">
          <Card className="w-full hover:bg-accent/50 transition-colors flex flex-col">
            <CardContent className="flex-grow flex flex-col items-center justify-center p-6 gap-4">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                <Cpu className="w-8 h-8 text-blue-500" />
              </div>
              <CardTitle className="text-center text-base">Electronics</CardTitle>
            </CardContent>
          </Card>
        </Link>
        <Link href="/departments/computers">
          <Card className="w-full hover:bg-accent/50 transition-colors flex flex-col">
            <CardContent className="flex-grow flex flex-col items-center justify-center p-6 gap-4">
              <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900">
                <Laptop className="w-8 h-8 text-indigo-500" />
              </div>
              <CardTitle className="text-center text-base">Computer Science</CardTitle>
            </CardContent>
          </Card>
        </Link>
        <Link href="/departments/electrical">
          <Card className="w-full hover:bg-accent/50 transition-colors flex flex-col">
            <CardContent className="flex-grow flex flex-col items-center justify-center p-6 gap-4">
              <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
                <Zap className="w-8 h-8 text-yellow-500" />
              </div>
              <CardTitle className="text-center text-base">Electrical</CardTitle>
            </CardContent>
          </Card>
        </Link>
        <Link href="/departments/mechanical">
          <Card className="w-full hover:bg-accent/50 transition-colors flex flex-col">
            <CardContent className="flex-grow flex flex-col items-center justify-center p-6 gap-4">
              <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-900">
                <Cog className="w-8 h-8 text-gray-500" />
              </div>
              <CardTitle className="text-center text-base">Mechanical</CardTitle>
            </CardContent>
          </Card>
        </Link>
        <Link href="/departments/civil">
          <Card className="w-full col-span-2 hover:bg-accent/50 transition-colors flex flex-col">
            <CardContent className="flex-grow flex flex-col items-center justify-center p-6 gap-4">
              <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900">
                <Construction className="w-8 h-8 text-orange-500" />
              </div>
              <CardTitle className="text-center text-base">Civil</CardTitle>
            </CardContent>
          </Card>
        </Link>
      </div>
    </AppLayout>
  );
}
