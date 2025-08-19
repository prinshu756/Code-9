import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { RegistrationProvider } from '@/context/RegistrationContext';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Network',
  description: 'Save, organize, and discover new links with Network.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased min-h-screen h-full">
        <RegistrationProvider>
          {children}
        </RegistrationProvider>
        <Toaster />
      </body>
    </html>
  );
}
