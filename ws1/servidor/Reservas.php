<?php
require_once"AccesoDatos.php";
class Reserva
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_producto;
	public $id_cliente;
	public $fechaReserva;
  	public $estado;
  	//public $codFoto;

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetIdProducto()
	{
		return $this->id_producto;
	}
	public function GetIdCliente()
	{
		return $this->id_cliente;
	}
	public function GetFechaReserva()
	{
		return $this->fechaReserva;
	}
	public function GetEstado()
	{
		return $this->estado;
	}


	public function SetIdProducto($valor)
	{
		$this->id_producto = $valor;
	}
	public function SetIdCliente($valor)
	{
		$this->id_cliente = $valor;
	}
	public function SetFechaReserva($valor)
	{
		$this->fechaReserva = $valor;
	}
	public function SetEstado($valor)
	{
		$this->estado = $valor;
	}

//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id_producto=NULL)
	{
		if($id_producto != NULL){
			$obj = Reserva::TraerUnaReserva($id_producto);
			
			$this->id_cliente = $obj->id_cliente;
			$this->fechaReserva = $obj->fechaReserva;
			$this->estado = $obj->estado;
			$this->id_producto = $obj->id_producto;
			//$this->codFoto = $obj->codFoto;
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->id_cliente."-".$this->fechaReserva."-".$this->estado."-".$this->id_producto;
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnaReserva($idProducto, $idCliente) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM reservas WHERE id_producto=:id_producto AND id_cliente=:id_cliente");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnaPersona(:id)");
		$consulta->bindValue(':id_producto', $idProducto, PDO::PARAM_INT);
		$consulta->bindValue(':id_cliente', $idCliente, PDO::PARAM_INT);
		$consulta->execute();
		$reservaBuscada= $consulta->fetchObject('reserva');
		return $reservaBuscada;	
					
	}
	
	public static function TraerTodasLasReservas()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT c.nombre as nombreCliente, c.id_cliente, c.email, c.telefono, p.nombre as nombreProducto, p.precio, p.id_producto, r.fechaReserva, r.estado FROM clientes as c, productos as p, reservas as r WHERE r.id_cliente = c.id_cliente AND r.id_producto = p.id_producto");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasPersonas() ");
		$consulta->execute();			
		$arrReservas= $consulta->fetchAll(PDO::FETCH_OBJ);	
		return $arrReservas;
	}

	public static function TraerReservaConsumida($idCliente)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT p.*, r.id_cliente, r.fechaReserva, r.estado FROM reservas as r, productos as p, clientes as c WHERE r.id_cliente = :id_cliente AND r.id_producto = p.id_producto AND r.estado = 'consumido' LIMIT 1");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasPersonas() ");
		$consulta->bindValue(':id_cliente', $idCliente, PDO::PARAM_INT);
		$consulta->execute();			
		$arrReservas= $consulta->fetchAll(PDO::FETCH_OBJ);	
		return $arrReservas;
	}
	
	public static function BorrarReserva($idProducto, $idCliente)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM reservas WHERE id_producto=:id_producto AND id_cliente=:id_cliente");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL BorrarPersona(:id)");	
		$consulta->bindValue(':id_producto', $idProducto, PDO::PARAM_INT);
		$consulta->bindValue(':id_cliente', $idCliente, PDO::PARAM_INT);	
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarReserva($reserva)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				UPDATE reservas 
				SET fechaReserva=:fechaReserva,
				estado=:estado
				WHERE id_producto=:id_producto
				AND id_cliente=:id_cliente");
			//$consulta =$objetoAccesoDato->RetornarConsulta("CALL ModificarReserva(:id,:fechaReserva,:id_cliente,:fechaReserva,:estado,:id_local)");
			$consulta->bindValue(':id_producto',$reserva->id_producto, PDO::PARAM_INT);
			$consulta->bindValue(':id_cliente', $reserva->id_cliente, PDO::PARAM_INT);
			$consulta->bindValue(':fechaReserva', $reserva->fechaReserva, PDO::PARAM_STR);
			$consulta->bindValue(':estado', $reserva->estado, PDO::PARAM_STR);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarReserva($reserva)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into reservas (id_cliente,id_producto,fechaReserva,estado)values(:id_cliente,:id_producto,:fechaReserva,:estado)");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL InsertarLocal (:fechaReserva,:id_cliente,:dni,:fechaReserva,:estado,:id_local,:codFoto)");
		$consulta->bindValue(':id_cliente', $reserva->id_cliente, PDO::PARAM_STR);
		$consulta->bindValue(':id_producto', $reserva->id_producto, PDO::PARAM_STR);
		$consulta->bindValue(':fechaReserva', $reserva->fechaReserva, PDO::PARAM_STR);
		$consulta->bindValue(':estado', $reserva->estado, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	
//--------------------------------------------------------------------------------//


}
