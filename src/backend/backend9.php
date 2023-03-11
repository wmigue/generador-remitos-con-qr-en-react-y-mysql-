<?php

include("dominio_permitido.php");
$dominioPermitido = $dp;
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: content-type");
header("Access-Control-Allow-Methods: OPTIONS,GET,PUT,POST,DELETE");

require("conexion.php");

$d = json_decode(file_get_contents('php://input'), true);
//print_r($d);
$request1 = $d[0]['cliente'];
$request2 = $d[0]['nombredeobra'];
$request3 = $d[0]['direcciondeobra'];
$request4 = $d[0]['distanciaobra'];
//echo json_encode(array("datos" => $request1));

$result = $conexion->prepare("select id_clientes from clientes where nombre = ? ") or die("error en base de datos" . $conexion->error);

$result->bind_param("s", $request1);

$result->execute();

$r = $result->get_result();

$assoc = $r->fetch_assoc();

$id_clientes = $assoc['id_clientes'];

$result = $conexion->prepare("insert into obras(id_clientes, nombre, direccion,distancia, activa) values('$id_clientes', '$request2', '$request3','$request4', 1) ") or die("error en base de datos" . $conexion->error);

$result->execute();


echo json_encode(array("datos" => $result));
