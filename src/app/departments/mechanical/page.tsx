'use client';

import { useState, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { RegistrationForm, RegistrationFormData } from '@/components/RegistrationForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AppLayout } from '@/components/AppLayout';
import { RegistrationContext } from '@/context/RegistrationContext';

type Student = RegistrationFormData;

const yearTitles: Record<number, string> = {
  1: 'Fresher',
  2: 'Junior',
  3: 'Senior',
  4: 'Super senior',
};

export default function MechanicalPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { setRegisteredUser } = useContext(RegistrationContext);

  const handleRegister = (data: RegistrationFormData) => {
    setStudents(prev => [...prev, data]);
    setRegisteredUser(data);
    setIsDialogOpen(false);
  };

  const studentsByYear = students.reduce((acc, student) => {
    const year = student.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(student);
    return acc;
  }, {} as Record<number, Student[]>);

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
                <RegistrationForm onSubmit={handleRegister} department="Mechanical" />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {Object.keys(studentsByYear)
          .map(Number)
          .sort((a, b) => b - a)
          .map(year => (
            <div key={year} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{yearTitles[year]}</h2>
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
