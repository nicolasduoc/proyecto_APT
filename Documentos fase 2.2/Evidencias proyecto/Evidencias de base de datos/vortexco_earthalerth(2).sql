-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 19-11-2024 a las 23:05:26
-- Versión del servidor: 10.6.19-MariaDB-cll-lve
-- Versión de PHP: 8.1.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `vortexco_earthalerth`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alerta`
--

CREATE TABLE `alerta` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `hora` time NOT NULL,
  `fecha` date NOT NULL,
  `latitud` decimal(10,7) NOT NULL,
  `longitud` decimal(10,7) NOT NULL,
  `magnitud` decimal(3,1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alerta`
--

INSERT INTO `alerta` (`id`, `user_id`, `hora`, `fecha`, `latitud`, `longitud`, `magnitud`) VALUES
(1, 1, '03:45:12', '0000-00-00', -33.5973113, -70.5680570, 2.0),
(2, 1, '03:45:12', '0000-00-00', -33.5973113, -70.5680570, 2.0),
(3, 1, '03:45:12', '0000-00-00', -33.5973113, -70.5680570, 2.0),
(4, 1, '03:45:12', '0000-00-00', -33.5973113, -70.5680570, 2.0),
(5, 1, '12:23:55', '2024-11-18', -33.3667976, -70.6972333, 8.0),
(6, 1, '12:25:08', '2024-11-18', -33.3667906, -70.6972312, 10.0),
(7, 1, '12:29:12', '2024-11-18', -33.3667823, -70.6972510, 1.0),
(8, 1, '12:49:11', '2024-11-18', -33.3667973, -70.6972556, 10.0),
(9, 1, '12:51:23', '2024-11-18', -33.3667944, -70.6972672, 12.0),
(10, 11, '12:57:00', '2024-11-18', -33.3667913, -70.6972462, 8.0),
(11, 11, '12:57:28', '2024-11-18', -33.3667913, -70.6972462, 11.0),
(12, 12, '13:00:55', '2024-11-18', -33.3667880, -70.6972677, 1.0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacto_emergencia`
--

CREATE TABLE `contacto_emergencia` (
  `id_contacto` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `numero` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `contacto_emergencia`
--

INSERT INTO `contacto_emergencia` (`id_contacto`, `id_user`, `nombre`, `numero`) VALUES
(2, 9, 'Nico', '56998576004'),
(3, 9, 'Miguel', '12345678');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `descripcion`
--

CREATE TABLE `descripcion` (
  `id` int(11) NOT NULL,
  `sismo_id` int(11) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `descripcion`
--

INSERT INTO `descripcion` (`id`, `sismo_id`, `descripcion`, `imagen`) VALUES
(1, 174, 'El 27 de febrero de 2010, a las 3:34 de la madrugada, un terremoto de magnitud 8,8 y posterior maremoto azotó a la zona central y sur de Chile. El epicentro se localizó en la costa sur del Maule, frente a Cobquecura. El sismo duró 4 o 5 minutos y alcanzó una magnitud de 8,8 MW. Es considerado como el segundo más fuerte en la historia del país y el octavo más fuerte registrado por la humanidad.', 'http://www.csn.uchile.cl/wp-content/uploads/2016/02/Alto-rio-OK-665x250.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sismos`
--

CREATE TABLE `sismos` (
  `id` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Hora` time NOT NULL,
  `Lat` decimal(10,7) NOT NULL,
  `Lon` decimal(10,7) NOT NULL,
  `Magnitud_Ms` decimal(3,1) DEFAULT NULL,
  `Magnitud_MW` decimal(3,1) DEFAULT NULL,
  `Profundidad` decimal(5,1) DEFAULT NULL,
  `Efecto` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sismos`
--

INSERT INTO `sismos` (`id`, `Fecha`, `Hora`, `Lat`, `Lon`, `Magnitud_Ms`, `Magnitud_MW`, `Profundidad`, `Efecto`) VALUES
(65, '1570-02-08', '09:00:00', -36.8000000, -73.0000000, 8.3, NULL, NULL, 'TD'),
(66, '1575-03-17', '10:00:00', -33.4000000, -70.6000000, 7.3, NULL, NULL, '-'),
(67, '1575-12-16', '14:30:00', -39.8000000, -73.2000000, 8.5, NULL, NULL, 'TD'),
(68, '1604-11-24', '12:30:00', -18.5000000, -70.4000000, 8.5, NULL, 30.0, 'TD'),
(69, '1615-09-16', '23:30:00', -18.5000000, -70.3500000, 8.8, NULL, NULL, 'TM'),
(395, '1570-02-08', '09:00:00', -36.8000000, -73.0000000, 8.3, NULL, NULL, 'TD'),
(396, '1575-03-17', '10:00:00', -33.4000000, -70.6000000, 7.3, NULL, NULL, '-'),
(397, '1575-12-16', '14:30:00', -39.8000000, -73.2000000, 8.5, NULL, NULL, 'TD'),
(398, '1604-11-24', '12:30:00', -18.5000000, -70.4000000, 8.5, NULL, 30.0, 'TD'),
(399, '1615-09-16', '23:30:00', -18.5000000, -70.3500000, 8.8, NULL, NULL, 'TM'),
(400, '1647-05-13', '22:30:00', -35.0000000, -72.0000000, 8.5, NULL, NULL, '-'),
(401, '1657-03-15', '19:30:00', -36.8300000, -73.0300000, 8.0, NULL, NULL, 'TD'),
(402, '1681-03-10', '00:00:00', -18.5000000, -70.3500000, 7.3, NULL, NULL, '-'),
(403, '1687-07-12', '02:00:00', -32.7500000, -70.7300000, 7.3, NULL, NULL, '-'),
(404, '1730-07-08', '04:45:00', -33.0500000, -71.6300000, 8.7, NULL, NULL, 'TD'),
(405, '1737-12-24', '00:00:00', -39.8000000, -73.2000000, 7.7, NULL, NULL, 'T'),
(406, '1751-05-25', '01:00:00', -36.8300000, -73.0300000, 8.5, NULL, NULL, 'TM'),
(407, '1796-03-30', '06:45:00', -27.3500000, -70.3500000, 7.7, NULL, NULL, '-'),
(408, '1819-04-11', '10:00:00', -27.3500000, -70.3500000, 8.3, NULL, NULL, 'TD'),
(409, '1822-11-19', '22:30:00', -33.0500000, -71.6300000, 8.5, NULL, NULL, 'TM'),
(410, '1829-09-26', '14:00:00', -33.0500000, -71.6300000, 7.0, NULL, NULL, '-'),
(411, '1831-10-08', '06:00:00', -18.5000000, -71.0000000, 7.8, NULL, NULL, '-'),
(412, '1833-09-18', '05:45:00', -18.5000000, -70.4000000, 7.7, NULL, 60.0, '-'),
(413, '1835-02-20', '11:30:00', -36.8300000, -73.0300000, 8.5, NULL, NULL, 'TD'),
(414, '1837-11-07', '08:00:00', -39.8000000, -73.2000000, 8.0, NULL, NULL, 'TM'),
(415, '1847-10-08', '11:30:00', -31.6100000, -71.1800000, 7.3, NULL, NULL, '-'),
(416, '1849-12-17', '06:00:00', -29.9500000, -71.3700000, 7.5, NULL, NULL, 'TM'),
(417, '1850-12-06', '06:52:00', -33.8100000, -70.2200000, 7.3, NULL, NULL, '-'),
(418, '1851-04-02', '06:48:00', -33.3200000, -71.4200000, 7.1, NULL, NULL, '-'),
(419, '1859-10-05', '08:00:00', -27.3500000, -70.3500000, 7.6, NULL, NULL, 'TM'),
(420, '1868-08-13', '16:45:00', -18.5000000, -70.3500000, 8.5, NULL, NULL, 'TD'),
(421, '1869-08-24', '13:30:00', -19.6000000, -70.2300000, 7.5, NULL, NULL, 'TM'),
(422, '1871-10-05', '05:00:00', -20.2000000, -70.1700000, 7.3, NULL, NULL, 'T'),
(423, '1877-05-09', '21:16:00', -19.6000000, -70.2300000, 8.5, NULL, NULL, 'TD'),
(424, '1878-01-23', '08:00:00', -20.0000000, -70.3000000, 7.9, NULL, 40.0, '-'),
(425, '1879-02-02', '06:30:00', -53.0000000, -70.6700000, 7.3, NULL, NULL, '-'),
(426, '1880-08-15', '08:48:00', -31.6200000, -71.1800000, 7.7, NULL, NULL, '-'),
(427, '1906-08-16', '19:48:00', -33.0000000, -72.0000000, 7.9, 8.2, 25.0, 'TM'),
(428, '1909-06-08', '01:00:00', -26.5000000, -70.5000000, 7.6, NULL, NULL, '-'),
(429, '1910-10-04', '19:00:00', -22.0000000, -69.0000000, 7.3, NULL, NULL, '-'),
(430, '1911-09-15', '08:10:00', -20.0000000, -72.0000000, 7.3, NULL, NULL, '-'),
(431, '1914-01-29', '23:30:00', -35.0000000, -73.0000000, 8.2, NULL, NULL, '-'),
(432, '1917-02-14', '20:48:00', -30.0000000, -73.0000000, 7.0, NULL, NULL, '-'),
(433, '1918-05-20', '12:57:00', -28.5000000, -71.5000000, 7.9, NULL, NULL, '-'),
(434, '1918-12-04', '07:47:00', -26.0000000, -71.0000000, 8.2, NULL, 60.0, 'TM'),
(435, '1919-03-01', '23:37:00', -41.0000000, -73.5000000, 7.2, NULL, 40.0, '-'),
(436, '1919-03-02', '07:45:00', -41.0000000, -73.5000000, 7.3, NULL, 40.0, '-'),
(437, '1920-12-10', '00:25:00', -39.0000000, -73.0000000, 7.4, NULL, NULL, '-'),
(438, '1922-11-07', '19:00:00', -28.0000000, -72.0000000, 7.0, NULL, NULL, '-'),
(439, '1922-11-10', '23:53:00', -28.5000000, -70.0000000, 8.4, 8.5, 25.0, 'TM'),
(440, '1923-05-04', '17:47:00', -28.7500000, -71.7500000, 7.0, NULL, 60.0, '-'),
(441, '1925-05-15', '07:18:00', -26.0000000, -71.5000000, 7.1, NULL, 50.0, '-'),
(442, '1926-04-28', '07:13:00', -24.0000000, -69.0000000, 7.0, NULL, 180.0, '-'),
(443, '1927-11-21', '19:17:00', -44.5000000, -73.0000000, 7.1, NULL, NULL, 'TM'),
(444, '1928-11-20', '16:35:00', -22.5000000, -70.5000000, 7.1, NULL, 25.0, '-'),
(445, '1928-12-01', '00:06:00', -35.0000000, -72.0000000, 8.3, NULL, NULL, 'T'),
(446, '1929-10-19', '16:18:00', -23.0000000, -69.0000000, 7.5, NULL, 100.0, '-'),
(447, '1931-03-18', '04:02:00', -32.5000000, -72.0000000, 7.1, NULL, NULL, '-'),
(448, '1933-02-23', '04:09:00', -20.0000000, -71.0000000, 7.6, NULL, 40.0, '-'),
(449, '1936-03-01', '17:45:00', -40.0000000, -72.5000000, 7.1, NULL, 120.0, '-'),
(450, '1936-07-13', '07:12:00', -24.5000000, -70.0000000, 7.3, NULL, 60.0, '-'),
(451, '1939-01-24', '23:32:00', -36.2000000, -72.2000000, 7.8, NULL, 60.0, '-'),
(452, '1939-04-18', '02:22:00', -27.0000000, -70.5000000, 7.4, NULL, 100.0, '-'),
(453, '1940-10-11', '14:41:00', -41.5000000, -74.5000000, 7.0, NULL, NULL, '-'),
(454, '1942-07-08', '01:55:00', -24.0000000, -70.0000000, 7.0, NULL, 140.0, '-'),
(455, '1943-03-14', '14:37:00', -20.0000000, -69.5000000, 7.2, NULL, 150.0, '-'),
(456, '1943-04-06', '12:07:00', -30.7500000, -72.0000000, 8.3, 8.2, 55.0, 'T'),
(457, '1943-12-01', '06:34:00', -21.0000000, -69.0000000, 7.0, NULL, 100.0, '-'),
(458, '1945-09-13', '07:17:00', -33.2500000, -70.5000000, 7.1, NULL, 100.0, '-'),
(459, '1946-08-02', '15:19:00', -26.5000000, -70.5000000, 7.9, NULL, 50.0, '-'),
(460, '1949-04-19', '23:29:00', -38.0000000, -73.5000000, 7.3, NULL, 70.0, '-'),
(461, '1949-04-25', '09:54:00', -19.7500000, -69.0000000, 7.3, NULL, 110.0, '-'),
(462, '1949-05-29', '21:32:00', -22.0000000, -69.0000000, 7.0, NULL, 100.0, '-'),
(463, '1949-12-17', '02:53:00', -54.0000000, -71.0000000, 7.8, NULL, NULL, '-'),
(464, '1949-12-17', '11:07:00', -54.0000000, -71.0000000, 7.8, NULL, NULL, '-'),
(465, '1950-01-29', '20:56:00', -53.5000000, -71.5000000, 7.0, NULL, NULL, '-'),
(466, '1950-12-09', '17:38:00', -23.5000000, -67.5000000, 8.3, NULL, 100.0, '-'),
(467, '1953-05-06', '13:16:00', -36.5000000, -72.6000000, 7.6, NULL, 60.0, '-'),
(468, '1953-12-06', '22:05:00', -22.1000000, -68.7000000, 7.4, NULL, 128.0, '-'),
(469, '1954-02-08', '00:00:00', -29.0000000, -70.5000000, 7.7, NULL, NULL, '-'),
(470, '1955-04-19', '16:24:00', -30.0000000, -72.0000000, 7.1, NULL, NULL, 'T'),
(471, '1956-01-08', '16:54:00', -19.0000000, -70.0000000, 7.1, NULL, 11.0, '-'),
(472, '1956-12-17', '22:31:00', -25.5000000, -68.5000000, 7.0, NULL, NULL, '-'),
(473, '1957-07-29', '13:15:00', -23.5000000, -71.5000000, 7.0, NULL, NULL, '-'),
(474, '1959-06-13', '20:12:00', -20.4200000, -69.0000000, 7.5, NULL, 83.0, '-'),
(475, '1960-05-21', '06:02:00', -37.5000000, -73.5000000, 7.3, NULL, NULL, '-'),
(476, '1960-05-22', '06:32:00', -37.5000000, -73.0000000, 7.3, NULL, NULL, '-'),
(477, '1960-05-22', '15:11:00', -39.5000000, -74.5000000, 8.5, 9.5, NULL, 'TD'),
(478, '1960-06-19', '22:01:00', -38.0000000, -73.5000000, 7.3, NULL, NULL, '-'),
(479, '1960-11-01', '04:45:00', -38.5000000, -75.1000000, 7.4, NULL, 55.0, '-'),
(480, '1961-07-13', '17:19:00', -41.7000000, -75.2000000, 7.0, NULL, 40.0, '-'),
(481, '1962-02-14', '02:36:00', -37.8000000, -72.5000000, 7.3, NULL, 45.0, '-'),
(482, '1962-08-03', '04:56:00', -23.3000000, -68.1000000, 7.1, NULL, 107.0, '-'),
(483, '1965-02-23', '18:11:00', -25.6700000, -70.6300000, 7.0, NULL, 36.0, '-'),
(484, '1965-03-28', '12:33:00', -32.4180000, -71.1000000, 7.4, NULL, 68.0, '-'),
(485, '1966-12-28', '04:18:00', -25.5100000, -70.7400000, 7.8, NULL, 23.0, '-'),
(486, '1967-03-13', '12:06:00', -40.1200000, -74.6800000, 7.3, NULL, 33.0, '-'),
(487, '1967-12-21', '22:25:00', -21.8000000, -70.0000000, 7.5, NULL, 33.0, '-'),
(488, '1971-06-17', '17:00:00', -25.4020000, -69.0580000, 7.0, NULL, 76.0, '-'),
(489, '1971-07-08', '23:03:00', -32.5110000, -71.2070000, 7.5, NULL, 40.0, 'TM'),
(490, '1974-08-18', '06:44:00', -38.4530000, -73.4310000, 7.1, NULL, 36.0, '-'),
(491, '1975-05-10', '10:27:00', -38.1830000, -73.2320000, 7.7, NULL, 6.0, '-'),
(492, '1976-11-29', '21:40:00', -20.5200000, -68.9190000, 7.3, NULL, 82.0, '-'),
(493, '1978-08-03', '14:11:00', -26.5180000, -70.6640000, 7.0, NULL, 49.0, '-'),
(494, '1981-10-16', '00:25:00', -33.1340000, -73.0740000, 7.5, NULL, 33.0, '-'),
(495, '1983-10-04', '14:52:00', -26.5350000, -70.5630000, 7.3, NULL, 14.0, '-'),
(496, '1985-03-03', '19:46:00', -33.2400000, -71.8500000, 7.8, 8.0, 33.0, 'T'),
(497, '1985-04-08', '21:56:00', -34.1310000, -71.6180000, 7.5, NULL, 37.0, '-'),
(498, '1987-03-05', '06:17:00', -24.3880000, -70.1610000, 7.3, NULL, 62.0, 'T'),
(499, '1987-08-08', '11:48:00', -19.0000000, -70.0000000, 7.1, NULL, 42.0, '-'),
(500, '1995-07-30', '01:11:00', -23.3600000, -70.3100000, 7.3, 8.0, 47.0, 'T'),
(501, '1997-10-14', '22:03:00', -30.7730000, -71.3150000, NULL, 7.1, 56.0, '-'),
(502, '2005-06-13', '18:44:00', -19.8950000, -69.1250000, 7.8, 7.8, 108.0, '-'),
(503, '2007-11-14', '12:40:00', -22.3140000, -70.0780000, 7.5, 7.7, 47.7, '-'),
(504, '2010-02-27', '03:34:00', -36.2900000, -73.2390000, NULL, 8.8, 30.0, 'TD'),
(505, '2014-04-01', '20:46:00', -19.5720000, -70.9080000, NULL, 8.2, 38.9, 'T'),
(506, '2015-09-16', '19:54:00', -31.5530000, -71.8640000, NULL, 8.4, 11.1, 'TD'),
(507, '2016-12-25', '11:22:00', -43.5170000, -74.3910000, NULL, 7.6, 30.0, 'T'),
(508, '2020-09-01', '00:09:00', -27.9690000, -71.2410000, NULL, 7.0, 31.0, '-');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(1, 'asd', 'raper@gmail.com', '$2a$10$3CBncf5TYcimKY9jSnsdXuCb/3Gphk/SFXOFpVwPXC3aEjMhR0fKq'),
(3, '234', 'raper@gemail.com', '$2a$10$nq3KiQ8O3QULl40au8T00uDhaQk7k9IMQ7ibZiNy4uxgM.J0mXa4a'),
(4, 'extra', 'ff@f.cl', '$2b$10$oMN7tK9Ah.mefo0GgkDs2ueB7wsuf71z6H1ynMS6t/9MRvuQWOxtS'),
(5, 'franco', 'franco@gmail.com', '$2b$10$I7dd7tSqn8x8O3svlJgWqOdUwsBlolXeRieS4//0iAhK47xYHn7si'),
(6, 'franco2', 'gmail@gmail.com', '$2b$10$3I/NmWwSSyw60gkOg3Aro.wT4h1773etq4noZhtbpmK/HpE2m3T3K'),
(8, 'asd444', 'test1@test.cl', '$2b$10$QNJR36/DUVCItpArjiu8pub4Z585OJUPLCThLXXbZPeSGqdx8w3PS'),
(9, 'nico', 'nico@gmail.com', '$2b$10$EmOmgpfh9zZCDt2OExP1r.SRrdJA4Sa1SxBha.LDwxYD29H7F14Vu'),
(10, 'Nicoprueba', 'nicoprueba@gmail.com', '$2b$10$Y7dv6ZNONjiORH.i9Z35X.uow3fc1DHLBtGeVxmQZYIc0Z0e4GxHu'),
(11, 'Prueba2', 'prueba2@gmail.com', '$2b$10$rfQizcobboTmxb2cQnffWO33eDKSwmz5pIb/WTWgqCOyby7Rh16K2'),
(12, '12', '12@gmail.com', '$2b$10$qhYP1kkHeteNirzPCQLE7O/aRFKZt2.YI552WJdLWImNl6FPZ4c76');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alerta`
--
ALTER TABLE `alerta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `contacto_emergencia`
--
ALTER TABLE `contacto_emergencia`
  ADD PRIMARY KEY (`id_contacto`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `descripcion`
--
ALTER TABLE `descripcion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sismo_id` (`sismo_id`);

--
-- Indices de la tabla `sismos`
--
ALTER TABLE `sismos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alerta`
--
ALTER TABLE `alerta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `contacto_emergencia`
--
ALTER TABLE `contacto_emergencia`
  MODIFY `id_contacto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `descripcion`
--
ALTER TABLE `descripcion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `sismos`
--
ALTER TABLE `sismos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=509;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alerta`
--
ALTER TABLE `alerta`
  ADD CONSTRAINT `alerta_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `contacto_emergencia`
--
ALTER TABLE `contacto_emergencia`
  ADD CONSTRAINT `contacto_emergencia_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
