import type { Metadata } from 'next';
import { Orbitron, Rajdhani } from 'next/font/google';
import CustomCursor from '@/components/CustomCursor';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const orbitron = Orbitron({ 
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['400', '500', '600', '700', '800', '900']
});

const rajdhani = Rajdhani({
  subsets: ['latin'],
  variable: '--font-rajdhani',
  weight: ['300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'Pagani Huayra BC | Macchina Volante',
  description: 'The Pagani Huayra BC Macchina Volante luxury car showcase.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${rajdhani.variable} antialiased`}>
        <CustomCursor />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
