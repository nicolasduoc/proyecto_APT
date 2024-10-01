import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Historico = () => {
  const [sismos, setSismos] = useState([]);
  const [error, setError] = useState('');

  // Obtener datos de sismos cuando se carga el componente
  useEffect(() => {
    const fetchSismos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/historico');
        setSismos(response.data);  // Guardamos los datos en el estado
      } catch (err) {
        setError('Error al obtener los datos de sismos');
      }
    };

    fetchSismos();
  }, []); // Solo se ejecuta cuando se carga el componente

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Histórico de Sismos</h2>
      
      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      {sismos.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Magnitud</th>
              <th>Latitud</th>
              <th>Longitud</th>

            </tr>
          </thead>
          <tbody>
            {sismos.map((sismo) => (
              <tr key={sismo.id}>
                <td>{sismo.id}</td>
                <td>{sismo.Fecha}</td>
                <td>{sismo.Magnitud_Ms}</td>
                <td>{sismo.Lat}</td>
                <td>{sismo.Lat}</td>

              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center">Cargando datos...</div>
      )}
    </div>
  );
};

export default Historico;
