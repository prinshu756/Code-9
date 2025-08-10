'use client';

import { useContext } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { RegistrationContext } from '@/context/RegistrationContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function ClubsPage() {
  const { clubs } = useContext(RegistrationContext);

  return (
    <AppLayout>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Clubs</h1>
        {clubs.length === 0 ? (
           <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
             <p className="text-lg">No clubs have been added yet.</p>
             <p>Admins can add clubs from the create page.</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map((club) => (
              <Card key={club.id}>
                <CardHeader>
                  <CardTitle>{club.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="aspect-video relative">
                     <Image 
                        src={club.imageUrl} 
                        alt={club.title} 
                        fill
                        className="rounded-md object-cover"
                        data-ai-hint="club image"
                      />
                   </div>
                  <p>{club.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
