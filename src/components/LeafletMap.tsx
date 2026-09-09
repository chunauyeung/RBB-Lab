import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Language } from '../types';

interface LeafletMapProps {
  lang: Language;
}

// Leaflet default blue pin icon
const defaultBlueIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Default fallback location: Fudan University Handan Campus
const DEFAULT_COORDS: [number, number] = [31.2996, 121.5022];

export const LeafletMap: React.FC<LeafletMapProps> = ({ lang }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Load the fixed confirmed coordinates from localStorage or default
  const [coords] = useState<[number, number]>(() => {
    try {
      const saved = localStorage.getItem('feigao_lab_map_coords');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 2 && !isNaN(parsed[0]) && !isNaN(parsed[1])) {
          return [parsed[0], parsed[1]];
        }
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_COORDS;
  });

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Standard Leaflet initialization exactly like leafletjs.com
    const map = L.map(mapContainerRef.current).setView(coords, 16);
    mapInstanceRef.current = map;

    // Standard OpenStreetMap Tile Layer
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Fixed single default blue marker (no text, no popup, just the pure blue pin)
    L.marker(coords, {
      icon: defaultBlueIcon,
      draggable: false, // Locked firmly
    }).addTo(map);

    // Invalidate size on mount to ensure tiles load seamlessly
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [coords, lang]);

  return (
    <div className="w-full rounded-xl border border-gray-200 overflow-hidden shadow-xs bg-white font-sans">
      {/* Clean top status bar */}
      <div className="bg-gray-50 px-3.5 py-2 border-b border-gray-200 flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-800">
            {lang === 'en' ? 'OpenStreetMap' : 'OpenStreetMap'}
          </span>
          <span className="text-gray-400">·</span>
          <span className="text-gray-600">
            {lang === 'en' ? 'Fudan University Handan Campus' : '复旦大学邯郸校区'}
          </span>
        </div>

        <div className="text-gray-400 font-mono text-[11px]">
          {coords[0]}, {coords[1]}
        </div>
      </div>

      {/* Pure Leaflet Map Container */}
      <div className="relative w-full h-[450px]">
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>
    </div>
  );
};
