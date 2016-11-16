angular.module('app.controllers')

.controller("productosPerfilCtrl", function($scope, ProductoService){

	ProductoService.traerTodos()
 	.then(function(respuesta) {     	

      	 $scope.ListadoProductos = respuesta.data;
      	 console.log(respuesta);
      	 console.log(respuesta.data.length);
      	 var arrayProducto = $scope.ListadoProductos[respuesta.data.length - 1];
      	 console.log(arrayProducto);
      	 $scope.producto={};
		 $scope.producto.id=arrayProducto['id_producto'];
		 $scope.producto.nombre=arrayProducto['nombre'];
     $scope.producto.precio=arrayProducto['precio'];
     $scope.producto.descripcion=arrayProducto['descripcion'];
		 $scope.producto.foto1=arrayProducto['foto1'];
		 $scope.producto.foto2=arrayProducto['foto2'];
		 $scope.producto.foto3=arrayProducto['foto3'];

    },function errorCallback(response) {
     	$scope.ListadoProductos= [];
     	console.log( response);
     			
 	 });

});