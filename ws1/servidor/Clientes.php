<?php
require_once"AccesoDatos.php";
class Cliente
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_cliente;
	public $nombre;
  	public $email;
  	public $clave;
  	public $telefono;
  	public $habilitado;
  	//public $codFoto;

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetIdCliente()
	{
		return $this->id_cliente;
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
	public function GetTelefono()
	{
		return $this->telefono;
	}
	public function GetHabilitado()
	{
		return $this->habilitado;
	}

	/*public function getCodFoto()
	{
		return $this->codFoto;
	}*/


	public function SetIdCliente($valor)
	{
		$this->id_cliente = $valor;
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
	public function SetTelefono($valor)
	{
		$this->telefono = $valor;
	}
	public function SetHabilitado($valor)
	{
		$this->habilitado = $valor;
	}

	/*public function SetCodFoto($valor)
	{
		$this->codFoto = $valor;
	}*/
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id_cliente=NULL)
	{
		if($id_cliente != NULL){
			$obj = Cliente::TraerUnCliente($id_cliente);
			
			$this->nombre = $obj->nombre;
			$this->email = $obj->email;
			$this->clave = $obj->clave;
			$this->telefono = $obj->telefono;
			$this->habilitado = $obj->habilitado;
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->nombre."-".$this->email."-".$this->clave."-".$this->telefono."-".$this->habilitado;
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnCliente($idParametro) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM clientes WHERE id_cliente=:id");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnaPersona(:id)");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$clienteBuscado= $consulta->fetchObject('cliente');
		return $clienteBuscado;	
					
	}
	
	public static function TraerTodosLosClientes()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM clientes ");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasPersonas() ");
		$consulta->execute();			
		$arrClientes= $consulta->fetchAll(PDO::FETCH_CLASS, "cliente");	
		return $arrClientes;
	}


	public static function AutenticarCliente($mailCliente, $claveCliente)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM clientes WHERE email=:email AND clave=:clave");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasPersonas() ");
		$consulta->bindValue(':email', $mailCliente, PDO::PARAM_STR);
		$consulta->bindValue(':clave', $claveCliente, PDO::PARAM_STR);
		$consulta->execute();			
		$clienteBuscado= $consulta->fetchObject('cliente');
		return $clienteBuscado;	
	}
	
	public static function BorrarCliente($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM clientes WHERE id_cliente=:id");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL BorrarPersona(:id)");	
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarCliente($cliente)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				UPDATE clientes 
				SET nombre=:nombre,
				email=:email,
				clave=:clave,
				telefono=:telefono,
				habilitado=:habilitado
				WHERE id_cliente=:id");
			//$consulta =$objetoAccesoDato->RetornarConsulta("CALL ModificarCliente(:id,:nombre,:nombre,:email,:clave,:telefono)");
			$consulta->bindValue(':id',$cliente->id_cliente, PDO::PARAM_INT);
			$consulta->bindValue(':nombre', $cliente->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':email', $cliente->email, PDO::PARAM_STR);
			$consulta->bindValue(':clave', $cliente->clave, PDO::PARAM_STR);
			$consulta->bindValue(':telefono', $cliente->telefono, PDO::PARAM_STR);
			$consulta->bindValue(':habilitado',$cliente->habilitado, PDO::PARAM_INT);
			return $consulta->execute();
	}

	public static function HabilitarCliente($idCliente, $habilitado)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				UPDATE clientes 
				SET habilitado=:habilitado
				WHERE id_cliente=:id");
			//$consulta =$objetoAccesoDato->RetornarConsulta("CALL ModificarEmpleado(:id,:nombre,:nombre,:email,:clave,:tipo)");
			$consulta->bindValue(':id',$idCliente, PDO::PARAM_INT);
			$consulta->bindValue(':habilitado',$habilitado, PDO::PARAM_INT);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarCliente($cliente)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into clientes (nombre,email,clave,telefono,habilitado)values(:nombre,:email,:clave,:telefono,:habilitado)");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL InsertarCliente (:nombre,:nombre,:dni,:email,:clave,:telefono,:codFoto)");
		$consulta->bindValue(':nombre', $cliente->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':email', $cliente->email, PDO::PARAM_STR);
		$consulta->bindValue(':clave', $cliente->clave, PDO::PARAM_STR);
		$consulta->bindValue(':telefono', $cliente->telefono, PDO::PARAM_STR);
		$consulta->bindValue(':habilitado',$cliente->habilitado, PDO::PARAM_INT);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	
//--------------------------------------------------------------------------------//


}
