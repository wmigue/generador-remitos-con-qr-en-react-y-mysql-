<?php

include("dominio_permitido.php");
$dominioPermitido = $dp;
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: content-type");
header("Access-Control-Allow-Methods: OPTIONS,GET,PUT,POST,DELETE");

require("conexion.php");

$d = json_decode(file_get_contents('php://input'));
$request1 = $d->dato;


$result = $conexion->prepare("select * from clientes where nombre = ? ") or die("error en base de datos" . $conexion->error);

$result->bind_param("s", $request1);

$result->execute();

$r = $result->get_result();

$response = [];
while ($row = $r->fetch_assoc()) {
    $response[] = $row;
}

echo json_encode($response);

?>