<?php
require_once"AccesoDatos.php";
class Empleado
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_empleado;
	public $nombre;
  	public $email;
  	public $clave;
  	public $tipo;
  	public $habilitado;
  	public $id_local;
  	//public $codFoto;

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetIdEmpleado()
	{
		return $this->id_empleado;
	}
	public function GetNombre()
	{
		return $this->nombre;
	}
	public function GetEmail()
	{
		return $this->email;
	}
	public function GetClave()
	{
		return $this->clave;
	}
	public function GetTipo()
	{
		return $this->tipo;
	}
	public function GetHabilitado()
	{
		return $this->habilitado;
	}
	public function GetIdLocal()
	{
		return $this->id_local;
	}

	/*public function getCodFoto()
	{
		return $this->codFoto;
	}*/


	public function SetIdEmpleado($valor)
	{
		$this->id_empleado = $valor;
	}
	public function SetNombre($valor)
	{
		$this->nombre = $valor;
	}
	public function SetEmail($valor)
	{
		$this->email = $valor;
	}
	public function SetClave($valor)
	{
		$this->clave = $valor;
	}
	public function SetTipo($valor)
	{
		$this->tipo = $valor;
	}
	public function SetHabilitado($valor)
	{
		$this->habilitado = $valor;
	}
	public function SetIdLocal($valor)
	{
		$this->id_local = $valor;
	}

	/*public function SetCodFoto($valor)
	{
		$this->codFoto = $valor;
	}*/
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id_empleado=NULL)
	{
		if($id_empleado != NULL){
			$obj = Empleado::TraerUnEmpleado($id_empleado);
			
			$this->nombre = $obj->nombre;
			$this->email = $obj->email;
			$this->clave = $obj->clave;
			$this->tipo = $obj->tipo;
			$this->habilitado = $obj->habilitado;
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->nombre."-".$this->email."-".$this->clave."-".$this->tipo."-".$this->habilitado;
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnEmpleado($idParametro) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM empleados WHERE id_empleado=:id");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnaPersona(:id)");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$empleadoBuscado= $consulta->fetchObject('empleado');
		return $empleadoBuscado;	
					
	}
	
	public static function TraerTodosLosEmpleados()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM empleados ");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasPersonas() ");
		$consulta->execute();			
		$arrEmpleados= $consulta->fetchAll(PDO::FETCH_CLASS, "empleado");	
		return $arrEmpleados;
	}

	public static function TraerTodosLosEmpleadosYEncargados()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM `empleados` WHERE tipo = 'empleado' OR tipo = 'encargado' ");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasPersonas() ");
		$consulta->execute();			
		$arrEmpleados= $consulta->fetchAll(PDO::FETCH_CLASS, "empleado");	
		return $arrEmpleados;
	}

	public static function AutenticarEmpleado($mailEmpleado, $claveEmpleado)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM empleados WHERE email=:email AND clave=:clave");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasPersonas() ");
		$consulta->bindValue(':email', $mailEmpleado, PDO::PARAM_STR);
		$consulta->bindValue(':clave', $claveEmpleado, PDO::PARAM_STR);
		$consulta->execute();			
		$empleadoBuscado= $consulta->fetchObject('empleado');
		return $empleadoBuscado;	
	}
	
	public static function BorrarEmpleado($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM empleados WHERE id_empleado=:id");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL BorrarPersona(:id)");	
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarEmpleado($empleado)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				UPDATE empleados 
				SET nombre=:nombre,
				email=:email,
				clave=:clave,
				tipo=:tipo,
				habilitado=:habilitado,
				id_local=:id_local
				WHERE id_empleado=:id");
			//$consulta =$objetoAccesoDato->RetornarConsulta("CALL ModificarEmpleado(:id,:nombre,:nombre,:email,:clave,:tipo)");
			$consulta->bindValue(':id',$empleado->id_empleado, PDO::PARAM_INT);
			$consulta->bindValue(':nombre', $empleado->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':email', $empleado->email, PDO::PARAM_STR);
			$consulta->bindValue(':clave', $empleado->clave, PDO::PARAM_STR);
			$consulta->bindValue(':tipo', $empleado->tipo, PDO::PARAM_STR);
			$consulta->bindValue(':habilitado',$empleado->habilitado, PDO::PARAM_INT);
			$consulta->bindValue(':id_local',$empleado->id_local, PDO::PARAM_INT);
			return $consulta->execute();
	}


	public static function HabilitarEmpleado($idEmpleado, $habilitado)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				UPDATE empleados 
				SET habilitado=:habilitado
				WHERE id_empleado=:id");
			//$consulta =$objetoAccesoDato->RetornarConsulta("CALL ModificarEmpleado(:id,:nombre,:nombre,:email,:clave,:tipo)");
			$consulta->bindValue(':id',$idEmpleado, PDO::PARAM_INT);
			$consulta->bindValue(':habilitado',$habilitado, PDO::PARAM_INT);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarEmpleado($empleado)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into empleados (nombre,email,clave,tipo,habilitado,id_local)values(:nombre,:email,:clave,:tipo,:habilitado,:id_local)");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL Insertarempleado (:nombre,:nombre,:dni,:email,:clave,:tipo,:codFoto)");
		$consulta->bindValue(':nombre', $empleado->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':email', $empleado->email, PDO::PARAM_STR);
		$consulta->bindValue(':clave', $empleado->clave, PDO::PARAM_STR);
		$consulta->bindValue(':tipo', $empleado->tipo, PDO::PARAM_STR);
		$consulta->bindValue(':habilitado',$empleado->habilitado, PDO::PARAM_INT);
		$consulta->bindValue(':id_local',$empleado->id_local, PDO::PARAM_INT);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	
//--------------------------------------------------------------------------------//


}
