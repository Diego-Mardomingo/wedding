<?php

include_once('database.php');

$conexion = DataBase::connect();

$nombre = $_POST['nombre'];
$apellidos = $_POST['apellidos'];
$edad = $_POST['edad'];
$menu = $_POST['menu'];
$asistencia = $_POST['asistencia'];
$dormir = $_POST['dormir'];

$params=[':nombre'=>$nombre,':apellidos'=>$apellidos,':edad'=>$edad,':menu'=>$menu,':asistencia'=>$asistencia,':dormir'=>$dormir];
$pdo = $conexion->prepare("INSERT INTO personas VALUES(:nombre,:apellidos,:edad,:menu,:asistencia,:dormir)");
$pdo->execute($params);
echo json_encode($pdo->rowCount());

?>