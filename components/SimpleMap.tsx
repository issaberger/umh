import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { MapPin } from 'lucide-react';

interface Location {
  city: string;
  address: string;
  lat: number;
  lng: number;
}

interface SimpleMapProps {
  locations: Location[];
}

const SimpleMap: React.FC<SimpleMapProps> = ({ locations }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapInstanceRef.current) {
      // Initialize map centered roughly between Baltimore and Salisbury
      const map = L.map(mapContainerRef.current).setView([38.8, -76.1], 8);
      
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      // Define custom icon using base64 or CDN to avoid import issues
      const icon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      locations.forEach(loc => {
        L.marker([loc.lat, loc.lng], { icon })
          .addTo(map)
          .bindPopup(`
            <div style="font-family: 'Inter', sans-serif;">
              <strong style="color: #6d28d9;">${loc.city}</strong><br/>
              ${loc.address}<br/>
              <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address + ' ' + loc.city)}" target="_blank" style="color: #7c3aed; text-decoration: underline; font-size: 0.875rem;">Get Directions</a>
            </div>
          `);
      });

      mapInstanceRef.current = map;
    }

    return () => {
      // Cleanup happens if component unmounts
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [locations]);

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-lg overflow-hidden z-0">
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default SimpleMap;