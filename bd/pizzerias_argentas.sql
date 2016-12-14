-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-12-2016 a las 14:35:58
-- Versión del servidor: 10.1.10-MariaDB
-- Versión de PHP: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pizzerias_argentas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `clave` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `telefono` int(11) NOT NULL,
  `habilitado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `nombre`, `email`, `clave`, `telefono`, `habilitado`) VALUES
(1, 'Jacinto', 'cliente1@cliente1.com', '1234', 42228888, 1),
(2, 'Jaime', 'cliente2@cliente2.com', '1234', 43005566, 1),
(3, 'Lorena', 'cliente3@cliente3.com', '1234', 43356677, 1),
(5, 'Maria la del barrio', 'cliente4@cliente4.com', '1234', 42228888, 1),
(8, 'Ximena', 'cliente5@cliente5.com', '1234', 42223356, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id_empleado` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `tipo` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `clave` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `habilitado` tinyint(1) NOT NULL,
  `id_local` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id_empleado`, `nombre`, `tipo`, `email`, `clave`, `habilitado`, `id_local`) VALUES
(1, 'nombreAdmin', 'administrador', 'administrador1@administrador1.com', '1234', 1, NULL),
(2, 'Juan', 'encargado', 'juan@pizzeriasargenta.com', '1234', 1, 3),
(5, 'Pedro', 'empleado', 'pedro@pizzeriasargenta.com', '1234', 1, 3),
(6, 'Maria', 'empleado', 'Maria@pizzeriasargenta.com', '1234', 1, 3),
(8, 'Luisa', 'encargado', 'luisa@pizzeriasargenta.com', '1234', 1, 8),
(12, 'Esteban', 'empleado', 'esteban@pizzeriasargenta.com', '1234', 1, 8),
(13, 'Miguel', 'empleado', 'miguel@pizzeriasargenta.com', '1234', 1, 8),
(20, 'Karina', 'empleado', 'karina@pizzeriasargenta.com', '1234', 1, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuestas`
--

CREATE TABLE `encuestas` (
  `id_encuesta` int(11) NOT NULL,
  `calidadProducto` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `calidadAtencion` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `velocidadAtencion` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `cordialidadAtencion` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `opinionLocal` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `higieneLocal` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `instalacionesLocal` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `seguridadLocal` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `comodidadLocal` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `costoServicio` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `calidadAplicacionWeb` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `velocidadAplicacionWeb` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `reservasOnline` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `servicioTelefonico` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `producto` tinyint(4) NOT NULL,
  `atencion` tinyint(4) NOT NULL,
  `local` tinyint(4) NOT NULL,
  `web` tinyint(4) NOT NULL,
  `comentario` varchar(160) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `encuestas`
--

INSERT INTO `encuestas` (`id_encuesta`, `calidadProducto`, `calidadAtencion`, `velocidadAtencion`, `cordialidadAtencion`, `opinionLocal`, `higieneLocal`, `instalacionesLocal`, `seguridadLocal`, `comodidadLocal`, `costoServicio`, `calidadAplicacionWeb`, `velocidadAplicacionWeb`, `reservasOnline`, `servicioTelefonico`, `producto`, `atencion`, `local`, `web`, `comentario`, `id_cliente`, `id_producto`) VALUES
(1, '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', 0, 1, 0, 0, 'Sin Comentario', 1, 3),
(2, '3', '1', '2', '2', '0', '1', '2', '2', '2', '1', '0', '3', '3', '3', 1, 0, 0, 1, 'Sin Comentario', 1, 3),
(3, '2', '3', '1', '3', '2', '1', '1', '2', '1', '0', '1', '4', '2', '1', 1, 0, 0, 1, 'Sin Comentario', 1, 3),
(4, '3', '1', '2', '2', '3', '1', '2', '3', '3', '0', '0', '3', '1', '1', 1, 1, 1, 1, 'Sin Comentario', 1, 3),
(5, '2', '3', '1', '3', '2', '2', '0', '0', '0', '2', '1', '3', '2', '3', 1, 1, 1, 1, 'Sin Comentario', 1, 3),
(6, '3', '2', '3', '2', '2', '1', '0', '0', '0', '2', '3', '3', '4', '3', 0, 1, 0, 0, 'Este es mi comentario Final', 1, 3),
(7, '3', '2', '4', '2', '3', '1', '2', '3', '2', '0', '0', '2', '3', '0', 0, 0, 0, 0, 'Otro comentario final', 1, 1),
(8, '2', '4', '3', '2', '3', '1', '1', '0', '0', '0', '3', '4', '3', '3', 0, 0, 0, 0, 'Sin Comentario', 1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `locales`
--

CREATE TABLE `locales` (
  `id_local` int(11) NOT NULL,
  `direccion` varchar(200) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `foto1` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `foto2` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `foto3` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `lat` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `lng` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `id_encargado` int(11) DEFAULT NULL,
  `cant_empleados` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `locales`
--

INSERT INTO `locales` (`id_local`, `direccion`, `foto1`, `foto2`, `foto3`, `lat`, `lng`, `id_encargado`, `cant_empleados`) VALUES
(3, 'Av. Asamblea 1132, Cdad. Autónoma de Buenos Aires, Argentina', 'locales-peritomorenoycorrientes-imagen1_Gcjq.jpg', 'locales.jpg', 'SarkPpal.jpg', '-34.6358445', '-58.44089610000003', 2, 2),
(8, 'Bolívar 1700, Cdad. Autónoma de Buenos Aires, Argentina', 'otro-local.jpg', 'locales-peritomorenoycorrientes-imagen1_Gcjq.jpg', 'nombre-menos-largo.jpg', '-34.62818499999999', '-58.37233509999999', 8, 2),
(9, 'Av. Hipólito Yrigoyen 476, C1086AAF CABA, Argentina', 'locales_cheeky.jpg', '128699.jpg', 'un-local.jpg', '-34.60896239999999', '-58.37256120000001', NULL, 1),
(10, 'Av. Bartolomé Mitre 650, B1870AAT Gran Buenos Aires, Cdad. Autónoma de Buenos Aires, Argentina', 'SarkPpal.jpg', '128699.jpg', 'otro-local.jpg', '-34.66157199999999', '-58.36579900000004', NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `precio` double NOT NULL,
  `foto1` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `foto2` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `foto3` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `tipo` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `descripcion` varchar(150) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `id_local` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `nombre`, `precio`, `foto1`, `foto2`, `foto3`, `tipo`, `descripcion`, `id_local`) VALUES
(1, 'Pizza Napolitana', 150, 'Pizza-1.jpg', 'Pizza-11.jpg', 'pizza-pepperoni-w857h456.jpg', 'pizzas', 'Pizza con rodajas finas de tomate y aceitunas negras.', 3),
(2, 'Pizza Con Jamon y Morrones', 120, 'pizza-pepperoni-w857h456.jpg', 'pizzas-hawaiana-2x.jpg', 'una-pizza.jpg', 'pizzas', 'Pizza con rodajas finas de tomate y aceitunas negras.', 3),
(3, 'Pizza solaaaaaaa', 123, 'Pizza-1.jpg', 'product_543ee455d3102.jpg', 'Pizza-11.jpg', 'pizzas', 'Pizza con rodajas finas de tomate y aceitunas negras.', 3),
(5, 'Picada para 2', 234, '20150826_0024 Italiana.jpg', 'picadas.jpg', 'picadas_2.jpg', 'picadas', 'Picada nueva', 8),
(6, 'Panqueques con dulce de leche', 227, '59dcd0e53bcd9be7b558aa4318eacb9d.jpg', '2293-878143-Tarta_de_Frutas_del_Bosque.jpg', 'cheescake.jpg', 'postres', 'Panqueques estilo frances', 8),
(7, 'Cheescake', 211, 'cheescake.jpg', 'postre_de_merengue_philadelphia_198258_B01.jpg', '59dcd0e53bcd9be7b558aa4318eacb9d.jpg', 'postres', 'Para Deleitarse!!', 8),
(8, 'pizza argenta', 243, 'una-pizza.jpg', 'product_543ee455d3102.jpg', 'pizzas-hawaiana-2x.jpg', 'pizzas', 'pizza con panceta, extra grasosa', 8),
(9, 'Picada Paladini', 357, 'picada-corazon-2da.jpg', 'picadas.jpg', 'picadas_2.jpg', 'picadas', 'una descripcion', 8),
(10, 'Harry Postre', 232, 'alfi.jpg', 'postres-faciles-2-600x899.jpg', 'Tarta-de-oreo-11.jpg', 'postres', 'Descripcionnnn', 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id_cliente` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `fechaReserva` date NOT NULL,
  `estado` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id_cliente`, `id_producto`, `fechaReserva`, `estado`) VALUES
(1, 1, '2016-11-24', 'calificado'),
(3, 2, '2016-11-27', 'cancelado'),
(1, 3, '2016-11-28', 'calificado'),
(5, 6, '2016-12-13', 'activo');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cliente`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id_empleado`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `encuestas`
--
ALTER TABLE `encuestas`
  ADD PRIMARY KEY (`id_encuesta`);

--
-- Indices de la tabla `locales`
--
ALTER TABLE `locales`
  ADD PRIMARY KEY (`id_local`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id_empleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT de la tabla `encuestas`
--
ALTER TABLE `encuestas`
  MODIFY `id_encuesta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `locales`
--
ALTER TABLE `locales`
  MODIFY `id_local` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
