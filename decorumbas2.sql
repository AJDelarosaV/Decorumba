-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-07-2023 a las 03:05:47
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `decorumbas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `id` int(10) NOT NULL,
  `nombre_item` varchar(50) NOT NULL,
  `cantidad` int(20) NOT NULL,
  `precio` int(11) NOT NULL,
  `imagenSrc` varchar(200) NOT NULL,
  `cod_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `telefono` varchar(13) NOT NULL,
  `email` varchar(50) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `cp` varchar(5) NOT NULL,
  `ciudad` varchar(50) NOT NULL,
  `fecha_creacion` date DEFAULT current_timestamp(),
  `autorizado` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `username`, `password`, `fullname`, `telefono`, `email`, `direccion`, `cp`, `ciudad`, `fecha_creacion`, `autorizado`) VALUES
(1, 'ANGEL', 'DE LA ROSA', '', '1169261250', 'ANGELALBERTO@GMAIL.COM', 'SAN LUIS 248 PILAR', '1629', 'BUENOS AIRES', NULL, 1),
(2, 'VALENTINA', 'DE LA ROSA', '', '1125454237', 'VALENTINADELAROSA@GMAIL.COM', 'SAN LUIS 248 PILAR', '1629', 'BUENOS AIRES', NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `cod` int(5) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `precio` int(10) NOT NULL,
  `stock` int(10) NOT NULL,
  `src` varchar(200) NOT NULL,
  `categoria` varchar(10) NOT NULL,
  `marca` varchar(10) NOT NULL,
  `tamanio` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`cod`, `nombre`, `descripcion`, `precio`, `stock`, `src`, `categoria`, `marca`, `tamanio`) VALUES
(1, 'PIÑATA SPIDERMAN', 'PIÑATA SPIDERMAN  4 AÑOS', 4500, 10, 'static\\img\\pinatas\\pinata-1.jpg', 'Piñatas', 'Decorumba', '50cm'),
(2, 'PIÑATA PEPA PIGS', 'PIÑATA PEPA PIG', 7500, 15, 'static\\img\\pinatas\\pinata-3.jpg', 'Piñatas', 'Decorumba', '70CM'),
(3, 'PIÑATA ROBLOX', 'PIÑATA ROBLOX', 4500, 9, '../static/img/pinatas/pinata-6.jpg', 'Piñatas', 'Decorumba', '50cm'),
(4, 'PIÑATA OSO PANDA', 'PIÑATA OSO PANDA', 4500, 10, '../static/img/pinatas/pinata-7.jpg', 'Piñatas', 'Decorumba', '50cm'),
(5, 'PIÑATA COPA DEL MUND', 'PIÑATA COPA DEL MUNDO', 4500, 8, '../static/img/pinatas/pinata-8.jpg', 'Piñatas', 'Decorumba', '50cm'),
(10, 'PIÑATA SPIDERMAN', 'PIÑATA SPIDERMAN  4 AÑOS', 4500, 9, '../static/img/pinatas/pinata-10.jpg', 'Piñatas', 'Decorumba', '50cm'),
(12, 'PIÑATA BOBO ESPONJA', 'PIÑATA BOB ESPONJA', 4500, 10, '../static/img/pinatas/pinata-12.jpg', 'Piñatas', 'Decorumba', '50cm'),
(13, 'PIÑATA TOY STORY WOO', 'PIÑATA TOY STORY WOODY', 4500, 10, '../static/img/pinatas/pinata-13.jpg', 'Piñatas', 'Decorumba', '50cm'),
(14, 'PIÑATA DRAGON BALL 7', 'PIÑATA DRAGON BALL', 7500, 10, '../static/img/pinatas/pinata-14.jpg', 'Piñatas', 'Decorumba', '70cm'),
(15, 'PIÑATA MARIPOSA', 'PIÑATA MARIPOSA', 4500, 10, 'static/img/pinatas/2023094341pinata-15.jpg', 'Piñatas', 'Decorumba', '50cm'),
(41, 'PIÑATA SIRENITA', 'PIÑATA SIRENITA', 4500, 10, 'static/img/pinatas/2023093759pinata-41.jpg', 'Piñatas', 'Decorumba', '50cm'),
(44, 'PIÑATA AMOG US', 'PIÑATA AMONG US', 4500, 9, 'static/img/pinatas/2023091506pinata-44.jpg', 'Piñatas', 'Decorumba', '50cm');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `cp` varchar(5) NOT NULL,
  `ciudad` varchar(50) NOT NULL,
  `fecha_creacion` date DEFAULT current_timestamp(),
  `autorizado` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `username`, `password`, `fullname`, `telefono`, `email`, `direccion`, `cp`, `ciudad`, `fecha_creacion`, `autorizado`) VALUES
(1, 'Angva2409', 'Angva.2409', 'Adalberto', 'De La Rosa', 'delarosa.adalberto@gmail.com', '', '', '2023-06-14', NULL, 1),
(13, 'dddddd', 'dddddd', 'dddddd', 'dddddd', 's@s.s', '', '', '0000-00-00', NULL, 0),
(14, 'Angel2112', '123456', 'Angel De La Rosa', '111111111133', 's@f.v', 'URB PARQUE RESIDENCIAL FLOR AMARILLO AV PRINCIPAL ORINOCO SECTOR H, CASA 94-41', '1629', 'VALENCIA', '2023-06-28', 0),
(15, 'Valentina24', '123456', 'Valentina De La Rosa', '33333388', 's@s.sde', 'URB PARQUE RESIDENCIAL FLOR AMARILLO AV PRINCIPAL ORINOCO SECTOR H, CASA 94-41', '1629', 'Buenos Aires', '2023-06-28', 1),
(16, 'ariel1234', '123456', 'ariel', '33333333333444', 's@s.seee', 'bkjhddd', '33333', 'Buenos Aires', '2023-07-03', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `venta_id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `monto` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cliente`),
  ADD UNIQUE KEY `UK_Valores` (`username`,`telefono`,`email`) USING BTREE;

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`cod`),
  ADD UNIQUE KEY `cod` (`cod`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `UK_Valores` (`username`,`telefono`,`email`) USING BTREE;

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`venta_id`),
  ADD KEY `cliente_id` (`cliente_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `venta_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`autorizado`) REFERENCES `paises` (`pais_id`);

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id_cliente`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
