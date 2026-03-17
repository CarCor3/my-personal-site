'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/* ── Magnetic word ─────────────────────────────────────────────── */
function MagneticWord({
    children,
    strength = 0.35,
    className,
    style,
}: {
    children: React.ReactNode;
    strength?: number;
    className?: string;
    style?: React.CSSProperties;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const raf = useRef<number>();

    const handleMouseMove = (e: React.MouseEvent) => {
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

        // Update body bg color on mount
        const currentIsMobile = window.innerWidth > 0 && window.innerWidth < 768;
        if (currentIsMobile) {
            document.documentElement.style.backgroundColor = '#8fa6b6'; //top and bottom of screen 
            document.body.style.backgroundColor = '#8fa6b6';
            const meta = document.querySelector("meta[name='theme-color']");
            if (meta) meta.setAttribute('content', '#8fa6b6');
        } else {
            document.documentElement.style.backgroundColor = '#2F3E46';
            document.body.style.backgroundColor = '#2F3E46';
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            document.documentElement.style.backgroundColor = '';
            document.body.style.backgroundColor = '';
            const meta = document.querySelector("meta[name='theme-color']");
            if (meta) meta.setAttribute('content', '#FFFFFF'); // revert to default
        }
    }, [windowWidth]);

    const isMobile = windowWidth > 0 && windowWidth < 768;

    return (
        <>
            <div className="min-h-[100dvh] relative md:overflow-hidden md:fixed md:inset-0">

                {/* Background */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 0,
                        backgroundColor: '#8fa6b6ff',
                        overflow: 'hidden'
                    }}
                >
                    <video
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
                        <source src="/backgrounds/BEACH.MOV" />
                    </video>
                </motion.div>

                {/* ── Title ── */}
                <motion.div
                    initial={{ opacity: 0, x: "-50%", y: "-50%" }}
                    animate={{ opacity: 1, x: "-50%", y: "-50%" }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                    style={{
                        position: 'absolute',
                        top: '465px', //location of home title
                        left: '50%',
                        zIndex: 2,
                        textAlign: 'center',
                        width: isMobile ? '90%' : 'auto',
                    }}
                >
                    <p className="font-ari text-4xl md:text-8xl font-bold mb-4 md:mb-12" style={{ color: '#fdfdfdff' }}>
                        <MagneticWord strength={0.4}>Hi, I'm</MagneticWord>
                    </p>
                    <h1 className="font-daydream font-bold tracking-tight" style={{
                        color: '#fff8dcff', //CARLOS CORDOVA color
                        fontSize: isMobile ? '3rem' : '8rem', // ADJUST THESE: Font size for mobile and desktop
                        WebkitTextStroke: '0px #E76F51', // CARLOS CORDOVA outline color
                        textShadow: '0px 0px 0px rgba(3, 2, 2, 1)', // Optional: Extra Shadow drop
                        lineHeight: '1.2'
                    }}>
                        <MagneticWord strength={0.45} style={{ display: 'block', marginBottom: isMobile ? '20px' : '30px' }}>
                            Carlos
                        </MagneticWord>
                        <MagneticWord strength={0.45} style={{ display: 'block' }}>
                            Cordova
                        </MagneticWord>
                    </h1>
                </motion.div>

            </div>
        </>
    );
}
