'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import AboutPage from './about/page';
import ProjectsPage from './projects/page';
import ContactPage from './contact/page';

/* ── Magnetic word ─────────────────────────────────────────────── */
function MagneticWord({
    children,
    strength = 0.35,
    className,
    style,
    disabled = false,
}: {
    children: React.ReactNode;
    strength?: number;
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const raf = useRef<number>();

    const handleMouseMove = (e: React.MouseEvent) => {
        if (disabled) return;
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * strength;
        const dy = (e.clientY - cy) * strength;
        raf.current = requestAnimationFrame(() => setOffset({ x: dx, y: dy }));
    };

    const handleMouseLeave = () => {
        if (raf.current) cancelAnimationFrame(raf.current);
        setOffset({ x: 0, y: 0 });
    };

    if (disabled) {
        return (
            <span className={className} style={{ ...style, display: 'inline-block' }}>
                {children}
            </span>
        );
    }

    return (
        <span
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className}
            style={{
                ...style,
                display: 'inline-block',
                transform: `translate(${offset.x}px, ${offset.y}px)`,
                transition: offset.x === 0 && offset.y === 0
                    ? 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
                    : 'transform 0.08s linear',
                willChange: 'transform',
                cursor: 'default',
            }}
        >
            {children}
        </span>
    );
}

/* ── Home ──────────────────────────────────────────────────────── */
export default function Home() {
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        document.documentElement.style.backgroundColor = '#000000'; //does something for top and bottom screen
        document.body.style.backgroundColor = '#000000';
        document.body.style.backgroundImage = 'url("/backgrounds/DESK4.jpg")';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center bottom';
        document.body.style.backgroundAttachment = 'fixed';

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    const isMobile = windowWidth > 0 && windowWidth < 768;

    return (
        <main className="w-full relative bg-transparent overflow-x-hidden">
            <section id="home" className="h-[100vh] w-full relative overflow-hidden">

                {/* Background */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 0,
                        backgroundColor: '#000000', //home page background color
                        overflow: 'hidden'
                    }}
                >
                    <motion.video
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    >
                        <source src="/backgrounds/BEACH_local.mp4" />
                    </motion.video>
                </div>

                {/* ── Title ── */}
                <motion.div
                    initial={{ opacity: 0, x: "-50%", y: "-50%" }}
                    animate={{ opacity: 1, x: "-50%", y: "-50%" }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                    style={{
                        position: 'absolute',
                        // Visually centers it in the remaining space below the desktop navbar (~90px)
                        top: isMobile ? '50%' : 'calc(50dvh + 45px)',
                        left: '48%',
                        zIndex: 2,
                        textAlign: 'center',
                        width: isMobile ? '90%' : 'auto',
                    }}
                >
                    <p className="font-ari text-4xl md:text-[clamp(3rem,6vw,6rem)] font-bold mb-4 md:mb-[0.5em]" style={{ color: '#fdfdfdff' }}>
                        <MagneticWord strength={0.4} disabled={isMobile}>Hi, I'm</MagneticWord>
                    </p>
                    <h1 className="font-daydream font-bold tracking-tight" style={{
                        color: '#ffffffff', //CARLOS CORDOVA color fff8dcff
                        fontSize: isMobile ? '3rem' : 'clamp(4rem, 8vw, 8rem)', // Responsive font size
                        WebkitTextStroke: isMobile ? 'none' : '0px #E76F51', // CARLOS CORDOVA outline color
                        textShadow: isMobile ? 'none' : '0px 0px 0px rgba(3, 2, 2, 1)', // Optional: Extra Shadow drop
                        lineHeight: '1.2'
                    }}>
                        <MagneticWord strength={0.45} disabled={isMobile} style={{ display: 'block', marginBottom: isMobile ? '20px' : '30px' }}>
                            Carlos
                        </MagneticWord>
                        <MagneticWord strength={0.45} disabled={isMobile} style={{ display: 'block' }}>
                            Cordova
                        </MagneticWord>
                    </h1>
                </motion.div>

            </section>

            <AboutPage />
            <ProjectsPage />
            <ContactPage />

        </main>
    );
}
