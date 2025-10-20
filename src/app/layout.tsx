
'use client';

import { useEffect } from 'react';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { usePathname } from 'next/navigation';
import { FirebaseClientProvider } from '@/firebase/client-provider';

// export const metadata: Metadata = {
//   title: 'Digital Connect',
//   description: 'Your central hub for information and connection.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  useEffect(() => {
    const handleContextmenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextmenu);
    return () => {
      document.removeEventListener('contextmenu', handleContextmenu);
    };
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Luit Kumar Barman</title>
        <meta name="description" content="Change begins with a click — we’re just one away." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
            <div className="flex min-h-screen flex-col">
              {!isAdminRoute && <Header />}
              <main className="flex-1">{children}</main>
              {!isAdminRoute && <Footer />}
            </div>
            <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
