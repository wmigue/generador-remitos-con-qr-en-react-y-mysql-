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
//echo json_encode(array("datos" => $request1));

$result = $conexion->prepare("select id_clientes from clientes where nombre = ? ") or die("error en base de datos" . $conexion->error);

$result->bind_param("s", $request1);

$result->execute();

$r = $result->get_result();

$assoc = $r->fetch_assoc();

$id_clientes = $assoc['id_clientes'];

$result = $conexion->prepare("select * from obras where id_clientes = '$id_clientes' ") or die("error en base de datos" . $conexion->error);

$result->execute();

$r = $result->get_result();

$response = [];
while ($row = $r->fetch_assoc()) {
    $response[] = $row;
}


echo json_encode(array("datos" => $response)); 
