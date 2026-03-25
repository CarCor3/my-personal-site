'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function About() {
    const [isMobile, setIsMobile] = useState(false);
    const [scaleFactor, setScaleFactor] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            setIsMobile(w > 0 && w < 768);

            if (w >= 768) {
                const heightScale = (h - 200) / 800;
                const widthScale = (w - 100) / 1000;
                setScaleFactor(Math.min(1.15, Math.max(0.4, Math.min(heightScale, widthScale))));
            } else {
                setScaleFactor(1);
            }
        };

        // Set initial value
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const textVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <section id="about"
            className="min-h-screen md:h-screen overflow-hidden flex flex-col relative w-full"
            style={{
                background: isMobile
                    ? '#ffffff'
                    : 'linear-gradient(to right, #375a7f 40%, #ffffff 33.33%)'
            }}
        > {/*About background color*/}

            {/* ── YO Pic ── always fills 40vw (the blue section width), outside scale wrapper */}
            <div
                style={{
                    display: isMobile ? 'none' : 'block',
                    position: 'absolute',
                    top: '35%',
                    left: '-115px',
                    zIndex: 5,
                    width: '50vw',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                }}
            >
                <img
                    src="/backgrounds/yo.png"
                    alt="Yo"
                    style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                        display: 'block',
                        userSelect: 'none',
                    }}
                />
            </div>

            {/* Scale wrapper — only wraps text content */}
            <div
                className="relative w-full flex-1 flex flex-col"
                style={{
                    transform: isMobile ? 'none' : `scale(${scaleFactor})`,
                    transformOrigin: 'center center'
                }}
            >
                <motion.div
                    className="pt-12 pb-12 md:py-40 flex items-center justify-center flex-grow max-w-5xl mx-auto px-6 sm:px-6 lg:px-0 relative z-10"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Bio + Globe side by side */}
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-2">

                        {/* Bio text */}
                        <div
                            className="flex-1 text-center md:text-left"
                            style={isMobile ? {} : { transform: 'translate(420px, 50px)' }} //Text position
                        >
                            <motion.p
                                variants={textVariants}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="font-dogica font-bold mb-12"
                                style={{
                                    color: '#000000',
                                    fontSize: isMobile ? '16px' : '22px',//Font Size
                                    maxWidth: isMobile ? '100%' : '900px',// Words per line
                                    marginInline: isMobile ? 'auto' : '0'// Centers the text block gracefully on mobile when limited
                                }}
                            >
                                I'm a passionate Electrical Enginner about to graduated from Georgia Tech. I was born and raised in Lima, Peru.
                            </motion.p>
                            <motion.p
                                variants={textVariants}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="font-dogica font-bold mb-12"
                                style={{
                                    color: '#000000',
                                    fontSize: isMobile ? '16px' : '22px',//Edit 'fontSize' here to personalize the text size! E.g: '20px' or '1.5rem'
                                    maxWidth: isMobile ? '100%' : '900px',// Edit 'maxWidth' here to limit how many words fit per line! E.g: '400px'
                                    marginInline: isMobile ? 'auto' : '0'// Centers the text block gracefully on mobile when limited
                                }}
                            >
                                When I was a kid my dad would take me to help him do some cabling in some houses including ours. He didn't know by that time but he feeded my passion for the electricity.
                            </motion.p>
                            <motion.p
                                variants={textVariants}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="font-dogica font-bold"
                                style={{
                                    color: '#000000',
                                    fontSize: isMobile ? '16px' : '22px',//Edit 'fontSize' here to personalize the text size! E.g: '20px' or '1.5rem'
                                    maxWidth: isMobile ? '100%' : '900px',// Edit 'maxWidth' here to limit how many words fit per line! E.g: '400px'
                                    marginInline: isMobile ? 'auto' : '0'// Centers the text block gracefully on mobile when limited
                                }}
                            >
                                Since then, I've been improving my skills in electronics. When I'm not working on something, you can find me making content creation or playing the guitar.
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
