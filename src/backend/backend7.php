<?php

include("dominio_permitido.php");
header("Access-Control-Allow-Origin: $dp"); //allow access from this url only
header("Access-Control-Allow-Methods: POST"); //GET, POST, PUT allow this ones
header("Access-Control-Allow-Headers: content-type"); //I DONT KNOW THAT DOES THIS
//header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require("conexion.php");
// Get the JSON contents
$json = file_get_contents('php://input');
// decode the json data
$data = json_decode($json, true); //true convert std_object to php_array
//print_r($data);

$fecha = $data['fecha'];
$obra = $data['json_data']['obra']['id'];
$cliente = $data['json_data']['cliente'];
$mh = $data['json_data']['mh']['id'];
$bomba = $data['json_data']['dosificacion']['bomba'];
$dosificacion = $data['json_data']['dosificacion']['id'];
$cantidad = $data['json_data']['dosificacion']['m3'];
$chofer = $data['json_data']['chofer']['id'];

$fecha = addslashes($fecha);
$data= json_decode($json);



//if delete any row in db, id begin in max(id+1)
//$conexion->query("ALTER TABLE remitos AUTO_INCREMENT = 1"); 

$result = $conexion->prepare("insert into remitos(remito_json, fecha, cantidad, bombeo, id_obras, id_dosificaciones, id_choferes, id_mh) values(?, ?, ?, ?, ?, ?, ?, ?)") or die("error en base de datos" . $conexion->error);

// i 	corresponding variable has type integer
// d 	corresponding variable has type double
// s 	corresponding variable has type string
// b 	corresponding variable is a blob and will be sent in packets
$result->bind_param("ssdsiiii", $json, $fecha, $cantidad, $bomba, $obra, $dosificacion, $chofer, $mh);


$result->execute();

$r = $result->get_result();

$conexion->close();

echo json_encode($r); 

/* echo json_encode(array(
    "fecha"=>$fecha,
    "cliente"=>$cliente
)); */
