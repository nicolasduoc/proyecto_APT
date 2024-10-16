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
          <img src="https://img.freepik.com/fotos-premium/lampara-alerta-roja-o-indicador-advertencia-panel-negro-brillando-lampara-alerta-roja-indicador-estado-advertencia_1024771-997.jpg" alt="Alerta" className="rounded-image" />
          <h3>Alertas en Tiempo Real</h3>
          <p>Recibe notificaciones inmediatas cuando ocurra un sismo cerca de ti.</p>
        </div>
      </div>
      <div className="col-md-4">
        <div className="feature">
          <img src="https://th.bing.com/th/id/OIF.WFwC93ejqxi7V0nJEir04w?rs=1&pid=ImgDetMain" alt="Mapas Interactivos" className="rounded-image" />
          <h3>Mapas Interactivos</h3>
          <p>Visualiza datos sísmicos en nuestros mapas fáciles de usar.</p>
        </div>
      </div>
      <div className="col-md-4">
        <div className="feature">
          <img src="https://th.bing.com/th/id/R.02bbfefe9e1986c0f1adf561411da0ab?rik=Riqb9Tc62dQrLA&riu=http%3a%2f%2falarmasonline.com.mx%2fwp-content%2fuploads%2f2019%2f11%2fCONSEJOS-DE-SEGURIDAD-B%c3%81SICOS.jpg&ehk=5TFPkyllSsZ%2bX2O6IbZYnUzsXGQx0UrjuHmZNN2U5Lg%3d&risl=&pid=ImgRaw&r=0" alt="Consejos de Seguridad" className="rounded-image" />
          <h3>Consejos de Seguridad</h3>
          <p>Obtén consejos esenciales para protegerte durante un sismo.</p>
        </div>
      </div>
    </div>
  </div>
  <style>
    
</style>
</section>
    </div>
    
  );
};

export default HomePage;

