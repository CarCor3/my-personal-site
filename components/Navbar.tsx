'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const allLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });

    const containerRef = useRef<HTMLDivElement>(null);
    const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    useEffect(() => {
        const updatePill = () => {
            const idx = allLinks.findIndex(l => l.path === pathname);
            const activeEl = idx !== -1 ? linkRefs.current[idx] : null;

            if (activeEl && containerRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const elRect = activeEl.getBoundingClientRect();
                setPillStyle({
                    left: elRect.left - containerRect.left,
                    width: elRect.width,
                    opacity: 1,
                });
            }
        };

        const timeout = setTimeout(updatePill, 10);
        window.addEventListener('resize', updatePill);
        return () => {
            clearTimeout(timeout);
            window.removeEventListener('resize', updatePill);
        };
    }, [pathname]);

    return (
        <nav className="fixed top-0 left-0 right-0 z-[200]">
            <div className="max-w-7xl mx-auto pl-0 pr-4 sm:pl-0 sm:pr-6 lg:pl-0 lg:pr-2">
                {/* justify-between: Home anchors left, Projects anchors right, Contact+About fall evenly between */}
                <div className="flex justify-between h-32 items-center relative" ref={containerRef}>

                    {/* Sliding pill */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        left: pillStyle.left,
                        width: pillStyle.width,
                        height: '48px',
                        backgroundColor: '#8A7650',
                        borderRadius: '9999px',
                        opacity: pillStyle.opacity,
                        transition: 'left 0.35s cubic-bezier(0.4, 0, 0.2, 1), width 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease',
                        pointerEvents: 'none',
                        zIndex: 0,
                    }} />

                    {/* All 4 links — desktop */}
                    {allLinks.map((link, idx) => (
                        <Link
                            key={link.path}
                            ref={el => { linkRefs.current[idx] = el; }}
                            href={link.path}
                            className="hidden md:inline-block font-daydream uppercase tracking-wide text-[28px] hover:opacity-70 px-4 py-1 rounded-full"
                            style={{ color: '#FDF8F5', position: 'relative', zIndex: 1 }}
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Mobile button */}
                    <div className="absolute left-6 top-10 md:hidden" style={{ zIndex: 110 }}>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center justify-center focus:outline-none transition-colors duration-300"
                            style={{ color: isOpen ? '#FDF8F5' : '#000000' }}
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
            </div>

            {/* Mobile menu - Full Screen */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: "linear" }}
                        className="fixed inset-0 bg-[#8A7650] z-[100] md:hidden flex flex-col items-center justify-center space-y-12 touch-none"
                    >
                        {allLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                onClick={() => setIsOpen(false)}
                                className="font-daydream uppercase tracking-wide text-4xl text-[#FDF8F5] hover:opacity-70 transition-all"
                                style={{
                                    textShadow: pathname === link.path ? '4px 4px 0px rgba(0,0,0,0.2)' : 'none',
                                    transform: pathname === link.path ? 'scale(1.1)' : 'scale(1)'
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
