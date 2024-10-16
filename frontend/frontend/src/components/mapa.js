import React, { useState } from 'react';
import { MapContainer, TileLayer, Polygon, Tooltip, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../styles/mapa.css';

// Datos de placas tectónicas
const tectonicPlates = [
  {
    name: 'Placa del Caribe',
    color: 'orange',
    coordinates: [
      [8.0, -78.0], [9.0, -77.0], [10.5, -76.0], [11.5, -75.0],
      [13.5, -72.5], [14.5, -71.0], [15.0, -70.0], [16.0, -69.0],
      [17.0, -67.0], [18.0, -66.0], [19.0, -65.5], [21.5, -64.5],
      [23.0, -65.5], [24.0, -66.0], [25.0, -70.0], [26.0, -74.0],
      [25.5, -79.0], [24.5, -80.0], [25.5, -85.0], [24.0, -87.0],
      [23.0, -88.0], [21.0, -89.0], [20.0, -90.0], [18.0, -91.0],
      [16.0, -92.0], [15.0, -96.0], [14.0, -90.0], [13.0, -83.0],
      [11.5, -82.0], [10.0, -81.0], [9.0, -80.5], [8.5, -80.0],
    ],
    info: 'La Placa del Caribe se encuentra al este de América Central y está en contacto con la Placa Sudamericana.',
  },
  {
    name: 'Placa Africana',
    color: 'green',
    coordinates: [
      [34.6456, 29.1639], [39.1417, 14.7498], [40.4918, 8.0701],
      [33.7734, -10.5627], [27.1117, -23.5705], [21.9978, -27.4377],
      [17.3650, -28.1408], [4.2738, -19.0002], [-0.6441, -3.8830],
      [-14.5477, 1.3904], [-30.7006, 7.7186], [-35.9836, 13.3436],
      [-34.2584, 30.9217], [-20.2481, 57.9920], [-7.6525, 55.8826],
      [7.7695, 51.3123], [25.8530, 34.7889], [36.9268, 16.5076],
    ],
    info: 'La Placa Africana es crucial en la tectónica global y contribuye a diversas formaciones geológicas.',
  },
  {
    name: 'Placa Norteamericana',
    color: 'blue',
    coordinates: [
      [14.617153841670588, -94.87034420376229],
      [17.656141259656227, -89.94846920914861],
      [23.736654186480553, -83.09300046665102],
      [25.969478826643652, -77.64378172261446],
      [32.705567941132166, -59.88987549204374],
      [49.16128651353373, -33.171125521283834],
      [63.160097328574345, -21.39378178417256],
      [66.93504276474619, -17.175031788789415],
      [70.20430142259411, -11.55003178975122],
      [75.14403866781811, -8.913313042636762],
      [78.73598470637602, 7.610124439280596],
      [79.75219465345359, 8.48903068831875],
      [83.03998288337526, -7.682844300139103],
      [84.31343781988059, -21.7453442847496],
      [84.38268424685592, -73.4250317281932],
      [81.63787045798902, -159.90940663354777],
      [77.5665514778021, -171.92285104878147],
      [68.69781724522421, -167.05672280600797],
      [64.29385951537114, -169.69344155312243],
      [63.25673877084812, -172.77889988008715],
      [59.381753910464546, -167.24179051114677],
      [53.30903902044217, -166.89022799344892],
      [46.16973519100177, -142.19296239547677],
      [41.843613289867186, -124.9996215936849],
      [42.891785253041995, -124.92843493918679],
      [37.52055110921691, -123.05131644801628],
      [30.729861189474097, -116.59872161625773],
      [23.747718362084747, -110.61540642565171],
      [16.25797428866311, -94.77721915640043],
    ],
    info: 'La Placa Norteamericana abarca la mayor parte de América del Norte, incluyendo parte del océano Atlántico.',
  },
  {
    name: 'Placa Arábiga',
    color: 'purple',
    coordinates: [
      [19.3668, 39.7108], [24.5808, 36.1951], [33.7734, 30.5701],
      [38.3190, 28.8123], [43.3681, 30.2186], [41.0244, 43.2264],
      [24.2607, 58.3436], [13.9807, 52.0154],
    ],
    info: 'La Placa Arábiga es fundamental en la tectónica del Medio Oriente y su interacción con otras placas.',
  },
  {
    name: 'Placa India',
    color: 'cyan',
    coordinates: [
      [23.5968, 67.8714], [24.5049, 76.8207], [24.9565, 82.2897],
      [22.4529, 86.2672], [16.8368, 83.2841], [7.8618, 82.2897],
      [8.1080, 75.8263],
    ],
    info: 'La Placa India es conocida por su colisión con la Placa Euroasiática, que forma el Himalaya.',
  },
  {
    name: 'Placa Sudamericana',
    color: 'brown',
    coordinates: [
      [-55.0, -67.0],
      [-52.0, -71.5],
      [-48.0, -74.0],
      [-41.0, -72.0],
      [-33.0, -70.0],
      [-18.0, -70.0],
      [-14.0, -76.0],
      [-4.0, -80.0],
      [-2.0, -80.5],
      [9.0, -76.0],
      [12.0, -71.0],
      [14.0, -64.0],
      [17.0, -60.0],
      [18.0, -50.0],
      [19.0, -39.0],
      [14.0, -30.0],
      [13.0, -23.0],
      [8.5, -20.0],
      [5.0, -15.0],
      [-23.0, -7.0],
    ],
    info: 'La Placa Sudamericana se extiende desde el océano Atlántico hasta el océano Pacífico y es responsable de la cordillera de los Andes.',
  },
  {
    name: 'Placa Euroasiática',
    color: 'pink',
    coordinates: [
      [66.1353, -17.4740], [63.2847, -21.6927], [56.6220, -24.1537],
      [51.4699, -17.4740], [36.4065, -9.3880], [37.5300, 3.1025],
      [39.7480, 7.4717], [41.6702, 12.4935], [41.4961, 19.8728],
      [45.9733, 25.3097], [51.7461, 31.9064], [57.0360, 40.1655],
      [62.6372, 42.8264], [65.4582, 45.9180],
    ],
    info: 'La Placa Euroasiática es una de las placas más grandes y abarca gran parte de Europa y Asia.',
  },
];

const Mapa = () => {
  const [position, setPosition] = useState([21.1047, -72.5]);

  return (
    <MapContainer center={position} zoom={2} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {tectonicPlates.map((plate, index) => (
        <Polygon
          key={index}
          positions={plate.coordinates}
          pathOptions={{ fillColor: plate.color, color: 'black' }}
        >
          <Tooltip direction="top" offset={[-8, -2]} opacity={1} permanent>
            {plate.name}
          </Tooltip>
          <Popup>
            <div>
              <h4>{plate.name}</h4>
              <p>{plate.info}</p>
            </div>
          </Popup>
        </Polygon>
      ))}
    </MapContainer>
  );
};

export default Mapa;
