<?php
require_once"AccesoDatos.php";
class Local
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_local;
	public $direccion;
  	public $foto1;
  	public $foto2;
  	public $foto3;
  	public $lat;
  	public $lng;
  	public $id_encargado;
  	public $cant_empleados;
  	//public $codFoto;

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetIdLocal()
	{
		return $this->id_local;
	}
	public function GetDireccion()
	{
		return $this->direccion;
	}
	public function GetFoto1()
	{
		return $this->foto1;
	}
	public function GetFoto2()
	{
		return $this->foto2;
	}
	public function GetFoto3()
	{
		return $this->foto3;
	}
	public function GetLat()
	{
		return $this->lat;
	}
	public function GetLng()
	{
		return $this->lng;
	}
	public function GetIdEncargado()
	{
		return $this->lng;
	}
	public function GetCantEmpleados()
	{
		return $this->cant_empleados;
	}




	/*public function getCodFoto()
	{
		return $this->codFoto;
	}*/


	public function SetIdLocal($valor)
	{
		$this->id_local = $valor;
	}
	public function SetDireccion($valor)
	{
		$this->direccion = $valor;
	}
	public function SetFoto1($valor)
	{
		$this->foto1 = $valor;
	}
	public function SetFoto2($valor)
	{
		$this->foto2 = $valor;
	}
	public function SetFoto3($valor)
	{
		$this->foto3 = $valor;
	}
	public function SetLat($valor)
	{
		$this->lat = $valor;
	}
	public function SetLng($valor)
	{
		$this->lng = $valor;
	}
	public function SetIdEncargado($valor)
	{
		$this->id_encargado = $valor;
	}
	public function SetCantEmpleados($valor)
	{
		$this->cant_empleados = $valor;
	}

	/*public function SetCodFoto($valor)
	{
		$this->codFoto = $valor;
	}*/
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id_local=NULL)
	{
		if($id_local != NULL){
			$obj = Local::TraerUnLocal($id_local);
			
			$this->direccion = $obj->direccion;
			$this->foto1 = $obj->foto1;
			$this->foto2 = $obj->foto2;
			$this->foto3 = $obj->foto3;
			$this->lat = $obj->lat;
			$this->lng = $obj->lng;
			$this->id_encargado = $obj->id_encargado;
			$this->cant_empleados = $obj->cant_empleados;
			//$this->codFoto = $obj->codFoto;
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->direccion."-".$this->foto1."-".$this->foto2."-".$this->foto3."-".$this->lat."-".$this->lng."-".$this->id_encargado."-".$this->cant_empleados;
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnLocal($idParametro) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM locales WHERE id_local=:id");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnaPersona(:id)");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$localBuscado= $consulta->fetchObject('local');
		return $localBuscado;	
					
	}
	
	public static function TraerTodosLosLocales()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM locales ");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasPersonas() ");
		$consulta->execute();			
		$arrLocales= $consulta->fetchAll(PDO::FETCH_CLASS, "local");	
		return $arrLocales;
	}

	public static function TraerTodosLosLocalesActivos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM `locales` WHERE id_encargado IS NOT NULL AND cant_empleados >= 2 ");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasPersonas() ");
		$consulta->execute();			
		$arrLocales= $consulta->fetchAll(PDO::FETCH_CLASS, "local");	
		return $arrLocales;
	}
	
	public static function BorrarLocal($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM locales WHERE id_local=:id");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL BorrarPersona(:id)");	
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarLocal($local)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				UPDATE locales 
				SET direccion=:direccion,
				foto1=:foto1,
				foto2=:foto2,
				foto3=:foto3,
				lat=:lat,
				lng=:lng,
				id_encargado=:id_encargado,
				cant_empleados=:cant_empleados
				WHERE id_local=:id");
			//$consulta =$objetoAccesoDato->RetornarConsulta("CALL ModificarLocal(:id,:nombre,:direccion,:foto1,:foto2,:foto3)");
			$consulta->bindValue(':id',$local->id_local, PDO::PARAM_INT);
			$consulta->bindValue(':direccion', $local->direccion, PDO::PARAM_STR);
			$consulta->bindValue(':foto1', $local->foto1, PDO::PARAM_STR);
			$consulta->bindValue(':foto2', $local->foto2, PDO::PARAM_STR);
			$consulta->bindValue(':foto3', $local->foto3, PDO::PARAM_STR);
			$consulta->bindValue(':lat', $local->lat, PDO::PARAM_STR);
			$consulta->bindValue(':lng', $local->lng, PDO::PARAM_STR);
			$consulta->bindValue(':id_encargado', $local->id_encargado, PDO::PARAM_INT);
			$consulta->bindValue(':cant_empleados', $local->cant_empleados, PDO::PARAM_INT);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarLocal($local)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into locales (direccion,foto1,foto2,foto3,lat,lng,id_encargado,cant_empleados)values(:direccion,:foto1,:foto2,:foto3,:lat,:lng,:id_encargado,:cant_empleados)");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL InsertarLocal (:nombre,:direccion,:dni,:foto1,:foto2,:foto3,:codFoto)");
		$consulta->bindValue(':direccion', $local->direccion, PDO::PARAM_STR);
		$consulta->bindValue(':foto1', $local->foto1, PDO::PARAM_STR);
		$consulta->bindValue(':foto2', $local->foto2, PDO::PARAM_STR);
		$consulta->bindValue(':foto3', $local->foto3, PDO::PARAM_STR);
		$consulta->bindValue(':lat', $local->lat, PDO::PARAM_STR);
		$consulta->bindValue(':lng', $local->lng, PDO::PARAM_STR);
		$consulta->bindValue(':id_encargado', $local->id_encargado, PDO::PARAM_INT);
		$consulta->bindValue(':cant_empleados', $local->cant_empleados, PDO::PARAM_INT);
		//$consulta->bindValue(':codFoto', $local->codFoto, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	
//--------------------------------------------------------------------------------//


}
