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
    const isFirstRender = useRef(true);

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

        let timeoutId: NodeJS.Timeout;

        if (isFirstRender.current) {
            // Call updating after Framer Motion scale animations complete on first load
            timeoutId = setTimeout(() => {
                updatePill();
                isFirstRender.current = false;
            }, 900);
        } else {
            // Update immediately on subsequent navigations
            updatePill();
            timeoutId = setTimeout(updatePill, 50); // Small safety buffer for any minor layout shifts
        }

        window.addEventListener('resize', updatePill);
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', updatePill);
        };
    }, [pathname]);

    return (
        <nav className="fixed top-2 md:top-6 left-0 right-0 z-[200] flex justify-center px-4 md:px-8 pointer-events-none">
            {/* macOS Dock style (Desktop only): rounded full, floating, frosted glass, subtle border and shadow */}
            <div className="w-full max-w-6xl md:bg-white/10 md:backdrop-blur-md md:border md:border-white/20 md:shadow-[0_8px_32px_rgba(0,0,0,0.3)] md:rounded-full px-4 md:px-12 pointer-events-auto">
                <div className="flex justify-between h-16 md:h-14 items-center relative w-full" ref={containerRef}>

                    {/* Sliding pill (Hidden on mobile) */}
                    <div className="hidden md:block" style={{
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        left: pillStyle.left,
                        width: pillStyle.width,
                        height: '60px', // height of the active pill
                        backgroundColor: 'rgba(255, 255, 255, 0.25)', // glassy active highlight
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        borderRadius: '9999px',
                        opacity: pillStyle.opacity,
                        transition: 'left 0.35s cubic-bezier(0.4, 0, 0.2, 1), width 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease',
                        pointerEvents: 'none',
                        zIndex: 0,
                    }} />

                    {/* All 4 links — desktop */}
                    <div className="hidden md:flex flex-grow justify-between items-center px-4 w-full">
                        {allLinks.map((link, idx) => (
                            <motion.div
                                key={link.path}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.22, 1, 0.36, 1],
                                    delay: 0.1 * idx + 0.5
                                }}
                            >
                                <Link
                                    ref={el => { linkRefs.current[idx] = el; }}
                                    href={link.path}
                                    className="font-daydream uppercase tracking-wide text-[22px] md:text-[26px] hover:opacity-70 px-6 py-2 rounded-full inline-block flex items-center justify-center"
                                    style={{ color: '#000000', position: 'relative', zIndex: 1 }} //navbar titles color
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile button */}
                    <div className="md:hidden absolute left-0 flex items-center h-full" style={{ zIndex: 110 }}>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center justify-center focus:outline-none transition-colors duration-300"
                            style={{ color: isOpen ? '#FDF8F5' : '#FFFFFF' }}
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
                        className="fixed inset-0 bg-black/40 backdrop-blur-2xl z-[100] md:hidden flex flex-col items-center justify-center space-y-12 pointer-events-auto" /*mobile menu frosted glass background*/
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
