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
    themeColor: '#000000',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {/* Mobile black bars */}
                <div className="fixed top-0 left-0 right-0 h-8 bg-black z-[300] md:hidden" />
                <div className="fixed bottom-0 left-0 right-0 h-8 bg-black z-[300] md:hidden" />

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
