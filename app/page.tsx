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

/* ── Constants ─────────────────────────────────────────────────── */
const PHOTOS = [
    { src: 'pic1.jpeg', title: 'Atlanta, GA' },
    { src: 'pic2.jpeg', title: 'Georgia Tech, GA' },
    { src: 'pic3.jpeg', title: 'Mancora, Peru' },
    { src: 'pic4.jpeg', title: 'Denver, CO' },
    { src: 'pic5.jpeg', title: 'Machu Picchu, Peru' },
];
const PAD = { sides: 20, top: 60, bottom: 20 };
const THUMB = { imgW: 260, imgH: 340 }; /*sliding show position*/
const EXP = { imgW: 480, imgH: 600 };

function polaroidW(imgW: number) { return imgW + PAD.sides * 2; }
function polaroidH(imgH: number) { return imgH + PAD.top + PAD.bottom; }

const THUMB_W = polaroidW(THUMB.imgW);
const THUMB_H = polaroidH(THUMB.imgH);
const EXP_W = polaroidW(EXP.imgW);
const EXP_H = polaroidH(EXP.imgH);

/* ── Home ──────────────────────────────────────────────────────── */
export default function Home() {
    const [openIdx, setOpenIdx] = useState<number | null>(null);
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
    const [phase, setPhase] = useState<'closed' | 'opening' | 'open' | 'closing'>('closed');
    const [originRect, setOriginRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null);
    const [windowWidth, setWindowWidth] = useState(0);
    const thumbRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = windowWidth > 0 && windowWidth < 768;

    const openPhoto = (idx: number, rect: DOMRect) => {
        setOriginRect({ top: rect.top, left: rect.left, width: rect.width, height: rect.height });
        setOpenIdx(idx);
        setPhase('opening');          // start at thumbnail position
        // next frame: fly to center
        requestAnimationFrame(() =>
            requestAnimationFrame(() => setPhase('open'))
        );
    };

    const closePhoto = () => {
        setPhase('closing');          // Fade out / vanish effect
        setTimeout(() => {
            setOpenIdx(null);
            setPhase('closed');
            setOriginRect(null);
        }, 300); // Shorter duration for the 'disappear' phase
    };

    const handleThumbClick = (idx: number, e: React.MouseEvent) => {
        if (phase === 'open' || phase === 'opening') {
            closePhoto();
        } else if (phase === 'closed') {
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
            openPhoto(idx, rect);
        }
    };

    // Flying card target: scaled for mobile, fixed for desktop
    const currentExpW = isMobile ? windowWidth * 0.8 : EXP_W;
    const currentExpH = isMobile ? (currentExpW * (EXP_H / EXP_W)) : EXP_H;
    const currentTopPad = isMobile ? (currentExpH * 0.08) : PAD.top;

    const targetTop = typeof window !== 'undefined' ? (window.innerHeight - currentExpH) / 2 : 0;
    const targetLeft = typeof window !== 'undefined' ? (window.innerWidth - currentExpW) / 2 : 0;

    // Is the flying card at thumbnail position or at center?
    const atOrigin = phase === 'opening';
    const isClosing = phase === 'closing';

    const flyStyle: React.CSSProperties = {
        position: 'fixed',
        top: atOrigin && originRect ? originRect.top : targetTop,
        left: atOrigin && originRect ? originRect.left : targetLeft,
        width: atOrigin && originRect ? originRect.width : currentExpW,
        height: atOrigin && originRect ? originRect.height : currentExpH,
        backgroundColor: '#ffffff',
        boxShadow: atOrigin ? '0 5px 20px rgba(0,0,0,0.22)' : '0 24px 80px rgba(0,0,0,0.55)',
        zIndex: 600,
        opacity: isClosing ? 0 : 1,
        transform: isClosing ? 'scale(0.95) translateY(20px)' : 'scale(1) translateY(0)',
        transition: 'top 0.48s cubic-bezier(0.23,1,0.32,1), left 0.48s cubic-bezier(0.23,1,0.32,1), width 0.48s cubic-bezier(0.23,1,0.32,1), height 0.48s cubic-bezier(0.23,1,0.32,1), box-shadow 0.48s ease, opacity 0.3s ease, transform 0.3s ease',
        overflow: 'hidden',
        cursor: 'zoom-out',
        padding: isMobile
            ? `${(currentExpH * 0.08)}px ${(currentExpW * 0.04)}px ${(currentExpH * 0.03)}px`
            : `${PAD.top}px ${PAD.sides}px ${PAD.bottom}px`,
        boxSizing: 'border-box',
    };

    return (
        <div className="min-h-[100dvh] relative md:overflow-hidden md:fixed md:inset-0">

            {/* Background */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
                style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundColor: '#EAE0CF' }}
            />

            {/* ── Flip Container (yo.png / fill.png) ── */}
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                onClick={() => setIsFlipped(!isFlipped)}
                style={{
                    position: 'absolute',
                    top: isMobile ? -10 : -250,
                    left: isMobile ? 0 : '0%',
                    height: isMobile ? '100vh' : '134vh',
                    width: isMobile ? '100%' : 'fit-content',
                    zIndex: 1,
                    cursor: 'pointer',
                    perspective: '2000px',
                }}
            >
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}>
                    {/* Front Face: yo.png */}
                    <div style={{
                        position: 'relative',
                        height: '100%',
                        width: isMobile ? '100%' : 'auto',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                    }}>
                        <img
                            src="/backgrounds/yo.png"
                            alt="Front"
                            style={{
                                height: '100%',
                                width: isMobile ? '100%' : 'auto',
                                objectFit: isMobile ? 'cover' : 'fill',
                                display: 'block',
                                userSelect: 'none',
                                pointerEvents: 'none',
                            }}
                        />
                        {/* Gradient bottom edge for mobile to blend the "hard cut" */}
                        {isMobile && (
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to bottom, transparent 90%, #EAE0CF 100%)',
                                pointerEvents: 'none',
                            }} />
                        )}
                    </div>

                    {/* Back Face: fill.png */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: isMobile ? '100%' : 'auto',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                    }}>
                        <img
                            src="/backgrounds/fill.png"
                            alt="Back"
                            style={{
                                height: '100%',
                                width: isMobile ? '100%' : 'auto',
                                objectFit: isMobile ? 'cover' : 'fill',
                                display: 'block',
                                userSelect: 'none',
                                pointerEvents: 'none',
                            }}
                        />
                        {/* Quote Overlay */}
                        <div style={{
                            position: 'absolute',
                            top: '74%',
                            left: '52%',
                            transform: 'translate(-50%, -50%)',
                            width: '70%',
                            textAlign: 'center',
                            pointerEvents: 'none',
                        }}>
                            <p className="font-dogica" style={{
                                color: '#000000',
                                fontSize: isMobile ? '12px' : '18px',
                                lineHeight: '1.8',
                                textShadow: '0 0px 0px rgba(0,0,0,0.1)',
                                textTransform: 'uppercase'
                            }}>
                                I like cats
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* ── Title — adjusted for mobile ── */}
            <motion.div
                initial={{ opacity: 0, x: "calc(-50% + 50px)", y: "-50%" }}
                animate={{ opacity: 1, x: "-50%", y: "-50%" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                style={{
                    position: 'absolute',
                    top: isMobile ? '20%' : '47%',
                    left: isMobile ? '48%' : '67%',
                    zIndex: 2,
                    textAlign: 'center',
                    width: isMobile ? '90%' : 'auto',
                }}
            >
                <p className="font-ari text-4xl md:text-8xl font-bold mb-4 md:mb-8" style={{ color: '#000000' }}>
                    <MagneticWord strength={0.4}>Hi, I'm</MagneticWord>
                </p>
                <h1 className="font-daydream text-5xl md:text-6xl lg:text-9xl font-bold tracking-tight" style={{ color: '#8A7650' }}>
                    <MagneticWord strength={0.45} style={{ display: 'block', marginBottom: isMobile ? '10px' : '30px' }}>
                        Carlos
                    </MagneticWord>
                    <MagneticWord strength={0.45} style={{ display: 'block' }}>
                        Cordova
                    </MagneticWord>
                </h1>
            </motion.div>

            {/*Photos slide*/}
            <motion.div
                initial={{ opacity: 0, x: isMobile ? -50 : "-100%", y: 100 }}
                animate={{ opacity: 1, x: isMobile ? 0 : "-50%", y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
                style={{
                    position: 'absolute',
                    bottom: isMobile ? -360 : -360,
                    left: isMobile ? '0' : '50%',
                    width: isMobile ? '100%' : 'auto',
                    zIndex: 2,
                    overflow: isMobile ? 'hidden' : 'visible',
                }}
            >
                <motion.div
                    drag={isMobile ? "x" : false}
                    dragConstraints={{ left: -((THUMB_W + 28) * PHOTOS.length * 2), right: 0 }}
                    animate={{
                        x: [0, -((THUMB_W + 28) * PHOTOS.length)]
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: PHOTOS.length * 8, // Slightly slower on desktop for readability
                            ease: "linear",
                        }
                    }}
                    style={{
                        display: 'flex',
                        gap: 28,
                        alignItems: 'flex-end',
                        width: 'fit-content',
                    }}
                >
                    {[...PHOTOS, ...PHOTOS, ...PHOTOS].map((item, idx) => {
                        const originalIdx = idx % PHOTOS.length;
                        const isOpen = openIdx === originalIdx;

                        return (
                            <motion.div
                                key={`${item.src}-${idx}`}
                                ref={el => { if (idx < PHOTOS.length) thumbRefs.current[idx] = el; }}
                                onClick={(e) => handleThumbClick(originalIdx, e)}
                                onMouseEnter={() => setHoveredIdx(idx)}
                                onMouseLeave={() => setHoveredIdx(null)}
                                initial={false}
                                animate={{
                                    y: isOpen ? 600 : (hoveredIdx === idx ? -12 : 0),
                                    opacity: isOpen ? 0 : 1,
                                    scale: (hoveredIdx === idx && !isOpen) ? 1.05 : 1,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 25,
                                    mass: 1,
                                    opacity: { duration: 0.2 }
                                }}
                                style={{
                                    width: THUMB_W,
                                    height: THUMB_H,
                                    flexShrink: 0,
                                    backgroundColor: '#ffffff',
                                    padding: `${PAD.top}px ${PAD.sides}px ${PAD.bottom}px`,
                                    boxSizing: 'border-box',
                                    cursor: 'pointer',
                                    boxShadow: hoveredIdx === idx
                                        ? '0 20px 50px rgba(0,0,0,0.35)'
                                        : '0 5px 20px rgba(0,0,0,0.22)',
                                    pointerEvents: phase !== 'closed' ? 'none' : 'auto',
                                    position: 'relative',
                                    zIndex: hoveredIdx === idx ? 10 : 1,
                                }}
                            >
                                {/* Title */}
                                <p className="font-dogica text-[10px] text-gray-500 absolute top-0 left-0 w-full text-center pt-6 uppercase tracking-widest">
                                    {item.title}
                                </p>

                                <div style={{ width: '100%', height: THUMB.imgH, overflow: 'hidden' }}>
                                    <img
                                        src={`/backgrounds/${item.src}`}
                                        alt={item.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            display: 'block',
                                            userSelect: 'none',
                                            pointerEvents: 'none',
                                        }}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </motion.div>

            {/* ── Dark backdrop ── */}
            {openIdx !== null && (
                <div
                    onClick={closePhoto}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 500,
                        backgroundColor: phase === 'open' ? 'rgba(0,0,0,0.72)' : 'rgba(0,0,0,0)',
                        transition: 'background-color 0.48s ease',
                        cursor: 'zoom-out',
                    }}
                />
            )}

            {/* ── Flying polaroid (single card, animates between positions) ── */}
            {openIdx !== null && (
                <>
                    <motion.div
                        style={flyStyle}
                        onClick={closePhoto}
                        initial={false}
                        animate={{
                            scale: phase === 'open' ? 1 : 0.98,
                        }}
                        transition={{ duration: 0.48, ease: [0.23, 1, 0.32, 1] }}
                    >
                        {/* Title - centered in top padding */}
                        <p
                            className="font-dogica text-xs text-gray-500 absolute top-0 left-0 w-full text-center uppercase tracking-widest flex items-center justify-center"
                            style={{ height: currentTopPad }}
                        >
                            {PHOTOS[openIdx as number].title}
                        </p>

                        <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                            <img
                                src={`/backgrounds/${PHOTOS[openIdx as number].src}`}
                                alt={PHOTOS[openIdx as number].title}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block',
                                    userSelect: 'none',
                                    pointerEvents: 'none',
                                }}
                            />
                        </div>
                    </motion.div>

                    {/* ✕ close button */}
                    <div
                        onClick={closePhoto}
                        style={{
                            position: 'fixed',
                            top: 28,
                            right: 36,
                            color: '#fff',
                            fontSize: 32,
                            lineHeight: 1,
                            cursor: 'pointer',
                            zIndex: 700,
                            opacity: phase === 'open' ? 0.8 : 0,
                            transition: 'opacity 0.4s ease',
                            userSelect: 'none',
                        }}
                    >
                        ✕
                    </div>
                </>
            )}
        </div>
    );
}
