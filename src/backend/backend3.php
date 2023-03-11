<?php

include("dominio_permitido.php");
$dominioPermitido = $dp;
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: content-type");
header("Access-Control-Allow-Methods: OPTIONS,GET,PUT,POST,DELETE");

require("conexion.php");

$resultado = $conexion->query("select * from choferes");
$arr = [];
while ($row = mysqli_fetch_assoc($resultado)) {
    $arr[] = [
        "nombre" => $row["nombre"],
        "apellido" => $row["apellido"],
        "id" => $row["id_choferes"]
    ];
}

echo json_encode($arr);


?>