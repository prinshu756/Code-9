
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';

const FormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  year: z.coerce.number().min(1, {message: 'Year must be at least 1.'}).max(4, {message: 'Year must be at most 4.'}),
  interests: z.string().min(3, {
    message: 'Interests must be at least 3 characters.',
  }),
  department: z.string(),
});

export type RegistrationFormData = z.infer<typeof FormSchema>;

interface RegistrationFormProps {
    onSubmit: (data: RegistrationFormData) => void;
    department: string;
}

export function RegistrationForm({ onSubmit, department }: RegistrationFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      interests: '',
      department: department,
    },
  });

  const handleFormSubmit = (data: RegistrationFormData) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <>
        <DialogHeader>
            <DialogTitle>Register</DialogTitle>
            <DialogDescription>Fill out the form to register.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
            <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="w-full space-y-6">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="1" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Interests</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g. AI, Robotics, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <DialogClose asChild>
                    <Button type="submit">Submit</Button>
                </DialogClose>
            </form>
            </Form>
        </div>
    </>
  );
}
