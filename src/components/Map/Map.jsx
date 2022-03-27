import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import styled from 'styled-components';
import L from 'leaflet';
import cities from './data.json';
import marker from './marker.png';

const Container = styled.div`
  // width: 100vw;
  // height: 100vh;
`;

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('../../../node_modules/leaflet/dist/images//marker-icon-2x.png'),
  iconUrl: require('../../../node_modules/leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('../../../node_modules/leaflet/dist/images/marker-shadow.png'),
});

export default function Map() {
  const mapRef = useRef();

  useEffect(() => {
    const current = {};
    const { leafletElement: map } = current;

    if (!map) return;

    const citiesGeoJson = new L.GeoJSON(cities);

    citiesGeoJson.addTo(map);
  }, []);

  return (
    <Container>
      <MapContainer
        ref={mapRef}
        center={[51.505, -0.09]}
        zoom={3}
        style={{ width: '100vw', height: '100vh' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <GeoJSON
          attribution='../../../node_modules/leaflet/dist/images/marker-icon.png'
          data={cities}
        />
      </MapContainer>
    </Container>
  );
}
