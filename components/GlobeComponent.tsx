'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

const LIMA = { lat: -12.046, lng: -77.043 };
const MAX_ALTITUDE = 2;
const ZOOM_IN_ALTITUDE = 0.6;

export default function GlobeComponent() {
    const globeRef = useRef<any>(null);
    const [countries, setCountries] = useState<any[]>([]);
    const [visible, setVisible] = useState(false);
    const [zoomed, setZoomed] = useState(false);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
            .then(r => r.json())
            .then(data => setCountries(data.features));
    }, []);

    const handleGlobeReady = () => {
        const globe = globeRef.current;
        if (!globe) return;

        // Instantly position camera (no animation) before revealing
        globe.pointOfView({ lat: LIMA.lat, lng: LIMA.lng, altitude: MAX_ALTITUDE }, 0);

        // Clamp zoom
        const controls = globe.controls();
        if (controls) {
            const globeRadius = 79;
            controls.maxDistance = globeRadius * (1 + MAX_ALTITUDE);
            controls.minDistance = globeRadius * (1 + 0.4);
            controls.enableZoom = false;
        }

        // Fade in after one frame so the transition actually plays
        requestAnimationFrame(() => setVisible(true));
    };

    const handlePolygonClick = (polygon: any) => {
        if (polygon.properties?.name === 'Peru') {
            if (!zoomed) {
                globeRef.current?.pointOfView({ lat: LIMA.lat, lng: LIMA.lng, altitude: ZOOM_IN_ALTITUDE }, 800);
                setZoomed(true);
            } else {
                globeRef.current?.pointOfView({ lat: LIMA.lat, lng: LIMA.lng, altitude: MAX_ALTITUDE }, 800);
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
            transition: 'opacity 2s ease, box-shadow 0.8s ease',
            boxShadow: visible ? '0 8px 40px rgba(0,0,0,0.35)' : '0 8px 40px rgba(0,0,0,0)',
            cursor: 'grab',
        }}>
            <Globe
                ref={globeRef}
                width={340}
                height={340}
                globeImageUrl="https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                backgroundColor="rgba(0,0,0,0)"
                polygonsData={countries}
                polygonCapColor={(d: any) =>
                    d.properties?.name === 'Peru' ? 'rgba(200, 40, 40, 0.75)' : 'rgba(0,0,0,0)'
                }
                polygonSideColor={(d: any) =>
                    d.properties?.name === 'Peru' ? 'rgba(180, 30, 30, 0.9)' : 'rgba(0,0,0,0)'
                }
                polygonStrokeColor={() => 'rgba(0,0,0,0)'}
                polygonAltitude={(d: any) => d.properties?.name === 'Peru' ? 0.02 : 0}
                polygonLabel={() => ''}
                onPolygonClick={handlePolygonClick}
                onGlobeReady={handleGlobeReady}
                atmosphereColor="rgba(0,0,0,0)"
                atmosphereAltitude={0}
                enablePointerInteraction={true}
            />
        </div>
    );
}
