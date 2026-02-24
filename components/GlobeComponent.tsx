'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

const LIMA = { lat: -12.046, lng: -77.043 };
const MAX_ALTITUDE = 2;
const ZOOM_IN_ALTITUDE = 0.6;

// Global cache for GeoJSON data to prevent re-fetching on navigation
let cachedCountries: any[] | null = null;

export default function GlobeComponent() {
    const globeRef = useRef<any>(null);
    const [countries, setCountries] = useState<any[]>(cachedCountries || []);
    const [visible, setVisible] = useState(false);
    const [zoomed, setZoomed] = useState(false);

    useEffect(() => {
        if (!cachedCountries) {
            fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
                .then(r => r.json())
                .then(data => {
                    cachedCountries = data.features;
                    setCountries(data.features);
                })
                .catch(err => console.error("Globe data fetch failed", err));
        }
    }, []);

    const handleGlobeReady = () => {
        const globe = globeRef.current;
        if (!globe) return;

        // Instantly position camera
        globe.pointOfView({ lat: LIMA.lat, lng: LIMA.lng, altitude: MAX_ALTITUDE }, 0);

        // Clamp zoom & disable interaction that causes layout shifts
        const controls = globe.controls();
        if (controls) {
            const globeRadius = 79;
            controls.maxDistance = globeRadius * (1 + MAX_ALTITUDE);
            controls.minDistance = globeRadius * (1 + 0.4);
            controls.enableZoom = false;
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.5;
        }

        // Fade in
        requestAnimationFrame(() => setVisible(true));
    };

    const handlePolygonClick = (polygon: any) => {
        const globe = globeRef.current;
        if (!globe) return;
        const controls = globe.controls();

        if (polygon.properties?.name === 'Peru') {
            if (!zoomed) {
                globe.pointOfView({ lat: LIMA.lat, lng: LIMA.lng, altitude: ZOOM_IN_ALTITUDE }, 800);
                if (controls) controls.autoRotate = false; // Stop rotation when inspected
                setZoomed(true);
            } else {
                globe.pointOfView({ lat: LIMA.lat, lng: LIMA.lng, altitude: MAX_ALTITUDE }, 800);
                if (controls) controls.autoRotate = true;  // Resume rotation when out
                setZoomed(false);
            }
        }
    };

    return (
        <div style={{
            width: 340,
            height: 340,
            borderRadius: '50%',
            overflow: 'hidden',
            opacity: visible ? 1 : 0,
            transition: 'opacity 1.2s ease',
            cursor: 'grab',
            backgroundColor: 'transparent',
        }}>
            <Globe
                ref={globeRef}
                width={340}
                height={340}
                // Light 'Day' texture for a cleaner theme
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                backgroundColor="rgba(0,0,0,0)"
                polygonsData={countries}
                polygonCapColor={(d: any) =>
                    d.properties?.name === 'Peru' ? 'rgba(230, 50, 50, 0.6)' : 'rgba(0,0,0,0.02)'
                }
                polygonSideColor={(d: any) =>
                    d.properties?.name === 'Peru' ? 'rgba(200, 30, 30, 0.8)' : 'rgba(0,0,0,0)'
                }
                polygonStrokeColor={(d: any) =>
                    d.properties?.name === 'Peru' ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.3)'
                }
                polygonAltitude={(d: any) => d.properties?.name === 'Peru' ? 0.02 : 0.005}
                polygonLabel={() => ''}
                onPolygonClick={handlePolygonClick}
                onGlobeReady={handleGlobeReady}
                showAtmosphere={false}
                enablePointerInteraction={true}
            />
        </div>
    );
}
