'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import GlobeComponent from '../../components/GlobeComponent';

export default function About() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const currentIsMobile = window.innerWidth > 0 && window.innerWidth < 768;
            setIsMobile(currentIsMobile);

            if (currentIsMobile) {
                document.documentElement.style.backgroundColor = '#8fa6b6';
                document.body.style.backgroundColor = '#8fa6b6';
                const meta = document.querySelector("meta[name='theme-color']");
                if (meta) meta.setAttribute('content', '#8fa6b6');
            } else {
                document.documentElement.style.backgroundColor = '#8fa6b6';
                document.body.style.backgroundColor = '#8fa6b6';
            }
        };

        // Set initial value
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.documentElement.style.backgroundColor = '';
            document.body.style.backgroundColor = '';
            const meta = document.querySelector("meta[name='theme-color']");
            if (meta) meta.setAttribute('content', '#FFFFFF');
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

    const globeVariants = {
        hidden: { opacity: 0, scale: 0.8, x: 50 },
        visible: { opacity: 1, scale: 1, x: 0 }
    };

    return (
        <div className="min-h-screen md:h-screen md:overflow-hidden flex flex-col relative" style={{ backgroundColor: '#8fa6b6ff' }}>
            {/* ── LLAMA Pic ── */}
            <div
                style={{
                    display: isMobile ? 'none' : 'block',
                    position: 'absolute',
                    top: isMobile ? '20%' : '56%',
                    left: isMobile ? '5%' : '0%',
                    zIndex: 5,
                    width: isMobile ? '120px' : '380px',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                }}
            >
                <img
                    src="/backgrounds/LLAMA.png"
                    alt="Llama"
                    style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                        display: 'block',
                        userSelect: 'none',
                    }}
                />
            </div>

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
                        // 👉 Edit the 'translate' values below to move the TEXT (X, Y). E.g: 'translate(-20px, 50px)'
                        style={isMobile ? {} : { transform: 'translate(150px, 60px)' }}
                    >
                        <motion.p
                            variants={textVariants}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="font-dogica font-bold mb-12"
                            style={{ 
                                color: '#000000', 
                                fontSize: isMobile ? '16px' : '21px',//Edit 'fontSize' here to personalize the text size! E.g: '20px' or '1.5rem'
                                maxWidth: isMobile ? '100%' : '900px',// Edit 'maxWidth' here to limit how many words fit per line! E.g: '400px'
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
                                fontSize: isMobile ? '16px' : '21px',//Edit 'fontSize' here to personalize the text size! E.g: '20px' or '1.5rem'
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
                                fontSize: isMobile ? '16px' : '21px',//Edit 'fontSize' here to personalize the text size! E.g: '20px' or '1.5rem'
                                maxWidth: isMobile ? '100%' : '900px',// Edit 'maxWidth' here to limit how many words fit per line! E.g: '400px'
                                marginInline: isMobile ? 'auto' : '0'// Centers the text block gracefully on mobile when limited
                            }}
                        >
                            Since then, I've been improving my skills in electronics. When I'm not working on something, you can find me making content creation or playing the guitar.
                        </motion.p>
                    </div>

                    {/* Interactive Globe */}
                    <div
                        // 👉 Edit the 'translate' values below to move the GLOBE (X, Y). E.g: 'translate(40px, -30px)'
                        style={isMobile ? {} : { transform: 'translate(280px, 0px)' }}
                    >
                        <motion.div
                            variants={globeVariants}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                            className="flex-shrink-0 flex flex-col items-center gap-4"
                        >
                            <GlobeComponent />
                            <p className="font-dogica text-sm" style={{ color: '#FFFFFF', opacity: 0.8 }}>
                                📍 Lima, Peru
                            </p>
                        </motion.div>
                    </div>

                </div>
            </motion.div>
        </div>
    );
}
