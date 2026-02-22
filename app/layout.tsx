import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import PageTransitionProvider from '../components/PageTransitionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'My Portfolio',
    description: 'A showcase of my work and skills',
};

export const viewport = {
    themeColor: '#EAE0CF',
    viewportFit: 'cover',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Navbar />
                <main>
                    <PageTransitionProvider>
                        {children}
                    </PageTransitionProvider>
                </main>
            </body>
        </html>
    );
}
