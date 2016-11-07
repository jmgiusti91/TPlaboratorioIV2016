<?php
include_once '../vendor/autoload.php';
use \Firebase\JWT\JWT;
/**
 * IMPORTANT:
 * You must specify supported algorithms for your application. See
 * https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40
 * for a list of spec-compliant algorithms.
 */
$DatosDelModeloPorPost = file_get_contents('php://input');
$usuario = json_decode($DatosDelModeloPorPost);
if ($usuario->correo == "usuario" && $usuario->clave == "clave") {
	$key = "1234";
	$ClaveDeEncriptacion="estaeslaclave";
	$token["usuario"]="unusuario";
	$token["perfil"]="admin";
	$token["iat"]=time();
	$token["exp"]=time()+20;

	$token["username"] = "usuario";
	$token["tipoUsuario"] = "admin";

	$jwt = JWT::encode($token, $key);

	$ArrayConToken["MiTokenGeneradoEnPHP"] = $jwt;
} else {
	$ArrayConToken["MiTokenGeneradoEnPHP"] = false;
}

echo json_encode($ArrayConToken);


?>