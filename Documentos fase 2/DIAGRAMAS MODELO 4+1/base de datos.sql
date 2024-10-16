CREATE TABLE `Usuario` (
  `idUsuario` int PRIMARY KEY AUTO_INCREMENT,
  `nombreUsuario` varchar(255) UNIQUE NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `latitud` decimal(10,6),
  `longitud` decimal(10,6)
);

CREATE TABLE `ContactoEmergencia` (
  `idContactoEmergencia` int PRIMARY KEY AUTO_INCREMENT,
  `idUsuario` int,
  `nombre` varchar(255) NOT NULL,
  `telefono` varchar(20) NOT NULL
);

CREATE TABLE `Sismo` (
  `idSismo` int PRIMARY KEY AUTO_INCREMENT,
  `fechaHora` datetime NOT NULL,
  `magnitud` decimal(3,1) NOT NULL,
  `profundidad` decimal(5,2),
  `latitud` decimal(10,6) NOT NULL,
  `longitud` decimal(10,6) NOT NULL
);

CREATE TABLE `RecursoSeguridad` (
  `idRecursoSeguridad` int PRIMARY KEY AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text,
  `enlace` varchar(255),
  `categoria` enum(PRIMEROS_AUXILIOS,EVACUACION,ALBERGUE,COMUNICACION)
);

CREATE TABLE `Alerta` (
  `idAlerta` int PRIMARY KEY AUTO_INCREMENT,
  `idUsuario` int,
  `idSismo` int,
  `fechaHora` datetime NOT NULL
);

CREATE TABLE `AlertaContacto` (
  `idAlerta` int,
  `idContactoEmergencia` int
);

CREATE TABLE `Administrador` (
  `idAdministrador` int PRIMARY KEY AUTO_INCREMENT,
  `nombreUsuario` varchar(255) UNIQUE NOT NULL,
  `contraseña` varchar(255) NOT NULL
);

ALTER TABLE `ContactoEmergencia` ADD FOREIGN KEY (`idUsuario`) REFERENCES `Usuario` (`idUsuario`) ON DELETE CASCADE;

ALTER TABLE `Alerta` ADD FOREIGN KEY (`idUsuario`) REFERENCES `Usuario` (`idUsuario`) ON DELETE CASCADE;

ALTER TABLE `Alerta` ADD FOREIGN KEY (`idSismo`) REFERENCES `Sismo` (`idSismo`);

ALTER TABLE `AlertaContacto` ADD FOREIGN KEY (`idAlerta`) REFERENCES `Alerta` (`idAlerta`) ON DELETE CASCADE;

ALTER TABLE `AlertaContacto` ADD FOREIGN KEY (`idContactoEmergencia`) REFERENCES `ContactoEmergencia` (`idContactoEmergencia`) ON DELETE CASCADE;
