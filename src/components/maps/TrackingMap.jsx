import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useSocketStore } from '../../store/socketStore';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png'
});

const riderIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3186/3186858.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32]
});

const destinationIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2503/2503308.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32]
});

const MapUpdater = ({ riderPos, destPos }) => {
  const map = useMap();
  useEffect(() => {
    if (riderPos && destPos) {
      const bounds = L.latLngBounds([riderPos, destPos]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [riderPos, destPos, map]);
  return null;
};

const TrackingMap = ({ orderId, destinationLat, destinationLng }) => {
  const [riderPos, setRiderPos] = React.useState(null);
  const listenRiderLocation = useSocketStore(state => state.listenRiderLocation);
  const joinOrderRoom = useSocketStore(state => state.joinOrderRoom);

  useEffect(() => {
    if (orderId) joinOrderRoom(orderId);
  }, [orderId, joinOrderRoom]);

  useEffect(() => {
    listenRiderLocation((data) => {
      if (data.orderId === orderId) {
        setRiderPos({ lat: data.lat, lng: data.lng });
      }
    });
  }, [orderId, listenRiderLocation]);

  const destPos = destinationLat && destinationLng ? [destinationLat, destinationLng] : null;
  const center = riderPos || destPos || [4.7110, -74.0721];

  return (
    <MapContainer center={center} zoom={14} style={{ height: '100%', width: '100%' }}>
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution='OSM' />
      {riderPos && <Marker position={riderPos} icon={riderIcon}><Popup>Repartidor</Popup></Marker>}
      {destPos && <Marker position={destPos} icon={destinationIcon}><Popup>Destino</Popup></Marker>}
      <MapUpdater riderPos={riderPos} destPos={destPos} />
    </MapContainer>
  );
};

export default TrackingMap;

