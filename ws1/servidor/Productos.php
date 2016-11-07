<?php
require_once"AccesoDatos.php";
class Producto
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_producto;
	public $nombre;
	public $precio;
  	public $foto1;
  	public $foto2;
  	public $foto3;
  	public $tipo;
  	public $descripcion;
  	public $id_local;
  	//public $codFoto;

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetIdProducto()
	{
		return $this->id_producto;
	}
	public function GetNombre()
	{
		return $this->nombre;
	}
	public function GetPrecio()
	{
		return $this->precio;
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
	public function GetTipo()
	{
		return $this->tipo;
	}
	public function GetDescripcion()
	{
		return $this->descripcion;
	}
	public function GetIdLocal()
	{
		return $this->id_local;
	}

	/*public function getCodFoto()
	{
		return $this->codFoto;
	}*/


	public function SetIdProducto($valor)
	{
		$this->id_producto = $valor;
	}
	public function SetNombre($valor)
	{
		$this->nombre = $valor;
	}
	public function SetPrecio($valor)
	{
		$this->precio = $valor;
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
	public function SetTipo($valor)
	{
		$this->tipo = $valor;
	}
	public function SetDescripcion($valor)
	{
		$this->descripcion = $valor;
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
	public function __construct($id_producto=NULL)
	{
		if($id_producto != NULL){
			$obj = Producto::TraerUnProducto($id_producto);
			
			$this->nombre = $obj->nombre;
			$this->precio = $obj->precio;
			$this->foto1 = $obj->foto1;
			$this->foto2 = $obj->foto2;
			$this->foto3 = $obj->foto3;
			$this->tipo = $obj->tipo;
			$this->descripcion = $obj->descripcion;
			$this->id_local = $obj->id_local;
			//$this->codFoto = $obj->codFoto;
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->nombre."-".$this->precio."-".$this->foto1."-".$this->foto2."-".$this->foto3."-".$this->tipo."-".$this->descripcion."-".$this->id_local;
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnProducto($idParametro) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM productos WHERE id_producto=:id");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnaPersona(:id)");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$productoBuscado= $consulta->fetchObject('producto');
		return $productoBuscado;	
					
	}
	
	public static function TraerTodosLosProductos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM productos ");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasPersonas() ");
		$consulta->execute();			
		$arrProductos= $consulta->fetchAll(PDO::FETCH_CLASS, "producto");	
		return $arrProductos;
	}
	
	public static function BorrarProducto($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM productos WHERE id_producto=:id");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL BorrarPersona(:id)");	
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarProducto($producto)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				UPDATE productos 
				SET nombre=:nombre,
				precio=:precio,
				foto1=:foto1,
				foto2=:foto2,
				foto3=:foto3,
				tipo=:tipo,
				descripcion=:descripcion,
				id_local=:id_local
				WHERE id_producto=:id");
			//$consulta =$objetoAccesoDato->RetornarConsulta("CALL ModificarProducto(:id,:nombre,:nombre,:foto1,:foto2,:foto3)");
			$consulta->bindValue(':id',$producto->id_producto, PDO::PARAM_INT);
			$consulta->bindValue(':nombre', $producto->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':precio', $producto->precio, PDO::PARAM_STR);
			$consulta->bindValue(':foto1', $producto->foto1, PDO::PARAM_STR);
			$consulta->bindValue(':foto2', $producto->foto2, PDO::PARAM_STR);
			$consulta->bindValue(':foto3', $producto->foto3, PDO::PARAM_STR);
			$consulta->bindValue(':tipo', $producto->tipo, PDO::PARAM_STR);
			$consulta->bindValue(':descripcion', $producto->descripcion, PDO::PARAM_STR);
			$consulta->bindValue(':id_local',$producto->id_local, PDO::PARAM_INT);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarProducto($producto)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into productos (nombre,precio,foto1,foto2,foto3,tipo,descripcion,id_local)values(:nombre,:precio,:foto1,:foto2,:foto3,:tipo,:descripcion,:id_local)");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL InsertarProducto (:nombre,:nombre,:dni,:foto1,:foto2,:foto3,:codFoto)");
		$consulta->bindValue(':nombre', $producto->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':precio', $producto->precio, PDO::PARAM_STR);
		$consulta->bindValue(':foto1', $producto->foto1, PDO::PARAM_STR);
		$consulta->bindValue(':foto2', $producto->foto2, PDO::PARAM_STR);
		$consulta->bindValue(':foto3', $producto->foto3, PDO::PARAM_STR);
		$consulta->bindValue(':tipo', $producto->tipo, PDO::PARAM_STR);
		$consulta->bindValue(':descripcion', $producto->descripcion, PDO::PARAM_STR);
		$consulta->bindValue(':id_local',$producto->id_local, PDO::PARAM_INT);
		//$consulta->bindValue(':codFoto', $producto->codFoto, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	
//--------------------------------------------------------------------------------//


}
