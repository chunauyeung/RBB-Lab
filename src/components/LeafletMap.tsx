import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Language } from '../types';

interface LeafletMapProps {
  lang: Language;
}

const defaultBlueIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Fixed lab location: latitude, longitude.
const LAB_COORDS: [number, number] = [31.30105, 121.495523];

export const LeafletMap: React.FC<LeafletMapProps> = ({ lang }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = L.map(mapContainerRef.current).setView(LAB_COORDS, 16);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker(LAB_COORDS, {
      icon: defaultBlueIcon,
      draggable: false,
    }).addTo(map);

    const resizeTimer = window.setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      window.clearTimeout(resizeTimer);
      map.remove();
    };
  }, []);

  return (
    <div className="w-full rounded-xl border border-gray-200 overflow-hidden shadow-xs bg-white font-sans">
      <div className="hidden">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-800">OpenStreetMap</span>
          <span className="text-gray-400">·</span>
          <span className="text-gray-600">
            {lang === 'en' ? 'Fudan University Handan Campus' : 'Fudan University Handan Campus'}
          </span>
        </div>

        <span className="text-gray-400 font-mono text-[11px]">
          {LAB_COORDS[0].toFixed(6)}, {LAB_COORDS[1].toFixed(6)}
        </span>
      </div>

      <div className="relative w-full h-[450px]">
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>
    </div>
  );
};
