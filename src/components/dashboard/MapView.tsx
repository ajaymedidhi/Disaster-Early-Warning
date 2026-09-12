import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icon in react-leaflet
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import type { ZoneData } from '../../data/mockApi'

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41]
})
L.Marker.prototype.options.icon = DefaultIcon

interface MapViewProps {
  zones: ZoneData[]
}

const getMarkerIcon = (risk: string) => {
  const color = risk === 'High' ? 'red' : risk === 'Medium' ? 'orange' : 'gray';
  
  // Create a custom div icon
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color:${color};width:16px;height:16px;border-radius:50%;border:2px solid white;box-shadow:0 0 4px rgba(0,0,0,0.5)"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });
}

export default function MapView({ zones }: MapViewProps) {
  // Center of India roughly
  const center: [number, number] = [20.5937, 78.9629]

  return (
    <div className="h-full w-full relative z-0">
      <MapContainer 
        center={center} 
        zoom={5} 
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        
        {zones.map(zone => (
          <Marker 
            key={zone.id} 
            position={[zone.lat, zone.lng]}
            icon={getMarkerIcon(zone.riskLevel)}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-bold text-sm">{zone.name}</h3>
                <p className="text-xs text-slate-600 my-1">{zone.basis}</p>
                <div className="flex items-center gap-1 mt-2">
                  <span className={`w-2 h-2 rounded-full ${
                          zone.riskLevel === 'High' ? 'bg-red-500' :
                          zone.riskLevel === 'Medium' ? 'bg-amber-500' : 'bg-slate-400'
                  }`}></span>
                  <span className="text-xs font-semibold">{zone.riskLevel} Risk</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
