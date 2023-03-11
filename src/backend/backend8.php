<?php
include("dominio_permitido.php");
$dominioPermitido = $dp;
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: content-type");
header("Access-Control-Allow-Methods: OPTIONS,GET,PUT,POST,DELETE");

require("conexion.php");

$result = $conexion->prepare("select max(id_remitos) + 1 as dato from remitos ") or die("error en base de datos" . $conexion->error);

$result->execute();

$r = $result->get_result();

$response;
while ($row = $r->fetch_assoc()) {
    $response = $row['dato'];
}

echo json_encode($response);

?>