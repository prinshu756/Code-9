
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { HomeIcon } from 'lucide-react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RegistrationForm, RegistrationFormData } from '@/components/RegistrationForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type Student = RegistrationFormData;

export default function ComputersPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRegister = (data: RegistrationFormData) => {
    setStudents(prev => [...prev, data]);
    setIsDialogOpen(false);
  };

  const studentsByYear = students.reduce((acc, student) => {
    const year = `Year ${student.year}`;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(student);
    return acc;
  }, {} as Record<string, Student[]>);

  return (
    <div className="flex flex-col h-screen">
      <header className="sticky top-0 z-10 border-b border-border/40 bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-start">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold font-headline text-primary-foreground tracking-tight">
                  Network
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>
       <main className="flex-grow overflow-y-auto p-6">
        <div className="container mx-auto">
            <Card className="max-w-4xl mx-auto mb-6">
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>Register to the branch</CardDescription>
                </CardHeader>
                <CardContent>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>Register</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <RegistrationForm onSubmit={handleRegister} />
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>

            {Object.keys(studentsByYear).sort().map(year => (
                <div key={year} className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">{year}</h2>
                    <Card>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Interests</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {studentsByYear[year].map((student, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{student.name}</TableCell>
                                            <TableCell>{student.interests}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </div>
      </main>
      <footer className="sticky bottom-0 z-10 bg-background/95 backdrop-blur-sm shadow-inner mt-auto">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-center">
            <Link href="/">
              <Button variant="ghost" className="flex flex-col h-auto items-center gap-1 text-primary">
                <HomeIcon className="w-6 h-6" />
                <span className="text-xs font-semibold">Home</span>
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
