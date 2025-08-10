'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { RegistrationForm, RegistrationFormData } from '@/components/RegistrationForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AppLayout } from '@/components/AppLayout';

type Student = RegistrationFormData;

export default function ElectronicsPage() {
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
    <AppLayout>
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

        {Object.keys(studentsByYear)
          .sort()
          .map(year => (
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
    </AppLayout>
  );
}
