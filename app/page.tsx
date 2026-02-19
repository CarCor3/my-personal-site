'use client';

import { useEffect, useState } from 'react';

export default function Home() {
    const [imgVisible, setImgVisible] = useState(false);

    useEffect(() => {
        // Delay then fade the image in
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
                    transition: 'opacity 0.6s ease',
                }}
            />

            {/* Text — visible immediately */}
            <div style={{
                position: 'absolute',
                top: '47%',    /* ← move up/down */
                left: '67%',   /* ← move left/right */
                transform: 'translate(-50%, -50%)',
                zIndex: 2,
                textAlign: 'center',
            }}>
                <p className="font-ari text-2x md:text-8xl font-bold mb-8" style={{ color: '#000000' }}>
                    Hi, I'm
                </p>
                <h1 className="font-daydream text-4xl md:text-6xl lg:text-9xl font-bold tracking-tight" style={{ color: '#8A7650' }}>
                    <span className="block" style={{ marginBottom: '25px' }}>Carlos</span>
                    <span className="block">Cordova</span>
                </h1>
            </div>
        </div>
    );
}
