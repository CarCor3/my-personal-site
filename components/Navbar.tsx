'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

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
        <nav className="fixed top-0 left-0 right-0 z-50">
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
                        backgroundColor: pathname === '/about' ? '#DBCEA5' : '#8A7650',
                        borderRadius: '9999px',
                        opacity: pillStyle.opacity,
                        transition: 'left 0.35s cubic-bezier(0.4, 0, 0.2, 1), width 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease',
                        pointerEvents: 'none',
                        zIndex: 0,
                    }} />

                    {/* All 4 links — equally spaced by justify-between */}
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
                    <div className="flex md:hidden" style={{ zIndex: 1 }}>
                        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none" style={{ color: '#FDF8F5' }}>
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2">
                    {allLinks.map((link) => (
                        <Link
                            key={link.path}
                            href={link.path}
                            onClick={() => setIsOpen(false)}
                            className="font-daydream uppercase tracking-wide block px-4 py-1 rounded-full text-[28px] hover:opacity-70"
                            style={{ color: '#FDF8F5', backgroundColor: pathname === link.path ? '#8A7650' : 'transparent' }}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
