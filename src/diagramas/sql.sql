create table dosificaciones(
    id_dosificaciones int primary key auto_increment,
    programa varchar(100),
    tipo varchar(100),
    codigo varchar(100)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

create table motohormigoneras(
    id_mh int primary key auto_increment,
    patente varchar(100),
    modelo varchar(100)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

create table choferes(
    id_choferes int primary key auto_increment,
    nombre varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci,
    apellido varchar(100)CHARACTER SET utf8 COLLATE utf8_spanish_ci,
    dni varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE `clientes` (
    `id_clientes` int primary key auto_increment,
    `nombre` varchar(80) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
    `cuit` varchar(11) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
    `direccion` varchar(200) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
    `tipo` varchar(60) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
    `email` varchar(300) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
    `telefono` varchar(15) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
    `financia` int(10) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

create table obras(
    id_obras int primary key auto_increment,
    id_clientes int not null,
    nombre varchar(100),
    direccion varchar(100),
    activa boolean,
    foreign key (id_clientes) references clientes(id_clientes) ON DELETE CASCADE ON UPDATE CASCADE ##### si elimino un clientes, se elimina tambien el registro relacionado en esta tabla, es decir en cascada.
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE `facturas` (
    `id_facturas` int primary key auto_increment,
    `nombre_clientes` varchar(300) NOT NULL,
    `fecha` varchar(15) NOT NULL,
    `numero` varchar(50) NOT NULL DEFAULT '0',
    `estado` varchar(20) NOT NULL,
    `importe` decimal(10, 2) NOT NULL,
    `pago` decimal(10, 2) NOT NULL,
    `saldo` decimal(10, 2) NOT NULL,
    `id_clientes` varchar(20) NOT NULL,
    `factura_tipo` varchar(200) NOT NULL,
    `fecha_pagado` date NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

create table remitos(
    id_remitos int primary key auto_increment,
    remito_json text,
    fecha date,
    cantidad decimal(10, 2),
    bombeo int not null,
    estado int not null DEFAULT 1,
    id_obras int not null,
    id_dosificaciones int not null,
    id_choferes int not null,
    id_mh int not null,
    foreign key (id_obras) references obras(id_obras) ON DELETE CASCADE ON UPDATE CASCADE,
    ##### si elimino una obras, se elimina tambien el registro relacionado en esta tabla, es decir en cascada. lo mismo con los updates.
    foreign key (id_dosificaciones) references dosificaciones(id_dosificaciones),
    foreign key (id_choferes) references choferes(id_choferes),
    foreign key (id_mh) references motohormigoneras(id_mh)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

create table remitos_facturas(
    id_r_f int primary key auto_increment,
    id_remitos int not null,
    id_facturas int not null,
    foreign key (id_facturas) references facturas(id_facturas) ON DELETE CASCADE ON UPDATE CASCADE,
    foreign key (id_remitos) references remitos(id_remitos)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE `log` (
  `id_log` int primary key auto_increment,
  `nombre` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `pass` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `role` varchar(20) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

#####################################################################################################################################################################################################################################################################################################################################################################################################


# empezar el conteo del id primario en uno luego de eliminar un registro.
alter TABLE remitos AUTO_INCREMENT=1

# generar reportes de varias tablas a partir de tabla remitos.
SELECT d.tipo, c.nombre, r.cantidad, r.id_dosificaciones, r.id_obras from remitos r, obras o, dosificaciones d, clientes c where d.id_dosificaciones = r.id_dosificaciones and o.id_obras = r.id_obras and c.id_clientes=o.id_clientes;




INSERT INTO `log` (`id_log`, `nombre`, `pass`, `role`) VALUES
(7, 'c', '3', 'admin'),
(9, 'c', '0', 'admin2');



insert into
    clientes(
        id_clientes,
        nombre,
        cuit,
        direccion,
        tipo,
        email,
        telefono,
        financia
    )
values
    (
        2,
        "migue",
        "20224866661",
        "brandsen 1235",
        "iva responsable inscripto",
        "migue@migue",
        "370444444",
        1
    );

insert into
    clientes(
        id_clientes,
        nombre,
        cuit,
        direccion,
        tipo,
        email,
        telefono,
        financia
    )
values
    (
        4,
        "mida",
        "20255546661",
        "bosch 15",
        "iva responsable inscripto",
        "mida@mida",
        "370555555",
        1
    );

INSERT INTO
    `obras` (`id_clientes`, `nombre`, `direccion`)
VALUES
    (4, 'mida obra 1', 'direccion obra mida 1'),
    (2, 'obra migue 1', 'direccion obra migue 1');

INSERT INTO
    `choferes` ( `nombre`, `apellido`, `dni`)
VALUES
    ( 'ARANDA', 'ARANDA', '1'),
    ( 'NUÑEZ', 'NUÑEZ', '1'),
    ( 'FERNANDO', 'CANTERO', '1'),
    ( 'PONCE', 'PONCE', '1');

INSERT INTO
    `motohormigoneras` (`id_mh`, `patente`, `modelo`)
VALUES
    (1, '1', 'FIAT IVECO 260E28-TECTOR ATTACK'),
    (2, '2', 'FIAT IVECO 260E28-TECTOR ATTACK'),
    (3, '3', 'FIAT IVECO 260E28-TECTOR ATTACK'),
    (4, '4', 'FIAT IVECO 260E28-TECTOR ATTACK'),
    (5, '5', 'FIAT IVECO 260E28-TECTOR ATTACK'),
    (6, '6', 'FIAT IVECO 260E28-TECTOR ATTACK');


insert into
    dosificaciones(id_dosificaciones, programa, tipo, codigo)
values
    (1, 1, "RDC120", "RDC120"),
    (2, 2, "RDC150", "RDC150"),
    (3, 3, "RDC180", "RDC180"),
    (4, 4, "MORT450", "MC500"),
    (5, 5, "H20CONT1", "HL1800"),
    (6, 6, "H40STD1", "H40C A10 P30"),
    (7, 7, "H40BOM1", "H40C A15 P20"),
    (8, 8, "H35PAVW", "H35W A7 P30"),
    (9, 9, "H35STD1", "H35C A10 P30"),
    (10, 10, "H35BOM1", "H35C A15 P20"),
    (11, 11, "H30PAVW", "H30W A7 P30"),
    (12, 12, "H30STD1", "H3OC A10 P30"),
    (13, 13, "H30BOM1", "H3OC A15 P20"),
    (14, 14, "H25PAVW", "H25C A7 P30"),
    (15, 15, "H25STD1", "H25C A10 P30"),
    (16, 16, "H25BOM1", "H25C A15 P20"),
    (17, 17, "H21PAW", "H21C A7 P30"),
    (18, 18, "H21STD1", "H21C A10 P30"),
    (19, 19, "H21BOM1", "H21C A15 P20"),
    (20, 20, "H21W", "H21W A15 P20"),
    (21, 21, "H17STD1", "H17C A10 P30"),
    (22, 22, "H17BOM1", "H17C A10 P30"),
    (23, 23, "H13STD1", "H13C A10 P30"),
    (24, 24, "H13BOM1", "H13C A15 P20"),
    (25, 25, "H8STD1", "H8C A10 P30"),
    (26, 26, "H8BOM1", "H8C A15 P20");

#####################################################################################################################################################################################################################################################################################################################################################################################################################################
drop database canavesio;

create database canavesio;

use canavesio;


    