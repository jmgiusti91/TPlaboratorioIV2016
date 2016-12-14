angular.module('app.controllers')

.controller('BienvenidaCtrl', function($scope, $state, $timeout, $rootScope, UsuarioActual, ReservaService){

	$scope.usuario = JSON.parse(UsuarioActual.getFullData());

	if ($scope.usuario.tipo == 'cliente') {

		var idCliente = JSON.stringify(parseInt($scope.usuario.id));

		console.log(idCliente);

		ReservaService.traerConsumido(idCliente)
		.then(function (respuesta){

			console.log(respuesta);
			if (respuesta.data[0] != null) {
				$rootScope.haceEncuesta = true;
			} else {
				$rootScope.haceEncuesta = false;
				console.log("no hago encuesta :(");
			}
			

		}).catch(function (error){
			console.log(error);
		})

	};

})