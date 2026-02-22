'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const projectImages = [
    {
        src: '/backgrounds/project1.jpeg',
        alt: 'Project 1',
        title: 'Project Alpha',
        description: 'An innovative exploration of electrical engineering principles applied to modern automation systems.',
        rotation: -6, x: -10, y: -15
    },
    {
        src: '/backgrounds/project2.jpeg',
        alt: 'Project 2',
        title: 'System Beta',
        description: 'A comprehensive study of power distribution networks and their reliability in high-demand environments.',
        rotation: 4, x: 15, y: -10
    },
    {
        src: '/backgrounds/SCPC.jpeg',
        alt: 'SCPC',
        title: 'SCPC Solutions',
        description: 'Advanced satellite communication project focusing on single channel per carrier distribution technologies.',
        rotation: -2, x: -15, y: 10
    },
    {
        src: '/backgrounds/SCPC1.jpeg',
        alt: 'SCPC 1',
        title: 'Network Gamma',
        description: 'Optimizing data transmission across isolated electrical grids using proprietary communication protocols.',
        rotation: 7, x: 10, y: 15
    },
    {
        src: '/backgrounds/GTPERU.jpeg',
        alt: 'GT Peru',
        title: 'GT Peru Infrastructure',
        description: 'Large-scale infrastructure development and electrical maintenance strategy for rural regions in Peru.',
        rotation: 2, x: 0, y: 0
    },
];

export default function Projects() {
    const [cardOrder, setCardOrder] = useState([0, 1, 2, 3, 4]);
    const [isFlying, setIsFlying] = useState<number | null>(null);
    const [inspectedIndex, setInspectedIndex] = useState<number | null>(null);
    const [windowWidth, setWindowWidth] = useState(0);

    const draggedRef = useRef(false);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = windowWidth < 768;

    const handleNext = () => {
        if (isFlying !== null || inspectedIndex !== null) return;

        const topCardIndex = cardOrder[cardOrder.length - 1];
        setIsFlying(topCardIndex);

        setTimeout(() => {
            setCardOrder(prev => {
                const next = [...prev];
                const topCard = next.pop()!;
                next.unshift(topCard);
                return next;
            });
            setIsFlying(null);
        }, 400);
    };

    const handlePrev = () => {
        if (isFlying !== null || inspectedIndex !== null) return;

        setCardOrder(prev => {
            const next = [...prev];
            const bottomCard = next.shift()!;
            next.push(bottomCard);
            return next;
        });
    };

    const currentProject = inspectedIndex !== null ? projectImages[inspectedIndex] : null;

    return (
        <div className="min-h-screen py-20 md:py-48 flex flex-col items-center justify-center bg-[#EAE0CF] transition-colors duration-500">
            <div className="relative w-full max-w-7xl flex flex-col items-center justify-center px-4 md:px-0">
                {/* Deck/Inpection Area */}
                {/* Deck/Inpection Area */}
                <motion.div
                    animate={{ height: isMobile && inspectedIndex !== null ? 750 : (isMobile ? 500 : 600) }}
                    transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                    className="relative w-full flex flex-col md:flex-row items-center justify-center"
                >

                    {/* Left Arrow */}
                    <AnimatePresence>
                        {inspectedIndex === null && (
                            <motion.button
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                onClick={handlePrev}
                                className="absolute left-0 md:left-4 lg:left-10 z-[60] p-2 md:p-3 bg-white border-4 border-black hover:bg-gray-100 transition-colors cursor-pointer"
                                aria-label="Previous project"
                            >
                                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-black" />
                            </motion.button>
                        )}
                    </AnimatePresence>

                    {/* The Cards Area */}
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="relative w-full h-full flex items-center justify-center"
                    >
                        {cardOrder.map((originalIndex, displayIndex) => {
                            const img = projectImages[originalIndex];
                            const isTop = displayIndex === cardOrder.length - 1;
                            const isVisible = inspectedIndex !== null ? (originalIndex === inspectedIndex) : (displayIndex >= cardOrder.length - 4);
                            const isCardFlying = isFlying === originalIndex;
                            const isBeingInspected = inspectedIndex === originalIndex;

                            return (
                                <motion.div
                                    key={originalIndex}
                                    animate={{
                                        x: isCardFlying ? (isMobile ? 800 : 1500) : (isBeingInspected ? (isMobile ? 0 : -280) : (isVisible ? img.x : 0)),
                                        y: isCardFlying ? -200 : (isBeingInspected ? (isMobile ? -200 : 0) : (isVisible ? img.y : 0)),
                                        rotate: isCardFlying ? 45 : (isBeingInspected ? 0 : (isVisible ? img.rotation : 0)),
                                        opacity: isCardFlying ? 0 : (isVisible ? 1 : 0),
                                        zIndex: isCardFlying ? 100 : (isBeingInspected ? 150 : displayIndex),
                                        scale: isBeingInspected ? (isMobile ? 1.05 : 1.05) : 1
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
                                        if (Math.abs(info.offset.x) > threshold || Math.abs(info.offset.y) > threshold) {
                                            handleNext();
                                        }
                                    }}
                                    onTap={() => {
                                        if (isTop && inspectedIndex === null && !draggedRef.current) {
                                            setInspectedIndex(originalIndex);
                                        }
                                    }}
                                    className={`absolute w-[240px] md:w-[420px] aspect-[2.5/3.5] bg-white p-2 md:p-3 border-4 border-black rounded-none touch-none ${isTop && inspectedIndex === null ? 'cursor-pointer' : 'pointer-events-auto'}`}
                                    style={{
                                        visibility: isVisible || isCardFlying ? 'visible' : 'hidden',
                                        pointerEvents: isVisible ? 'auto' : 'none'
                                    }}
                                >
                                    <div className="relative w-full h-full overflow-hidden bg-gray-50 border-4 border-black rounded-none">
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            fill
                                            className="object-cover pointer-events-none"
                                            priority={isVisible}
                                        />
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
                                animate={{ opacity: 1, y: isMobile ? -80 : 0, x: isMobile ? 0 : 220 }} /*description box location*/
                                exit={{ opacity: 0, y: isMobile ? 40 : 0, x: isMobile ? 0 : 50 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                                className={`z-[120] ${isMobile ? 'absolute bottom-10 w-full max-w-[90vw]' : 'absolute w-full max-w-[450px] ml-12'}`}
                            >
                                <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_black] md:shadow-[8px_8px_0px_0px_black] relative mx-auto">
                                    <button
                                        onClick={() => setInspectedIndex(null)}
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

                    {/* Right Arrow */}
                    <AnimatePresence>
                        {inspectedIndex === null && (
                            <motion.button
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                onClick={handleNext}
                                className="absolute right-0 md:right-4 lg:right-10 z-[60] p-2 md:p-3 bg-white border-4 border-black hover:bg-gray-100 transition-colors cursor-pointer"
                                aria-label="Next project"
                            >
                                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-black" />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            <div className="mt-12 md:mt-24 text-center px-4">
                <p className="font-dogica text-[10px] md:text-[12px] text-black font-bold animate-pulse tracking-wide">
                    {inspectedIndex !== null ? 'USE X TO RETURN' : 'CLICK ON THE PICTURE TO INSPECT'}
                </p>
            </div>
        </div>
    );
}
