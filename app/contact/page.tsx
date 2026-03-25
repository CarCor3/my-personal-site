'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

function TypewriterText({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) {
    const letters = text.split("");
    return (
        <span className={className}>
            {letters.map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.05, delay: delay + index * 0.04 }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </span>
    );
}

/*contact page title*/
export default function Contact() {
    const [isMobile, setIsMobile] = useState(false);
    const [isDraggable, setIsDraggable] = useState(false);
    const [scaleFactor, setScaleFactor] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            setIsMobile(w > 0 && w < 768);
            
            if (w >= 768) {
                // Ensure desktop scale perfectly fits between navbar/marginTop (~150px) and bottom margin
                const availableHeight = h - 200; // Account for navbar and generous padding
                const heightScale = availableHeight / 800; // 800px is the original paper asset height
                
                const availableWidth = w - 100;
                const widthScale = availableWidth / 700; // 700px is original paper width
                
                // Select the most restrictive bounding box to fit gracefully
                setScaleFactor(Math.min(1.15, Math.max(0.4, Math.min(heightScale, widthScale))));
            } else {
                setScaleFactor(1);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        // PAPER grabbing delay
        const dragTimeout = setTimeout(() => {
            setIsDraggable(true);
        }, 1000);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(dragTimeout);
        };
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section id="contact"
            className="min-h-screen md:h-screen overflow-hidden flex flex-col relative w-full"
            style={{
                backgroundColor: '#8fa6b6ff',
                backgroundImage: 'url("/backgrounds/DESK4.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                /* 
                  Main Container Alignment:
                  - mobile: items-center justify-center
                  - desktop: md:items-center md:justify-center (change these classes below to shift the whole block)
                */
                className="relative pt-24 pb-12 md:py-20 flex-grow flex flex-col items-center justify-center md:items-center md:justify-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-6"
            >
                {/* ── DRAGGABLE WRAPPER ── */}
                <motion.div
                    drag={isDraggable}
                    dragMomentum={false}
                    className="relative flex flex-col items-center justify-center w-full"
                    style={{ cursor: isDraggable ? 'grab' : 'default' }}
                    whileDrag={{ cursor: 'grabbing', scale: 1.02 }}
                >
                    <div
                        className="relative flex flex-col items-center justify-center w-full"
                        style={{
                            transform: isMobile ? 'scale(0.8)' : `scale(${scaleFactor})`,
                            transformOrigin: 'center center'
                        }}
                    >
                    {/* ── PAPER Background ── */}
                    <div
                        // 👉 Edit the width, height, or transform values below to scale or move the PAPER on desktop/mobile
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: isMobile ? 'translate(-235px, -270px) rotate(0deg)' : 'translate(-360px, -350px) rotate(0deg)',
                            width: isMobile ? '450px' : '700px',
                            height: isMobile ? '500px' : '800px',
                            backgroundImage: 'url("/backgrounds/PAPER.png")',
                            backgroundSize: '100% 100%',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            zIndex: 0,
                            // pointerEvents: 'none' Removed so the entire paper can be grabbed!
                        }}
                    />

                    <div
                        style={{
                            zIndex: 10,
                            position: 'relative',
                            ...(isMobile ? {} : { transform: 'translate(0px, 40px)' })
                        }} //GET IN TOUCH location
                    >
                        <h1
                            className="font-daydream text-3xl md:text-5xl font-bold mb-8 text-center leading-[1.5] md:leading-normal"
                            style={{ color: '#000000' }}
                        >
                            <TypewriterText text="GET IN TOUCH" delay={0.5} />
                        </h1>
                    </div>

                    {/* 
                      Links Container Alignment:
                      - mobile: items-center (centered)
                      - desktop: md:items-center (centered)
                      - Change 'md:items-center' to 'md:items-start' to align links to the left on desktop
                    */}
                    <div
                        style={{
                            zIndex: 10,
                            position: 'relative',
                            ...(isMobile ? {} : { transform: 'translate(0px, 40px)' })
                        }} //Social Media location
                    >
                        <div className="flex flex-col gap-4 items-center md:items-center w-full max-w-[300px] md:max-w-[400px]">
                            <motion.a
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 1.1, ease: "easeOut" }}
                                href="https://www.instagram.com/carloscordova03"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 hover:scale-105 transition-transform duration-300 group w-full justify-start"
                            >
                                <div className="relative w-12 h-12 flex-shrink-0">
                                    <Image
                                        src="/backgrounds/IG2.png" /*IG logo*/
                                        alt="Instagram"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-sm md:text-xl font-bold font-dogica group-hover:text-pink-600 transition-colors" style={{ color: '#000000' }}>
                                    <TypewriterText text="carloscordova03" delay={1.1} />
                                </span>
                            </motion.a>

                            <motion.a
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 1.1, ease: "easeOut" }}
                                href="https://www.instagram.com/gtxperu"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 hover:scale-105 transition-transform duration-300 group w-full justify-start"
                            >
                                <div className="relative w-12 h-12 flex-shrink-0">
                                    <Image
                                        src="/backgrounds/IG2.png"
                                        alt="Instagram GT Peru"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-sm md:text-xl font-bold font-dogica group-hover:text-pink-600 transition-colors" style={{ color: '#000000' }}>
                                    <TypewriterText text="GT Peru" delay={1.1} />
                                </span>
                            </motion.a>

                            <motion.a
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 1.1, ease: "easeOut" }}
                                href="mailto:carlos.cordova.03@outlook.com"
                                className="flex items-center gap-4 hover:scale-105 transition-transform duration-300 group w-full justify-start"
                            >
                                <div className="relative w-12 h-12 flex-shrink-0">
                                    <Image
                                        src="/backgrounds/mail.png"
                                        alt="Email"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-sm md:text-xl font-bold font-dogica group-hover:text-blue-600 transition-colors" style={{ color: '#000000' }}>
                                    <TypewriterText text="carlos.cordova.03" delay={1.1} />
                                </span>
                            </motion.a>

                            <motion.a
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 1.1, ease: "easeOut" }}
                                href="https://www.linkedin.com/in/carloscordova3"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 hover:scale-105 transition-transform duration-300 group w-full justify-start"
                            >
                                <div className="relative w-12 h-12 flex-shrink-0">
                                    <Image
                                        src="/backgrounds/linkedin.png"
                                        alt="LinkedIn"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-sm md:text-xl font-bold font-dogica group-hover:text-blue-700 transition-colors" style={{ color: '#000000' }}>
                                    <TypewriterText text="carloscordova3" delay={1.1} />
                                </span>
                            </motion.a>
                        </div>
                    </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
