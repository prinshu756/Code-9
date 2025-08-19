
'use client';

import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Cpu, Laptop, Zap, Cog, Construction } from 'lucide-react';
import Link from 'next/link';

export default function DepartmentsPage() {
  return (
    <AppLayout>
      <div className="flex flex-col space-y-4">
        <Link href="/departments/electronics">
          <Card className="hover:bg-accent/50 transition-colors">
            <CardContent className="flex items-center p-4 gap-4">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                <Cpu className="w-8 h-8 text-blue-500" />
              </div>
              <CardTitle className="text-lg">Electronics</CardTitle>
            </CardContent>
          </Card>
        </Link>
        <Link href="/departments/computers">
          <Card className="hover:bg-accent/50 transition-colors">
            <CardContent className="flex items-center p-4 gap-4">
              <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900">
                <Laptop className="w-8 h-8 text-indigo-500" />
              </div>
              <CardTitle className="text-lg">Computer Science</CardTitle>
            </CardContent>
          </Card>
        </Link>
        <Link href="/departments/electrical">
          <Card className="hover:bg-accent/50 transition-colors">
            <CardContent className="flex items-center p-4 gap-4">
              <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
                <Zap className="w-8 h-8 text-yellow-500" />
              </div>
              <CardTitle className="text-lg">Electrical</CardTitle>
            </CardContent>
          </Card>
        </Link>
        <Link href="/departments/mechanical">
          <Card className="hover:bg-accent/50 transition-colors">
            <CardContent className="flex items-center p-4 gap-4">
              <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-900">
                <Cog className="w-8 h-8 text-gray-500" />
              </div>
              <CardTitle className="text-lg">Mechanical</CardTitle>
            </CardContent>
          </Card>
        </Link>
        <Link href="/departments/civil">
          <Card className="hover:bg-accent/50 transition-colors">
            <CardContent className="flex items-center p-4 gap-4">
              <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900">
                <Construction className="w-8 h-8 text-orange-500" />
              </div>
              <CardTitle className="text-lg">Civil</CardTitle>
            </CardContent>
          </Card>
        </Link>
      </div>
    </AppLayout>
  );
}
