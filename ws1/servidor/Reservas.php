<?php
require_once"AccesoDatos.php";
class Reserva
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_pedido;
	public $id_cliente;
	public $fecha;
  	public $estado;
  	//public $codFoto;

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetIdPedido()
	{
		return $this->id_pedido;
	}
	public function GetIdCliente()
	{
		return $this->id_cliente;
	}
	public function GetFecha()
	{
		return $this->fecha;
	}
	public function GetEstado()
	{
		return $this->estado;
	}


	public function SetIdPedido($valor)
	{
		$this->id_pedido = $valor;
	}
	public function SetIdCliente($valor)
	{
		$this->id_cliente = $valor;
	}
	public function SetFecha($valor)
	{
		$this->fecha = $valor;
	}
	public function SetEstado($valor)
	{
		$this->estado = $valor;
	}

//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id_pedido=NULL)
	{
		if($id_pedido != NULL){
			$obj = Reserva::TraerUnaReserva($id_pedido);
			
			$this->id_cliente = $obj->id_cliente;
			$this->fecha = $obj->fecha;
			$this->estado = $obj->estado;
			$this->id_pedido = $obj->id_pedido;
			//$this->codFoto = $obj->codFoto;
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->id_cliente."-".$this->fecha."-".$this->estado."-".$this->id_pedido;
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnaReserva($idPedido, $idCliente) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM reservas WHERE id_pedido=:id_pedido AND id_cliente=:id_cliente");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnaPersona(:id)");
		$consulta->bindValue(':id_pedido', $idPedido, PDO::PARAM_INT);
		$consulta->bindValue(':id_cliente', $idCliente, PDO::PARAM_INT);
		$consulta->execute();
		$reservaBuscada= $consulta->fetchObject('reserva');
		return $reservaBuscada;	
					
	}
	
	public static function TraerTodosLosreservas()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM reservas ");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasPersonas() ");
		$consulta->execute();			
		$arrReservas= $consulta->fetchAll(PDO::FETCH_CLASS, "reserva");	
		return $arrReservas;
	}
	
	public static function BorrarReserva($idPedido, $idCliente)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM reservas WHERE id_pedido=:id_pedido AND id_cliente=:id_cliente");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL BorrarPersona(:id)");	
		$consulta->bindValue(':id_pedido', $idPedido, PDO::PARAM_INT);
		$consulta->bindValue(':id_cliente', $idCliente, PDO::PARAM_INT);	
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarReserva($reserva)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				UPDATE reservas 
				SET fecha=:fecha,
				estado=:estado,
				WHERE id_pedido=:id_pedido
				AND id_cliente=:id_cliente");
			//$consulta =$objetoAccesoDato->RetornarConsulta("CALL ModificarReserva(:id,:fecha,:id_cliente,:fecha,:estado,:id_local)");
			$consulta->bindValue(':id_pedido',$reserva->id_pedido, PDO::PARAM_INT);
			$consulta->bindValue(':id_cliente', $reserva->id_cliente, PDO::PARAM_STR);
			$consulta->bindValue(':fecha', $reserva->fecha, PDO::PARAM_STR);
			$consulta->bindValue(':estado', $reserva->estado, PDO::PARAM_STR);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarReserva($reserva)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into reservas (id_cliente,id_pedido,fecha,estado)values(:id_cliente,:id_pedido,:fecha,:estado)");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL InsertarLocal (:fecha,:id_cliente,:dni,:fecha,:estado,:id_local,:codFoto)");
		$consulta->bindValue(':id_cliente', $reserva->id_cliente, PDO::PARAM_STR);
		$consulta->bindValue(':id_pedido', $reserva->id_pedido, PDO::PARAM_STR);
		$consulta->bindValue(':fecha', $reserva->fecha, PDO::PARAM_STR);
		$consulta->bindValue(':estado', $reserva->estado, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	
//--------------------------------------------------------------------------------//


}
