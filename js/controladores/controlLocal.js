angular.module('app.controllers')

.controller("altaLocalesCtrl", function($scope, $auth, $state, UsuarioActual, LocalService, FileUploader){

	$scope.usuario = {};

	$scope.local = {};

	$scope.SubidorDeArchivos = new FileUploader({url:'http://localhost:8080/LAB-IV/pizzeria-argenta/TPlaboratorioIV2016/ws1/archivo/'});


	$scope.SubidorDeArchivos.onSuccessItem=function(item, response, status, headers){
		console.log(response);
		//console.log(item);
		if(item.file.name == $scope.local.foto3){
			var local = JSON.stringify($scope.local);

			LocalService.insertarLocal(local)
			  	.then(function(respuesta) {     	
					 //aca se ejetuca si retorno sin errores      	
					 //console.log("El id ingresado es: "+respuesta.data);
					 console.info("respuesta", respuesta);
					 $state.go("locales-perfil");

				},function errorCallback(response) {     		
						//aca se ejecuta cuando hay errores
						console.log( response);     			
				});
		}
	};


	$scope.Guardar = function(){

		console.log($scope.SubidorDeArchivos.queue);
		if($scope.SubidorDeArchivos.queue[0]!=undefined)
		{
			var nombreFoto1 = $scope.SubidorDeArchivos.queue[0]._file.name;
			$scope.local.foto1=nombreFoto1;

			var nombreFoto2 = $scope.SubidorDeArchivos.queue[1]._file.name;
			$scope.local.foto2=nombreFoto2;

			var nombreFoto3 = $scope.SubidorDeArchivos.queue[2]._file.name;
			$scope.local.foto3=nombreFoto3;

			$scope.SubidorDeArchivos.uploadAll();
		}

	};

	
})