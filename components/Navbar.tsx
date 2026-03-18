'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const allLinks = [
    { name: 'Home', path: '#home' },
    { name: 'About', path: '#about' },
    { name: 'Projects', path: '#projects' },
    { name: 'Contact', path: '#contact' },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [activeHash, setActiveHash] = useState('#home');

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        e.preventDefault();
        const element = document.getElementById(path.substring(1));
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
            window.history.pushState(null, '', path);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            let current = '#home';
            for (const link of allLinks) {
                const element = document.getElementById(link.path.substring(1));
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Active if top is near viewport top.
                    if (rect.top <= window.innerHeight / 3) {
                        current = link.path;
                    }
                }
            }
            setActiveHash(current);
        };
        window.addEventListener('scroll', handleScroll);
        // Initial setup
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="fixed top-2 md:top-6 left-0 right-0 z-[200] flex justify-center px-4 md:px-8 pointer-events-none">
            {/* macOS Dock style (Desktop only): rounded full, floating, frosted glass, subtle border and shadow */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                className="w-full max-w-6xl md:bg-white/10 md:backdrop-blur-md md:border md:border-white/20 md:shadow-[0_8px_32px_rgba(0,0,0,0.3)] md:rounded-full px-4 md:px-12 pointer-events-auto"
            >
                <div className="flex justify-between h-16 md:h-14 items-center relative w-full">

                    {/* All 4 links — desktop */}
                    <div className="hidden md:flex flex-grow justify-between items-center px-4 w-full">
                        {allLinks.map((link, idx) => {
                            const isActive = activeHash === link.path;
                            return (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.8,
                                        ease: [0.22, 1, 0.36, 1],
                                        delay: 0.1 * idx + 0.5
                                    }}
                                    style={{ position: 'relative' }}
                                    className="flex items-center justify-center h-[60px]"
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="navPill"
                                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                            style={{
                                                position: 'absolute',
                                                inset: 0,
                                                backgroundColor: 'rgba(255, 255, 255, 0.25)', // glassy active highlight
                                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                                borderRadius: '9999px',
                                                zIndex: 0,
                                            }}
                                        />
                                    )}
                                    <Link
                                        href={link.path}
                                        onClick={(e) => handleLinkClick(e, link.path)}
                                        className="font-daydream uppercase tracking-wide text-[22px] md:text-[26px] hover:opacity-70 px-6 py-2 rounded-full relative z-10 flex items-center justify-center"
                                        style={{ color: '#000000' }} //navbar titles color
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Mobile button */}
                    <div className="md:hidden absolute left-0 flex items-center h-full" style={{ zIndex: 110 }}>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center justify-center focus:outline-none transition-colors duration-300"
                            style={{ color: isOpen ? '#FDF8F5' : '#000000' }} //navbat mobile color
                        >
                            {/* ADJUST SIZE HERE (size={32}) */}
                            {isOpen ? (
                                <X size={32} strokeLinecap="butt" />
                            ) : (
                                <Menu size={32} strokeLinecap="butt" />
                            )}
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Mobile menu - Full Screen */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: "linear" }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-2xl z-[100] md:hidden flex flex-col items-center justify-center space-y-12 pointer-events-auto" /*mobile menu frosted glass background*/
                    >
                        {allLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                onClick={(e) => handleLinkClick(e, link.path)}
                                className="font-daydream uppercase tracking-wide text-4xl text-[#FDF8F5] hover:opacity-70 transition-all"
                                style={{
                                    textShadow: activeHash === link.path ? '4px 4px 0px rgba(0,0,0,0.2)' : 'none',
                                    transform: activeHash === link.path ? 'scale(1.1)' : 'scale(1)'
                                }}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
