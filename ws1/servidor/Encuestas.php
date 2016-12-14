<?php
require_once"AccesoDatos.php";
class Encuesta
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_encuesta;
	public $calidadProducto;
	public $calidadAtencion;
	public $velocidadAtencion;
	public $cordialidadAtencion;
	public $opinionLocal;
	public $higieneLocal;
	public $instalacionesLocal;
	public $seguridadLocal;
	public $comodidadLocal;
	public $costoServicio;
	public $calidadAplicacionWeb;
	public $velocidadAplicacionWeb;
	public $reservasOnline;
	public $servicioTelefonico;
	public $producto;
	public $atencion;
	public $local;
	public $web;
	public $comentario;
	public $id_cliente;
	public $id_producto;

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id_encuesta=NULL)
	{
		if($id_encuesta != NULL){
			$obj = Encuesta::TraerUnaEncuesta($id_encuesta);
			
			$this->calidadProducto = $obj->calidadProducto;
			$this->calidadAtencion = $obj->calidadAtencion;
			$this->velocidadAtencion = $obj->velocidadAtencion;
			$this->cordialidadAtencion = $obj->cordialidadAtencion;

			$this->opinionLocal = $obj->opinionLocal;
			$this->higieneLocal = $obj->higieneLocal;
			$this->instalacionesLocal = $obj->instalacionesLocal;
			$this->seguridadLocal = $obj->seguridadLocal;

			$this->comodidadLocal = $obj->comodidadLocal;
			$this->costoServicio = $obj->costoServicio;
			$this->calidadAplicacionWeb = $obj->calidadAplicacionWeb;
			$this->velocidadAplicacionWeb = $obj->velocidadAplicacionWeb;

			$this->reservasOnline = $obj->reservasOnline;
			$this->servicioTelefonico = $obj->servicioTelefonico;
			$this->producto = $obj->producto;
			$this->atencion = $obj->atencion;

			$this->local = $obj->local;
			$this->web = $obj->web;
			$this->comentario = $obj->comentario;
			$this->id_cliente = $obj->id_cliente;
			$this->id_producto = $obj->id_producto;
		}
	}

//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnaEncuesta($idParametro) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM encuestas WHERE id_encuesta=:id");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnaPersona(:id)");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$encuestaBuscada= $consulta->fetchObject('encuesta');
		return $encuestaBuscada;	
					
	}
	
	public static function TraerTodasLasEncuestas()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM encuestas ");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasPersonas() ");
		$consulta->execute();			
		$arrEncuestas= $consulta->fetchAll(PDO::FETCH_CLASS, "encuesta");	
		return $arrEncuestas;
	}

//--------------------------------------------------------------------------------//

	public static function InsertarEncuesta($encuesta)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO encuestas(calidadProducto, calidadAtencion, velocidadAtencion, cordialidadAtencion, opinionLocal, higieneLocal, instalacionesLocal, seguridadLocal, comodidadLocal, costoServicio, calidadAplicacionWeb, velocidadAplicacionWeb, reservasOnline, servicioTelefonico, producto, atencion, local, web, comentario, id_cliente, id_producto) VALUES (:calidadProducto, :calidadAtencion, :velocidadAtencion, :cordialidadAtencion, :opinionLocal, :higieneLocal, :instalacionesLocal, :seguridadLocal, :comodidadLocal, :costoServicio, :calidadAplicacionWeb, :velocidadAplicacionWeb, :reservasOnline, :servicioTelefonico, :producto, :atencion, :local, :web, :comentario, :id_cliente, :id_producto)");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL InsertarLocal (:nombre,:descripcion,:dni,:nombre,:precio,:id_local,:codFoto)");
		$consulta->bindValue(':calidadProducto', $encuesta->calidadProducto, PDO::PARAM_STR);
		$consulta->bindValue(':calidadAtencion', $encuesta->calidadAtencion, PDO::PARAM_STR);
		$consulta->bindValue(':velocidadAtencion', $encuesta->velocidadAtencion, PDO::PARAM_STR);
		$consulta->bindValue(':cordialidadAtencion', $encuesta->cordialidadAtencion, PDO::PARAM_STR);

		$consulta->bindValue(':opinionLocal', $encuesta->opinionLocal, PDO::PARAM_STR);
		$consulta->bindValue(':higieneLocal', $encuesta->higieneLocal, PDO::PARAM_STR);
		$consulta->bindValue(':instalacionesLocal', $encuesta->instalacionesLocal, PDO::PARAM_STR);
		$consulta->bindValue(':seguridadLocal', $encuesta->seguridadLocal, PDO::PARAM_STR);

		$consulta->bindValue(':comodidadLocal', $encuesta->comodidadLocal, PDO::PARAM_STR);
		$consulta->bindValue(':costoServicio', $encuesta->costoServicio, PDO::PARAM_STR);
		$consulta->bindValue(':calidadAplicacionWeb', $encuesta->calidadAplicacionWeb, PDO::PARAM_STR);
		$consulta->bindValue(':velocidadAplicacionWeb', $encuesta->velocidadAplicacionWeb, PDO::PARAM_STR);

		$consulta->bindValue(':reservasOnline', $encuesta->reservasOnline, PDO::PARAM_STR);
		$consulta->bindValue(':servicioTelefonico', $encuesta->servicioTelefonico, PDO::PARAM_STR);
		$consulta->bindValue(':producto', $encuesta->producto, PDO::PARAM_STR);
		$consulta->bindValue(':atencion', $encuesta->atencion, PDO::PARAM_STR);

		$consulta->bindValue(':local', $encuesta->local, PDO::PARAM_STR);
		$consulta->bindValue(':web', $encuesta->web, PDO::PARAM_STR);
		$consulta->bindValue(':comentario', $encuesta->comentario, PDO::PARAM_STR);
		$consulta->bindValue(':id_cliente', $encuesta->id_cliente, PDO::PARAM_STR);
		$consulta->bindValue(':id_producto', $encuesta->id_producto, PDO::PARAM_STR);

		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	
//--------------------------------------------------------------------------------//


}
