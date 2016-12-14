angular.module('app.controllers')

.controller("productosPerfilCtrl", function($scope, ProductoService, $stateParams){

  $scope.idProductoParams = JSON.parse($stateParams.idProducto);
  $scope.idProductoParams = parseInt($scope.idProductoParams);
  console.log($scope.idProductoParams);
	ProductoService.traerTodos()
 	.then(function(respuesta) {     	

      	 $scope.ListadoProductos = respuesta.data;
      	 console.log(respuesta);
      	 console.log(respuesta.data.length);

         for(var i = 0; i < $scope.ListadoProductos.length; i++){

          if ($scope.idProductoParams == $scope.ListadoProductos[i].id_producto) {

            var arrayProducto = $scope.ListadoProductos[i];
            console.log(arrayProducto);
            $scope.producto={};
            $scope.producto.id=arrayProducto['id_producto'];
            $scope.producto.nombre=arrayProducto['nombre'];
            $scope.producto.precio=arrayProducto['precio'];
            $scope.producto.descripcion=arrayProducto['descripcion'];
            $scope.producto.foto1=arrayProducto['foto1'];
            $scope.producto.foto2=arrayProducto['foto2'];
            $scope.producto.foto3=arrayProducto['foto3'];

            break;

          };

         };

    },function errorCallback(response) {
     	$scope.ListadoProductos= [];
     	console.log( response);
     			
 	 });

});