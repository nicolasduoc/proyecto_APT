// src/components/Sismos.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el archivo CSS de Bootstrap


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

  if (loading) return <p className="text-center text-primary">Cargando...</p>;
  if (error) return <p className="text-center text-danger">Error al cargar los datos: {error.message}</p>;

  return (
    <div className="container sismos-container">
      <h2 className="text-center">Últimos Sismos</h2>
      <table className="table table-striped">
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
  );
};

export default Sismos;
