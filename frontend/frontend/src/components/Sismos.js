import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../styles/Sismos.css';

const geoReferences = {
  "Mina Collahuasi": { lat: -20.96, lng: -68.64 },
  "San Pedro de Atacama": { lat: -22.91, lng: -68.20 },
  "Putre": { lat: -18.19, lng: -69.56 },
  "Ollagüe": { lat: -21.22, lng: -68.25 },
  "Las Cabras": { lat: -34.28, lng: -71.35 },
  "Socaire": { lat: -23.58, lng: -67.80 },
  "Punitaqui": { lat: -30.85, lng: -71.27 },
  "Tirúa": { lat: -38.32, lng: -73.50 },
  "Calama": { lat: -22.45, lng: -68.92 },
  "Huasco": { lat: -28.47, lng: -71.22 },
  "Pica": { lat: -20.20, lng: -69.09 },
  "Pichilemu": { lat: -34.37, lng: -72.03 },
  "Termas del Flaco": { lat: -34.30, lng: -70.25 },
  "Mina Los Pelambres": { lat: -31.75, lng: -70.66 },
  "Quillagua": { lat: -22.87, lng: -68.93 },
  "Caldera": { lat: -23.05, lng: -70.82 },
  "Navidad": { lat: -34.41, lng: -71.33 },
};

const Sismos = () => {
  const [sismos, setSismos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSismos = async () => {
      try {
        const response = await axios.get('https://api.gael.cloud/general/public/sismos');
        setSismos(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSismos();
  }, []);

  const getColorByMagnitude = (magnitude) => {
    if (magnitude < 3) return 'green';
    if (magnitude < 5) return 'yellow';
    return 'red';
  };

  if (loading) return <p className="text-center loading">Cargando...</p>;
  if (error) return <p className="text-center error">Error al cargar los datos: {error.message}</p>;

  return (
    <div className="sismos-wrapper">
      <h2 className="text-center title">Últimos Sismos</h2>

      <div className="map-container">
        <MapContainer 
          center={[-30, -71]} 
          zoom={4} 
          className="map-modern" 
          bounds={[[-56, -75], [-17, -66]]} 
          maxBoundsVisibile={true} 
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {sismos.map((sismo, index) => {
            const referenceKey = sismo.RefGeografica.split(' de ')[1];
            const coordinates = geoReferences[referenceKey];

            if (coordinates) {
              return (
                <Marker
                  key={index}
                  position={[coordinates.lat, coordinates.lng]}
                  icon={L.divIcon({
                    className: 'custom-icon',
                    html: `<div style="background:${getColorByMagnitude(sismo.Magnitud)}; width: 10px; height: 10px; border-radius: 50%;"></div>`,
                  })}
                >
                  <Popup>
                    <strong>Magnitud:</strong> {sismo.Magnitud} <br />
                    <strong>Profundidad:</strong> {sismo.Profundidad} km <br />
                    <strong>Referencia:</strong> {sismo.RefGeografica} <br />
                    <strong>Fecha:</strong> {sismo.Fecha}
                  </Popup>
                </Marker>
              );
            }
            return null;
          })}
        </MapContainer>

        {/* Leyenda de colores */}
        <div className="legend">
          <h4>Magnitud</h4>
          <div><span className="legend-color" style={{ background: 'green' }}></span>Menor a 3</div>
          <div><span className="legend-color" style={{ background: 'yellow' }}></span>Entre 3 y 5</div>
          <div><span className="legend-color" style={{ background: 'red' }}></span>Mayor a 5</div>
        </div>
      </div>

      <div className="sismos-container mt-4">
        <table className="table table-striped modern-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Profundidad (km)</th>
              <th>Magnitud</th>
              <th>Referencia</th>
            </tr>
          </thead>
          <tbody>
            {sismos.map((sismo, index) => (
              <tr key={index}>
                <td>{sismo.Fecha}</td>
                <td>{sismo.Profundidad}</td>
                <td>{sismo.Magnitud}</td>
                <td>{sismo.RefGeografica}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sismos;
