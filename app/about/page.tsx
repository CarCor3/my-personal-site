'use client';

import { motion } from 'framer-motion';
import GlobeComponent from '../../components/GlobeComponent';

export default function About() {
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
        <div className="min-h-screen md:h-screen md:overflow-hidden flex flex-col" style={{ backgroundColor: '#EAE0CF' }}>
            <motion.div
                className="py-30 md:py-40 flex items-center justify-center flex-grow max-w-5xl mx-auto px-6 sm:px-6 lg:px-0"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Bio + Globe side by side */}
                <div className="flex flex-col md:flex-row items-center gap-16 md:gap-12">

                    {/* Bio text */}
                    <div className="flex-1 text-center md:text-left">
                        <motion.p
                            variants={textVariants}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="font-dogica text-lg md:text-xl font-bold mb-8"
                            style={{ color: '#000000' }}
                        >
                            I'm a passionate Electrical Enginner about to graduated from Georgia Tech. I was born and raised in Lima, Peru.
                        </motion.p>
                        <motion.p
                            variants={textVariants}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="font-dogica text-lg md:text-xl font-bold mb-8"
                            style={{ color: '#000000' }}
                        >
                            When I was a kid my dad would take me to help him do some cabling in some houses including ours. He didn't know by that time but he feeded my passion for the electricity.
                        </motion.p>
                        <motion.p
                            variants={textVariants}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="font-dogica text-lg md:text-xl font-bold"
                            style={{ color: '#000000' }}
                        >
                            Since then, I've been improving my skills in electronics. When I'm not working on something, you can find me making content creation or playing the guitar.
                        </motion.p>
                    </div>

                    {/* Interactive Globe */}
                    <motion.div
                        variants={globeVariants}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                        className="flex-shrink-0 flex flex-col items-center gap-4"
                    >
                        <GlobeComponent />
                        <p className="font-dogica text-sm" style={{ color: '#000000', opacity: 0.8 }}>
                            📍 Lima, Peru
                        </p>
                    </motion.div>

                </div>
            </motion.div>
        </div>
    );
}
