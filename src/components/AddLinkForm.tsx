'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Plus, Link2 } from 'lucide-react';

const formSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL.' }),
});

type AddLinkFormProps = {
  onAddLink: (url: string) => void;
};

export function AddLinkForm({ onAddLink }: AddLinkFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddLink(values.url);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-headline font-semibold flex items-center gap-2">
                <Link2 className="text-primary"/>
                Add a new link
              </FormLabel>
              <div className="flex items-center space-x-2">
                <FormControl>
                  <Input placeholder="https://example.com" {...field} className="text-base" />
                </FormControl>
                <Button type="submit" size="lg" className="h-11">
                  <Plus className="mr-2 h-4 w-4" /> Add
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
