<?php

include_once('database.php');

$conexion = DataBase::connect();

$pdo = $conexion->prepare("SELECT * FROM personas");
$pdo->execute();
$arrayPersonas=[];
while($row = $pdo->fetch(PDO::FETCH_ASSOC)){
  $arrayPersonas[]=$row;
}
echo json_encode($arrayPersonas);

?>