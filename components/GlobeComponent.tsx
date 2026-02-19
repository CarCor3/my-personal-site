'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

const LIMA = { lat: -12.046, lng: -77.043 };
const MAX_ALTITUDE = 2;    // zoom-out cap (fits the circle)
const ZOOM_IN_ALTITUDE = 0.6;

export default function GlobeComponent() {
    const globeRef = useRef<any>(null);
    const [countries, setCountries] = useState<any[]>([]);
    const [ready, setReady] = useState(false);
    const [zoomed, setZoomed] = useState(false);
    const [shadowVisible, setShadowVisible] = useState(false);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
            .then(r => r.json())
            .then(data => setCountries(data.features));
    }, []);

    useEffect(() => {
        const t = setTimeout(() => setReady(true), 100);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        if (globeRef.current && ready) {
            // Start pointed at Lima
            globeRef.current.pointOfView({ lat: LIMA.lat, lng: LIMA.lng, altitude: MAX_ALTITUDE }, 0);

            // Clamp zoom so user can't zoom out past the circle boundary
            const controls = globeRef.current.controls();
            if (controls) {
                const globeRadius = 79;
                controls.maxDistance = globeRadius * (1 + MAX_ALTITUDE);   // ~300
                controls.minDistance = globeRadius * (1 + 0.4);            // ~140
                controls.enableZoom = false; // disable scroll-wheel zoom entirely
            }
        }
    }, [ready]);

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
            boxShadow: shadowVisible ? '0 8px 40px rgba(0,0,0,0.35)' : '0 8px 40px rgba(0,0,0,0)',
            transition: 'box-shadow 3.8s ease',
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
                onGlobeReady={() => setShadowVisible(true)}
                atmosphereColor="rgba(0,0,0,0)"
                atmosphereAltitude={0}
                enablePointerInteraction={true}
            />
        </div>
    );
}
