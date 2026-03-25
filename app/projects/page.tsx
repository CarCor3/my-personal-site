'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

const projectImages = [
    {
        src: '/backgrounds/DECKS.png',
        backSrc: '/backgrounds/AP.png',
        alt: 'PeruAbroad',
        title: 'PeruAbroad',
        description: 'Building the biggest Peruvian Student Network in the world.',
        rotation: 6, x: 0, y: 0,
        objectFit: 'cover' as 'contain' | 'cover',
        objectPosition: 'center',
        scale: 1
    },
    {
        src: '/backgrounds/DECKS.png',
        backSrc: '/backgrounds/HACKER.png',
        alt: 'Project 1',
        title: 'GT HackerHouse',
        description: 'Helped build a community of unusually ambitious young people who are doing expectional things.',
        rotation: 1, x: -10, y: -15,
        objectFit: 'cover' as const,
        objectPosition: 'center',
        scale: 1
    },
    {
        src: '/backgrounds/DECKS.png',
        backSrc: '/backgrounds/G.png',
        alt: 'Project 1',
        title: 'Find George',
        description: 'Programmed and tested a pattern-matching algorithm in C, then optimized and translated it into MIPS assembly.',
        rotation: -8, x: -10, y: -15,
        objectFit: 'cover' as const,
        objectPosition: 'center',
        scale: 1
    },
    {
        src: '/backgrounds/DECKS.png',
        backSrc: '/backgrounds/BUZZ.png',
        alt: 'Project 2',
        title: 'Tales of Buzz',
        description: 'Build an RPG game implementing HashTables in a Mbed ARM-based microcontroller system and C++.',
        rotation: 2, x: 15, y: -10,
        objectFit: 'cover' as const,
        objectPosition: 'center',
        scale: 1
    },
    {
        src: '/backgrounds/DECKS.png',
        backSrc: '/backgrounds/CARS.png',
        alt: 'SCPC',
        title: 'Buzz Car',
        description: 'Built the power systems and motion control for a selfdriving racecar using a ESP32, MPM3610, DRV8833, and custom PCB.',
        rotation: -1, x: -15, y: 10,
        objectFit: 'cover' as const,
        objectPosition: 'center',
        scale: 1
    },
    {
        src: '/backgrounds/DECKS.png',
        backSrc: '/backgrounds/SCPC.png',
        alt: 'SCPC 1',
        title: 'SCPC',
        description: 'Student Center Programs Council former board member. Awarded Committe of the year 2025.',
        rotation: 8, x: 10, y: 15,
        objectFit: 'cover' as const,
        objectPosition: 'center',
        scale: 1
    }
];

export default function Projects() {
    const [cardOrder, setCardOrder] = useState([0, 1, 2, 3, 4, 5]); /*Number of cards on deck*/
    const [flyingCard, setFlyingCard] = useState<{ id: number, direction: 'left' | 'right' } | null>(null);
    const [inspectedIndex, setInspectedIndex] = useState<number | null>(null);
    const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
    const [windowWidth, setWindowWidth] = useState(0);
    const [scaleFactor, setScaleFactor] = useState(1);

    const draggedRef = useRef(false);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            setWindowWidth(w);

            if (w >= 768) {
                // Calculate exactly against the deck's true ~650px height bounding box
                const availableHeight = h - 200; // 100px for nav + 100px for bottom margin
                const heightScale = availableHeight / 650;

                const availableWidth = w - 200; // Left & right margins
                const widthScale = availableWidth / 1000;

                // Allow the deck to freely scale upwards to hit those margins nicely!
                setScaleFactor(Math.max(0.4, Math.min(heightScale, widthScale)));
            } else {
                setScaleFactor(1);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const isMobile = windowWidth > 0 && windowWidth < 768;

    const handleNext = (direction: 'left' | 'right' = 'right') => {
        if (flyingCard !== null || inspectedIndex !== null) return;

        const topCardIndex = cardOrder[cardOrder.length - 1];
        setFlyingCard({ id: topCardIndex, direction });

        setTimeout(() => {
            setCardOrder(prev => {
                const next = [...prev];
                const topCard = next.pop()!;
                next.unshift(topCard);
                return next;
            });
            setFlyingCard(null);
        }, 400);
    };

    const handlePrev = (direction: 'left' | 'right' = 'left') => {
        if (flyingCard !== null || inspectedIndex !== null) return;

        const topCardIndex = cardOrder[cardOrder.length - 1];
        setFlyingCard({ id: topCardIndex, direction });

        setTimeout(() => {
            setCardOrder(prev => {
                const next = [...prev];
                const bottomCard = next.shift()!;
                next.push(bottomCard);
                return next;
            });
            setFlyingCard(null);
        }, 400);
    };

    const currentProject = inspectedIndex !== null ? projectImages[inspectedIndex] : null;

    return (
        <section id="projects" className="h-screen flex flex-col items-center justify-center bg-[#8fa6b6ff] /*projects background color*/ transition-colors duration-500 overflow-hidden relative w-full"
            style={{ paddingTop: isMobile ? '0' : '90px' }} // offset for navbar on desktop
        >
            <div
                className="relative w-full flex-1 flex flex-col items-center justify-center"
                style={{
                    transform: isMobile ? 'none' : `scale(${scaleFactor})`,
                    transformOrigin: 'center center'
                }}
            >
                <div className="relative w-full max-w-7xl flex flex-col items-center justify-center px-4 md:px-0">
                    {/* Deck/Inpection Area */}
                    {/* Deck/Inpection Area */}
                    <motion.div
                        animate={{ height: isMobile && inspectedIndex !== null ? 620 : (isMobile ? 450 : 600) }}
                        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                        className="relative w-full flex flex-col md:flex-row items-center justify-center"
                    >
                        {/* Left hint: DRAG TO SKIP */}
                        <AnimatePresence>
                            {inspectedIndex === null && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute left-0 md:left-6 z-[60] font-dogica text-[10px] md:text-[12px] text-white font-bold animate-pulse tracking-wide text-center"
                                    style={{ maxWidth: '80px' }}
                                >
                                    DRAG TO SKIP
                                </motion.p>
                            )}
                        </AnimatePresence>

                        {/* The Cards Area */}
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }} /*deck location for desktop*/
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="relative w-full h-full flex items-center justify-center"
                        >
                            {cardOrder.map((originalIndex, displayIndex) => {
                                const img = projectImages[originalIndex];
                                const isTop = displayIndex === cardOrder.length - 1;
                                const isVisible = inspectedIndex !== null ? (originalIndex === inspectedIndex) : (displayIndex >= cardOrder.length - 4);
                                const isCardFlying = flyingCard?.id === originalIndex;
                                const flyDirection = flyingCard?.direction === 'left' ? -1 : 1;
                                const isBeingInspected = inspectedIndex === originalIndex;

                                return (
                                    <motion.div
                                        key={originalIndex}
                                        animate={{
                                            x: isCardFlying ? (isMobile ? 800 * flyDirection : 1500 * flyDirection) : (isBeingInspected ? (isMobile ? 0 : -280) : (isVisible ? img.x : 0)),
                                            y: isCardFlying ? -200 : (isBeingInspected ? (isMobile ? -100 : 0) : (isVisible ? img.y : 0)), /*inpect pic location*/
                                            rotate: isCardFlying ? 45 * flyDirection : (isBeingInspected ? 0 : (isVisible ? img.rotation : 0)),
                                            opacity: isCardFlying ? 0 : (isVisible ? 1 : 0),
                                            zIndex: isCardFlying ? 100 : (isBeingInspected ? 150 : displayIndex),
                                            scale: isBeingInspected ? (isMobile ? 0.95 : 1.05) : 1
                                        }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 260,
                                            damping: 28,
                                        }}
                                        drag={isTop && !isCardFlying && inspectedIndex === null}
                                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                        dragElastic={0.8}
                                        onTapStart={() => {
                                            draggedRef.current = false;
                                        }}
                                        onDragStart={() => {
                                            draggedRef.current = false;
                                        }}
                                        onDrag={(_, info) => {
                                            if (Math.abs(info.offset.x) > 5 || Math.abs(info.offset.y) > 5) {
                                                draggedRef.current = true;
                                            }
                                        }}
                                        onDragEnd={(_, info) => {
                                            const threshold = isMobile ? 80 : 120;
                                            if (info.offset.x < -threshold) {
                                                handleNext('left');
                                            } else if (info.offset.x > threshold) {
                                                handleNext('right');
                                            }
                                        }}
                                        onTap={() => {
                                            if (isTop && inspectedIndex === null && !draggedRef.current) {
                                                setInspectedIndex(originalIndex);
                                                setFlippedCards(prev => ({
                                                    ...prev,
                                                    [originalIndex]: true
                                                }));
                                            } else if (isBeingInspected && !draggedRef.current) {
                                                setFlippedCards(prev => ({
                                                    ...prev,
                                                    [originalIndex]: !prev[originalIndex]
                                                }));
                                            } else if (isTop && !draggedRef.current) {
                                                setFlippedCards(prev => ({
                                                    ...prev,
                                                    [originalIndex]: !prev[originalIndex]
                                                }));
                                            }
                                        }}
                                        className={`absolute w-[240px] md:w-[380px] aspect-[2.5/3.5] bg-transparent rounded-xl touch-none ${isTop && inspectedIndex === null ? 'cursor-pointer' : 'pointer-events-auto'}`} /*project deck corners*/
                                        style={{
                                            visibility: isVisible || isCardFlying ? 'visible' : 'hidden',
                                            pointerEvents: isVisible ? 'auto' : 'none'
                                        }}
                                    >
                                        <div className="relative w-full h-full overflow-hidden bg-transparent rounded-lg" style={{ perspective: '1000px' }}> {/*cards image border*/}
                                            <motion.div
                                                className="relative w-full h-full"
                                                animate={{ rotateY: flippedCards[originalIndex] ? 180 : 0 }}
                                                transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 20 }}
                                                style={{ transformStyle: 'preserve-3d' }}
                                            >
                                                {/* Front Face */}
                                                <div className="absolute inset-0 backface-none" style={{ backfaceVisibility: 'hidden' }}>
                                                    <Image
                                                        src={img.src}
                                                        alt={img.alt}
                                                        fill
                                                        className={`${img.objectFit === 'contain' ? 'object-contain' : 'object-cover'} pointer-events-none`}
                                                        style={{
                                                            objectPosition: img.objectPosition,
                                                            transform: `scale(${img.scale})`
                                                        }}
                                                        priority={isVisible}
                                                    />
                                                </div>

                                                {/* Back Face */}
                                                <div className="absolute inset-0 backface-none" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                                                    <Image
                                                        src={img.backSrc}
                                                        alt={`${img.alt} back`}
                                                        fill
                                                        className="object-cover pointer-events-none"
                                                        priority={isVisible}
                                                    />
                                                </div>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                        {/* Details Panel */}
                        <AnimatePresence mode="wait">
                            {inspectedIndex !== null && currentProject && (
                                <motion.div
                                    key={inspectedIndex}
                                    initial={{ opacity: 0, y: isMobile ? 40 : 0, x: isMobile ? 0 : 50 }}
                                    animate={{ opacity: 1, y: isMobile ? 40 : 0, x: isMobile ? 0 : 220 }} /*description box location*/
                                    exit={{ opacity: 0, y: isMobile ? 40 : 0, x: isMobile ? 0 : 50 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                                    className={`z-[120] ${isMobile ? 'absolute bottom-10 w-full max-w-[90vw]' : 'absolute w-full max-w-[450px] ml-12'}`}
                                >
                                    <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_black] md:shadow-[8px_8px_0px_0px_black] relative mx-auto">
                                        <button
                                            onClick={() => {
                                                setInspectedIndex(null);
                                                setFlippedCards({});
                                            }}
                                            className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-white border-4 border-black p-1.5 md:p-2 hover:bg-gray-100 transition-colors"
                                        >
                                            <X className="w-5 h-5 md:w-6 md:h-6 text-black" />
                                        </button>
                                        <h2 className="font-daydream text-xl md:text-2xl mb-4 md:mb-6 text-black uppercase">{currentProject.title}</h2>
                                        <p className="font-dogica text-[12px] md:text-sm leading-relaxed text-gray-800">
                                            {currentProject.description}
                                        </p>
                                        <div className="mt-4 md:mt-8 flex gap-3 md:gap-4">
                                            <div className="h-3 w-3 md:h-4 md:w-4 bg-black"></div>
                                            <div className="h-3 w-3 md:h-4 md:w-4 bg-gray-400"></div>
                                            <div className="h-3 w-3 md:h-4 md:w-4 bg-gray-200"></div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute right-0 md:right-6 z-[60] font-dogica text-[10px] md:text-[12px] text-white font-bold animate-pulse tracking-wide text-center"
                            style={{ maxWidth: '80px' }}
                        >
                            {inspectedIndex !== null ? '' : 'TAP TO INSPECT'}
                        </motion.p>

                    </motion.div>
                </div>
            </div>
        </section>
    );
}
