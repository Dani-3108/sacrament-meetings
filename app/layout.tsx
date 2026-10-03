import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NavLinks from '@/components/NavLinks';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sacrament Meeting Planner',
  description: 'Plan and review sacrament meeting agendas',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <NavLinks />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}