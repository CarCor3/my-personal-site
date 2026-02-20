'use client';

import { useEffect, useRef, useState } from 'react';

/* Magnetic word — floats toward the cursor while hovered */
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
        cancelAnimationFrame(raf.current!);
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
                    ? 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)'  // spring back
                    : 'transform 0.08s linear',                          // follow cursor
                willChange: 'transform',
                cursor: 'default',
            }}
        >
            {children}
        </span>
    );
}

export default function Home() {
    const [imgVisible, setImgVisible] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setImgVisible(true), 400);
        return () => clearTimeout(t);
    }, []);

    return (
        <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>

            {/* Background color */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundColor: '#EAE0CF' }} />

            {/* yo.png — fades in after delay */}
            <img
                src="/backgrounds/yo.png"
                alt=""
                style={{
                    position: 'absolute',
                    top: -270,
                    left: '-3%',
                    height: '130vh',
                    width: 'auto',
                    zIndex: 1,
                    pointerEvents: 'none',
                    userSelect: 'none',
                    opacity: imgVisible ? 1 : 0,
                    transition: 'opacity 2s ease',
                }}
            />

            {/* Text */}
            <div style={{
                position: 'absolute',
                top: '47%',
                left: '67%',
                transform: 'translate(-50%, -50%)',
                zIndex: 2,
                textAlign: 'center',
            }}>
                <p className="font-ari text-2x md:text-8xl font-bold mb-8" style={{ color: '#000000' }}>
                    <MagneticWord strength={0.4}>Hi, I'm</MagneticWord>
                </p>
                <h1 className="font-daydream text-4xl md:text-6xl lg:text-9xl font-bold tracking-tight" style={{ color: '#8A7650' }}>
                    <MagneticWord strength={0.45} style={{ display: 'block', marginBottom: '25px' }}>
                        Carlos
                    </MagneticWord>
                    <MagneticWord strength={0.45} style={{ display: 'block' }}>
                        Cordova
                    </MagneticWord>
                </h1>
            </div>
        </div>
    );
}
