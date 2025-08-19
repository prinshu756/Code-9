
'use client';

import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Cpu, Laptop, Zap, Cog, Construction } from 'lucide-react';
import Link from 'next/link';

const departments = [
  {
    name: 'Electronics',
    href: '/departments/electronics',
    icon: Cpu,
    color: 'blue'
  },
  {
    name: 'Computer Science',
    href: '/departments/computers',
    icon: Laptop,
    color: 'indigo'
  },
  {
    name: 'Electrical',
    href: '/departments/electrical',
    icon: Zap,
    color: 'yellow'
  },
  {
    name: 'Mechanical',
    href: '/departments/mechanical',
    icon: Cog,
    color: 'gray'
  },
  {
    name: 'Civil',
    href: '/departments/civil',
    icon: Construction,
    color: 'orange'
  }
];

const colorClasses: Record<string, { bg: string, text: string }> = {
  blue: { bg: 'bg-blue-100 dark:bg-blue-900', text: 'text-blue-500' },
  indigo: { bg: 'bg-indigo-100 dark:bg-indigo-900', text: 'text-indigo-500' },
  yellow: { bg: 'bg-yellow-100 dark:bg-yellow-900', text: 'text-yellow-500' },
  gray: { bg: 'bg-gray-100 dark:bg-gray-900', text: 'text-gray-500' },
  orange: { bg: 'bg-orange-100 dark:bg-orange-900', text: 'text-orange-500' },
}

export default function DepartmentsPage() {
  return (
    <AppLayout title="Departments">
      <div className="flex flex-col space-y-4">
        {departments.map((dept) => (
          <Link href={dept.href} key={dept.name}>
            <Card className="hover:bg-accent hover:shadow-md transition-all duration-200">
              <CardContent className="flex items-center p-4 gap-4">
                <div className={`p-3 rounded-lg ${colorClasses[dept.color].bg}`}>
                  <dept.icon className={`w-8 h-8 ${colorClasses[dept.color].text}`} />
                </div>
                <CardTitle className="text-lg font-semibold">{dept.name}</CardTitle>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </AppLayout>
  );
}
