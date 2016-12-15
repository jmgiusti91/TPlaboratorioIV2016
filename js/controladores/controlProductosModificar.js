angular.module('app.controllers')

.controller("modificarProductosCtrl", function($scope, $auth, UsuarioActual, $stateParams, $state, LocalService, ProductoService, FileUploader, factoryRutas){

	$scope.producto = {};

	$scope.producto.id_producto = $stateParams.id_producto;
	$scope.producto.tipo = $stateParams.tipo;
	$scope.producto.nombre = $stateParams.nombre;
	$scope.producto.precio = parseInt($stateParams.precio);
	$scope.producto.descripcion = $stateParams.descripcion;

	$scope.listadoLocales = {};

	$scope.SubidorDeArchivos = new FileUploader({url:factoryRutas.RutaArchivos});

	console.log($stateParams);


	LocalService.traerTodos()
		.then(function (respuesta){

			$scope.listadoLocales = JSON.parse(JSON.stringify(respuesta.data));

			console.log($scope.listadoLocales);

			$scope.producto.id_local = $stateParams.id_local.toString();

		}).catch(function (error){

			$scope.listadoLocales = {};

			console.log(error);

		});


	$scope.SubidorDeArchivos.onSuccessItem=function(item, response, status, headers){
		console.log(response);
		//console.log(item);
		if(item.file.name == $scope.producto.foto3){
			var producto = JSON.stringify($scope.producto);

			ProductoService.modificarProducto(producto)
			  	.then(function(respuesta) {     	
					 //aca se ejetuca si retorno sin errores      	
					 //console.log("El id ingresado es: "+respuesta.data);
					 console.info("respuesta", respuesta);
					 var idProductoModificado = JSON.stringify($scope.producto.id_producto);
					 $state.go('productos-perfil', {idProducto: idProductoModificado});

				},function errorCallback(response) {     		
						//aca se ejecuta cuando hay errores
						console.log( response);     			
				});
		}
	};

	$scope.Guardar = function(){

		console.log($scope.producto);

		console.log($scope.SubidorDeArchivos.queue);
		if($scope.SubidorDeArchivos.queue[0]!=undefined)
		{
			var nombreFoto1 = $scope.SubidorDeArchivos.queue[0]._file.name;
			$scope.producto.foto1=nombreFoto1;

			var nombreFoto2 = $scope.SubidorDeArchivos.queue[1]._file.name;
			$scope.producto.foto2=nombreFoto2;

			var nombreFoto3 = $scope.SubidorDeArchivos.queue[2]._file.name;
			$scope.producto.foto3=nombreFoto3;

			$scope.SubidorDeArchivos.uploadAll();
		}

	};
	
})