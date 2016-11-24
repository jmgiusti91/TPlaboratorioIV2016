<?php
include_once '../vendor/autoload.php';
include_once('../../../servidor/Clientes.php');
include_once('../../../servidor/Empleados.php');
use \Firebase\JWT\JWT;
/**
 * IMPORTANT:
 * You must specify supported algorithms for your application. See
 * https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40
 * for a list of spec-compliant algorithms.
 */
$DatosDelModeloPorPost = file_get_contents('php://input');
$usuario = json_decode($DatosDelModeloPorPost);

$clienteActual = Cliente::AutenticarCliente($usuario->email, $usuario->clave);

if (!is_null($clienteActual) && !empty($clienteActual) && $clienteActual->habilitado == 1) {
	$key = "aaaa";
	$ClaveDeEncriptacion="estaeslaclave";
	$token["nombre"]=$clienteActual->nombre;
	$token["tipo"]="cliente";
	$token["email"] = $clienteActual->email;
	$token["telefono"] = $clienteActual->telefono;
	$token["habilitado"] = $clienteActual->habilitado;
	$token["id"] = $clienteActual->id_cliente;
	$token["iat"]=time();
	$token["exp"]=time()+20;

	$jwt = JWT::encode($token, $key);

	$ArrayConToken["MiTokenGeneradoEnPHP"] = $jwt;
} else {

	$empleadoActual = Empleado::AutenticarEmpleado($usuario->email, $usuario->clave);

	if (!is_null($empleadoActual) && $empleadoActual->habilitado == 1) {
		$key = "aaaa";
		$ClaveDeEncriptacion="estaeslaclave";
		$token["nombre"]=$empleadoActual->nombre;
		$token["tipo"]=$empleadoActual->tipo;
		$token["email"] = $empleadoActual->email;
		$token["habilitado"] = $empleadoActual->habilitado;
		$token["id"] = $empleadoActual->id_empleado;
		$token["iat"]=time();
		$token["exp"]=time()+20;

		$jwt = JWT::encode($token, $key);

		$ArrayConToken["MiTokenGeneradoEnPHP"] = $jwt;
	} else {

		$ArrayConToken["MiTokenGeneradoEnPHP"] = false;

	}
	
}

echo json_encode($ArrayConToken);


?>