<?php

include("dominio_permitido.php");
$dominioPermitido = $dp;
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: content-type");
header("Access-Control-Allow-Methods: OPTIONS,GET,PUT,POST,DELETE");

require("conexion.php");

$resultado = $conexion->query("select * from dosificaciones");
$arr = [];
while ($row = mysqli_fetch_assoc($resultado)) {
    $arr[] = [
        "nombre" => $row["tipo"],
        "id" => $row["id_dosificaciones"]
    ];
}


echo json_encode($arr);
