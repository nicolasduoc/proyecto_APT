import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/HomePage.css';

const HomePage = () => {
  const handleButtonClick = () => {
    alert('Button clicked! Navigating to the next section...');
  };

  return (
    <div className="home-container">


      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 className="display-4">Mantente Seguro con EarthAlert</h1>
          <p className="lead">Alertas sísmicas en tiempo real y consejos de seguridad a tu alcance.</p>
          <button className="btn btn-primary" onClick={handleButtonClick}>Comenzar</button>
        </div>
      </section>

      {/* Feature Section */}
      <section className="features">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="feature">
                <div className="icon-placeholder">100 x 100</div>
                <h3>Alertas en Tiempo Real</h3>
                <p>Recibe notificaciones inmediatas cuando ocurra un sismo cerca de ti.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature">
                <div className="icon-placeholder">100 x 100</div>
                <h3>Mapas Interactivos</h3>
                <p>Visualiza datos sísmicos en nuestros mapas fáciles de usar.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature">
                <div className="icon-placeholder">100 x 100</div>
                <h3>Consejos de Seguridad</h3>
                <p>Obtén consejos esenciales para protegerte durante un sismo.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

