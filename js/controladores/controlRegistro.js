angular.module('app.controllers')

.controller('controlRegistro', function($scope, $state, $timeout, ClienteService, UsuarioActual){

	$scope.usuario = JSON.parse(UsuarioActual.getFullData());
	console.log($scope.usuario);
	$scope.cliente = {};
	$scope.cliente.nombre = "Zacarias Flores Del Campo";
	$scope.cliente.telefono = 43576656;
	$scope.cliente.email = "cliente8@cliente8.com"
	$scope.cliente.clave = 1234;
	$scope.cliente.copiaclave = 1234;

	$scope.Guardar = function(){

		$scope.cliente.habilitado = true;

		var cliente = JSON.stringify($scope.cliente);

		ClienteService.insertarCliente(cliente)
			.then(function (respuesta){

				console.info("Respuesta", respuesta);
				$( "div.exito" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );

			}).catch(function (error){

				console.info("Error", error);

			})

	}


	$scope.Loguearme = function(){

		$timeout(function (){

			$state.go('log.login');

		}, 500)
		

	}

})