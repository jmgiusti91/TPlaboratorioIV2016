<?php
require_once"AccesoDatos.php";
class Pedido
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_pedido;
	public $nombre;
	public $descripcion;
  	public $precio;
  	public $id_local;
  	//public $codFoto;

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetIdPedido()
	{
		return $this->id_pedido;
	}
	public function GetDescripcion()
	{
		return $this->descripcion;
	}
	public function GetNombre()
	{
		return $this->nombre;
	}
	public function GetPrecio()
	{
		return $this->precio;
	}
	public function GetIdLocal()
	{
		return $this->id_local;
	}


	public function SetIdPedido($valor)
	{
		$this->id_pedido = $valor;
	}
	public function SetDescripcion($valor)
	{
		$this->descripcion = $valor;
	}
	public function SetNombre($valor)
	{
		$this->nombre = $valor;
	}
	public function SetPrecio($valor)
	{
		$this->precio = $valor;
	}
	public function SetIdLocal($valor)
	{
		$this->id_local = $valor;
	}

//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id_pedido=NULL)
	{
		if($id_pedido != NULL){
			$obj = Pedido::TraerUnPedido($id_pedido);
			
			$this->descripcion = $obj->descripcion;
			$this->nombre = $obj->nombre;
			$this->precio = $obj->precio;
			$this->id_local = $obj->id_local;
			//$this->codFoto = $obj->codFoto;
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->descripcion."-".$this->nombre."-".$this->precio."-".$this->id_local;
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnPedido($idParametro) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM pedidos WHERE id_pedido=:id");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnaPersona(:id)");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$pedidoBuscado= $consulta->fetchObject('pedido');
		return $pedidoBuscado;	
					
	}
	
	public static function TraerTodosLosPedidos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM pedidos ");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasPersonas() ");
		$consulta->execute();			
		$arrPedidos= $consulta->fetchAll(PDO::FETCH_CLASS, "pedido");	
		return $arrPedidos;
	}
	
	public static function BorrarPedido($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM pedidos WHERE id_pedido=:id");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL BorrarPersona(:id)");	
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarPedido($pedido)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				UPDATE pedidos 
				SET descripcion=:descripcion,
				nombre=:nombre,
				precio=:precio,
				id_local=:id_local
				WHERE id_pedido=:id");
			//$consulta =$objetoAccesoDato->RetornarConsulta("CALL ModificarPedido(:id,:nombre,:descripcion,:nombre,:precio,:id_local)");
			$consulta->bindValue(':id',$pedido->id_pedido, PDO::PARAM_INT);
			$consulta->bindValue(':descripcion', $pedido->descripcion, PDO::PARAM_STR);
			$consulta->bindValue(':nombre', $pedido->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':precio', $pedido->precio, PDO::PARAM_STR);
			$consulta->bindValue(':id_local', $pedido->id_local, PDO::PARAM_STR);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarPedido($pedido)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into pedidos (nombre,descripcion,precio,id_local)values(:nombre,:descripcion,:precio,:id_local)");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL InsertarLocal (:nombre,:descripcion,:dni,:nombre,:precio,:id_local,:codFoto)");
		$consulta->bindValue(':descripcion', $pedido->descripcion, PDO::PARAM_STR);
		$consulta->bindValue(':nombre', $pedido->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':precio', $pedido->precio, PDO::PARAM_STR);
		$consulta->bindValue(':id_local', $pedido->id_local, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	
//--------------------------------------------------------------------------------//


}
