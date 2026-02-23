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

    const openPhoto = (idx: number) => {
        const el = thumbRefs.current[idx];
        if (!el) return;
        const r = el.getBoundingClientRect();
        setOriginRect({ top: r.top, left: r.left, width: r.width, height: r.height });
        setOpenIdx(idx);
        setPhase('opening');          // start at thumbnail position
        // next frame: fly to center
        requestAnimationFrame(() =>
            requestAnimationFrame(() => setPhase('open'))
        );
    };

    const closePhoto = () => {
        setPhase('closing');          // fly back to thumbnail
        setTimeout(() => {
            setPhase('closed');
            setOpenIdx(null);
            setOriginRect(null);
        }, 480);
    };

    const handleThumbClick = (idx: number) => {
        if (phase === 'open' || phase === 'opening') {
            closePhoto();
        } else if (phase === 'closed') {
            openPhoto(idx);
        }
    };

    // Flying card target: scaled for mobile, fixed for desktop
    const currentExpW = isMobile ? windowWidth * 0.8 : EXP_W;
    const currentExpH = isMobile ? (currentExpW * (EXP_H / EXP_W)) : EXP_H;

    const targetTop = typeof window !== 'undefined' ? (window.innerHeight - currentExpH) / 2 : 0;
    const targetLeft = typeof window !== 'undefined' ? (window.innerWidth - currentExpW) / 2 : 0;

    // Is the flying card at thumbnail position or at center?
    const atOrigin = phase === 'opening' || phase === 'closing';
    const flyStyle: React.CSSProperties = {
        position: 'fixed',
        top: atOrigin && originRect ? originRect.top : targetTop,
        left: atOrigin && originRect ? originRect.left : targetLeft,
        width: atOrigin && originRect ? originRect.width : currentExpW,
        height: atOrigin && originRect ? originRect.height : currentExpH,
        backgroundColor: '#ffffff',
        boxShadow: atOrigin ? '0 5px 20px rgba(0,0,0,0.22)' : '0 24px 80px rgba(0,0,0,0.55)',
        zIndex: 200,
        transition: 'top 0.48s cubic-bezier(0.23,1,0.32,1), left 0.48s cubic-bezier(0.23,1,0.32,1), width 0.48s cubic-bezier(0.23,1,0.32,1), height 0.48s cubic-bezier(0.23,1,0.32,1), box-shadow 0.48s ease',
        overflow: 'hidden',
        cursor: 'zoom-out',
        padding: isMobile
            ? `${(currentExpH * 0.08)}px ${(currentExpW * 0.04)}px ${(currentExpH * 0.03)}px`
            : `${PAD.top}px ${PAD.sides}px ${PAD.bottom}px`,
        boxSizing: 'border-box',
    };

    return (
        <div className="h-[100dvh] relative overflow-hidden fixed inset-0">

            {/* Background */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundColor: '#EAE0CF' }} />



            {/* ── Flip Container (yo.png / fill.png) ── */}
            <div
                onClick={() => setIsFlipped(!isFlipped)}
                style={{
                    position: 'absolute',
                    top: isMobile ? -10 : -270,
                    left: isMobile ? 0 : '-3%',
                    height: isMobile ? '100vh' : '130vh',
                    width: isMobile ? '100%' : 'fit-content',
                    zIndex: 1,
                    cursor: 'pointer',
                    perspective: '2000px',
                    opacity: 1,
                    transition: 'opacity 0.3s ease',
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
                                I may not have any<br />notable victories,<br />but I can surprise you with<br />the defeats I manage to survive.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Title — adjusted for mobile ── */}
            <div style={{
                position: 'absolute',
                top: isMobile ? '20%' : '47%',
                left: isMobile ? '50%' : '67%',
                transform: 'translate(-50%, -50%)',
                zIndex: 2,
                textAlign: 'center',
                width: isMobile ? '90%' : 'auto',
            }}>
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
            </div>

            {/*Photos slide*/}
            <div style={{
                position: 'absolute',
                bottom: isMobile ? -360 : -360,
                left: isMobile ? '0' : '67%',
                transform: isMobile ? 'none' : 'translateX(-50%)',
                width: isMobile ? '100%' : 'auto',
                zIndex: 2,
                overflow: isMobile ? 'hidden' : 'visible',
            }}>
                <motion.div
                    animate={isMobile ? {
                        x: [0, -((THUMB_W + 28) * PHOTOS.length)]
                    } : {}}
                    transition={isMobile ? {
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: PHOTOS.length * 5,
                            ease: "linear",
                        }
                    } : {}}
                    style={{
                        display: 'flex',
                        gap: 28,
                        alignItems: 'flex-end',
                        width: 'fit-content',
                    }}
                >
                    {(isMobile ? [...PHOTOS, ...PHOTOS, ...PHOTOS] : PHOTOS).map((item, idx) => {
                        const originalIdx = idx % PHOTOS.length;
                        const isOpen = openIdx === originalIdx;
                        return (
                            <div
                                key={`${item.src}-${idx}`}
                                ref={el => { if (idx < PHOTOS.length) thumbRefs.current[idx] = el; }}
                                onClick={() => handleThumbClick(originalIdx)}
                                onMouseEnter={() => setHoveredIdx(idx)}
                                onMouseLeave={() => setHoveredIdx(null)}
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
                                    // Hide thumbnail while its flying twin is visible
                                    opacity: isOpen ? 0 : 1,
                                    transform: hoveredIdx === idx && !isOpen
                                        ? 'translateY(-12px)'
                                        : 'translateY(0px)',
                                    transition: 'box-shadow 0.35s ease, transform 0.35s cubic-bezier(0.23,1,0.32,1), opacity 0.1s ease',
                                    pointerEvents: phase !== 'closed' ? 'none' : 'auto',
                                    position: 'relative',
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
                            </div>
                        );
                    })}
                </motion.div>
            </div>

            {/* ── Dark backdrop ── */}
            {openIdx !== null && (
                <div
                    onClick={closePhoto}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 150,
                        backgroundColor: phase === 'open' ? 'rgba(0,0,0,0.72)' : 'rgba(0,0,0,0)',
                        transition: 'background-color 0.48s ease',
                        cursor: 'zoom-out',
                    }}
                />
            )}

            {/* ── Flying polaroid (single card, animates between positions) ── */}
            {openIdx !== null && (
                <>
                    <div style={flyStyle} onClick={closePhoto}>
                        {/* Title */}
                        <p className="font-dogica text-xs text-gray-500 absolute top-0 left-0 w-full text-center pt-4 uppercase tracking-widest"> {/*pt-4 is for mobile sliding show position*/}
                            {PHOTOS[openIdx].title}
                        </p>

                        <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                            <img
                                src={`/backgrounds/${PHOTOS[openIdx].src}`}
                                alt={PHOTOS[openIdx].title}
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
                    </div>

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
                            zIndex: 300,
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
