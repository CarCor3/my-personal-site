'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

/*contact page title*/
export default function Contact() {
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
        <div className="min-h-screen md:h-screen md:overflow-hidden flex flex-col" style={{ backgroundColor: '#EAE0CF' }}>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="pt-24 pb-12 md:py-20 flex-grow flex flex-col items-center justify-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-6"
            >
                <motion.h1
                    variants={{
                        hidden: { opacity: 0, y: -20 },
                        visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="font-daydream text-4xl md:text-5xl font-bold mb-12 text-center leading-[1.5] md:leading-normal"
                    style={{ color: '#000000' }}
                >
                    GET IN TOUCH
                </motion.h1>

                <div className="flex flex-col gap-6 items-start w-full max-w-[360px]">
                    <motion.a
                        variants={itemVariants}
                        transition={{ duration: 0.5, ease: "easeOut" }}
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
                            carloscordova03
                        </span>
                    </motion.a>

                    <motion.a
                        variants={itemVariants}
                        transition={{ duration: 0.5, ease: "easeOut" }}
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
                            GT Peru
                        </span>
                    </motion.a>

                    <motion.a
                        variants={itemVariants}
                        transition={{ duration: 0.5, ease: "easeOut" }}
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
                            carlos.cordova.03
                        </span>
                    </motion.a>

                    <motion.a
                        variants={itemVariants}
                        transition={{ duration: 0.5, ease: "easeOut" }}
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
                            carloscordova3
                        </span>
                    </motion.a>
                </div>
            </motion.div>
        </div>
    );
}
