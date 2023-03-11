<?php

include("dominio_permitido.php");
$dominioPermitido = $dp;
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: content-type");
header("Access-Control-Allow-Methods: OPTIONS,GET,PUT,POST,DELETE");

require("conexion.php");

$resultado = $conexion->query("select * from clientes");
$arr=[];
while($row=mysqli_fetch_assoc($resultado)){
    $arr[]=[
        "nombre"=>$row["nombre"],
        "id"=>$row["id_clientes"]
    ];
}


echo json_encode($arr);
