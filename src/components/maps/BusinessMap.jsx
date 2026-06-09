import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png'
});

const BusinessMap = ({ lat, lng, nombre, direccion }) => {
  const [showPopup, setShowPopup] = useState(true);

  if (!lat || !lng) {
    return <div className='bg-secondary-light rounded-lg h-48 flex items-center justify-center text-muted text-sm'>Ubicacion no disponible</div>;
  }

  return (
    <MapContainer center={[lat, lng]} zoom={16} style={{ height: '200px', width: '100%' }} className='rounded-lg overflow-hidden'>
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution='OSM' />
      <Marker position={[lat, lng]} eventHandlers={{ add: () => setShowPopup(true) }}>
        <Popup>{nombre}<br />{direccion}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default BusinessMap;


