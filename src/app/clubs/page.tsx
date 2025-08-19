'use client';

import { useContext, useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { RegistrationContext } from '@/context/RegistrationContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Club {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export default function ClubsPage() {
  const { clubs } = useContext(RegistrationContext);
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);

  return (
    <AppLayout title="Clubs">
      <div className="container mx-auto">
        {clubs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <p className="text-lg">No clubs have been added yet.</p>
            <p>Admins can add clubs from the create page.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {clubs.map((club) => (
               <Dialog key={club.id}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:bg-accent hover:shadow-lg transition-all duration-200 group">
                    <CardContent className="flex flex-col items-center justify-center p-4 gap-4">
                      <div className="w-24 h-24 relative">
                        <Image 
                          src={club.imageUrl} 
                          alt={club.title}
                          fill
                          className="rounded-full object-cover border-4 border-card group-hover:border-accent transition-colors duration-200"
                          data-ai-hint="club image"
                        />
                      </div>
                      <CardTitle className="text-center text-base font-semibold">{club.title}</CardTitle>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>{club.title}</DialogTitle>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <div className="aspect-video relative">
                            <Image 
                                src={club.imageUrl} 
                                alt={club.title} 
                                fill
                                className="rounded-md object-cover"
                                data-ai-hint="club image"
                            />
                        </div>
                        <p className="text-sm text-muted-foreground">{club.description}</p>
                    </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
