import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Historico.css'; // Crea y enlaza este archivo CSS

const Historico = () => {
  const [sismos, setSismos] = useState([]);
  const [filteredSismos, setFilteredSismos] = useState([]);
  const [error, setError] = useState('');
  const [year, setYear] = useState('');
  const [minMagnitud, setMinMagnitud] = useState('');
  const [selectedSismo, setSelectedSismo] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchSismos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/historico');
        const sortedSismos = response.data.sort((a, b) => new Date(b.Fecha) - new Date(a.Fecha));
        setSismos(sortedSismos);
        setFilteredSismos(sortedSismos); // Inicialmente todos los sismos
      } catch (err) {
        setError('Error al obtener los datos de sismos');
      }
    };

    fetchSismos();
  }, []);

  useEffect(() => {
    let filtered = sismos;

    if (year) {
      filtered = filtered.filter((sismo) => {
        const sismoYear = new Date(sismo.Fecha).getFullYear();
        return sismoYear === parseInt(year);
      });
    }

    if (minMagnitud) {
      filtered = filtered.filter((sismo) => {
        const magnitude = parseFloat(sismo.Magnitud_MW);
        return magnitude >= parseFloat(minMagnitud);
      });
    }

    setFilteredSismos(filtered);
  }, [year, minMagnitud, sismos]);

  const getColorByMagnitude = (magnitude) => {
    if (magnitude < 3) return 'green';
    if (magnitude < 5) return 'yellow';
    return 'red';
  };

  if (error) return <p className="text-center error">Error al cargar los datos: {error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Histórico de Sismos</h2>

      {/* Filtros por año y magnitud mínima */}
      <div className="row mb-4">
        <div className="col-md-4">
          <label htmlFor="year">Filtrar por año:</label>
          <input
            type="number"
            id="year"
            className="form-control"
            placeholder="Ingrese un año"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="minMagnitud">Magnitud mínima (MW):</label>
          <input
            type="number"
            id="minMagnitud"
            className="form-control"
            placeholder="Mínima"
            value={minMagnitud}
            onChange={(e) => setMinMagnitud(e.target.value)}
          />
        </div>
      </div>

      {/* Mapa para mostrar los sismos */}
      <div className="map-container">
        <MapContainer center={[-35, -72]} zoom={4} className="map-modern">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {filteredSismos.map((sismo, index) => (
            <Marker
              key={index}
              position={[sismo.Lat, sismo.Lon]}
              icon={L.divIcon({
                className: 'custom-icon',
                html: `<div style="background:${getColorByMagnitude(sismo.Magnitud_MW)}; width: 10px; height: 10px; border-radius: 50%;"></div>`,
              })}
              eventHandlers={{
                click: () => {
                  setSelectedSismo(sismo);
                  setIsMenuOpen(true);
                },
              }}
            >
              <Popup>
                <strong>Magnitud (Ms):</strong> {sismo.Magnitud_Ms} <br />
                <strong>Magnitud (MW):</strong> {sismo.Magnitud_MW} <br />
                <strong>Fecha:</strong> {sismo.Fecha} <br />
                <strong>Latitud:</strong> {sismo.Lat} <br />
                <strong>Longitud:</strong> {sismo.Lon} <br />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Menú Desplegable */}
      <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
        {selectedSismo && (
          <div className="menu-content">
            <button onClick={() => setIsMenuOpen(false)}>Cerrar</button>
            <h4>Descripción</h4>
            <p>{selectedSismo.descripcion}</p>
            {selectedSismo.imagen && <img src={selectedSismo.imagen} alt="Descripción del sismo" style={{ width: '100%', height: 'auto' }} />}
          </div>
        )}
      </div>

      {/* Tabla de datos históricos */}
      {filteredSismos.length > 0 ? (
        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Magnitud (Ms)</th>
              <th>Magnitud (MW)</th>
              <th>Latitud</th>
              <th>Longitud</th>
              <th>Descripción</th>
              <th>Imagen</th>
            </tr>
          </thead>
          <tbody>
            {filteredSismos.map((sismo) => (
              <tr key={sismo.id}>
                <td>{sismo.id}</td>
                <td>{sismo.Fecha}</td>
                <td>{sismo.Magnitud_Ms}</td>
                <td>{sismo.Magnitud_MW}</td>
                <td>{sismo.Lat}</td>
                <td>{sismo.Lon}</td>
                <td>{sismo.descripcion}</td>
                <td>{sismo.imagen && <img src={sismo.imagen} alt="Descripción del sismo" style={{ width: '50px', height: 'auto' }} />}</td> {/* Muestra la imagen */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center">No se encontraron sismos para los filtros seleccionados...</div>
      )}
    </div>
  );
};

export default Historico;
