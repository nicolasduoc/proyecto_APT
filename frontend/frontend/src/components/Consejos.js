// src/components/Consejos.js
import React from 'react';
import '../styles/Consejos.css'; // Import a CSS file for custom styles
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS

const Consejos = () => {
  const consejos = [
    {
      id: 1,
      titulo: 'Prepárate para emergencias',
      descripcion: 'Tener un plan de emergencia es crucial en caso de un desastre natural. Asegúrate de tener un kit de emergencia y de que todos en tu hogar sepan cómo actuar.',
      imagen: 'https://pbs.twimg.com/media/FdCd5RHXEAEPN_1?format=jpg&name=large', // Replace with actual image URL
    },
    {
      id: 2,
      titulo: 'Mantente informado',
      descripcion: 'Sigue las alertas de las autoridades locales y nacionales en caso de sismos o cualquier otra emergencia.',
      imagen: 'https://via.placeholder.com/150', // Replace with actual image URL
    },
    {
      id: 3,
      titulo: 'Protege tu hogar',
      descripcion: 'Revisa y refuerza las estructuras de tu hogar para reducir el riesgo de daños durante un sismo.',
      imagen: 'https://via.placeholder.com/150', // Replace with actual image URL
    },
    {
      id: 4,
      titulo: 'Conoce las rutas de evacuación',
      descripcion: 'Familiarízate con las rutas de evacuación más cercanas a tu hogar o lugar de trabajo en caso de un desastre.',
      imagen: 'https://via.placeholder.com/150', // Replace with actual image URL
    },
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center">Consejos de Seguridad</h2>
      <div id="consejosCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {consejos.map((consejo, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={consejo.id}>
              <img src={consejo.imagen} className="d-block w-100" alt={consejo.titulo} />
              <div className="carousel-caption d-none d-md-block">
                <h5>{consejo.titulo}</h5>
                <p>{consejo.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#consejosCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#consejosCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Consejos;
