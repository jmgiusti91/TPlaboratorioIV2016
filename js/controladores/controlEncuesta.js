angular.module('app.controllers')

.controller('EncuestaCtrl', function($scope, $state, $timeout, UsuarioActual, ReservaService){

	$scope.usuario = JSON.parse(UsuarioActual.getFullData());
	$scope.reserva = {};
	$scope.encuesta = {};

	var idCliente = JSON.stringify(parseInt($scope.usuario.id));

	console.log(idCliente);

	ReservaService.traerConsumido(idCliente)
		.then(function (respuesta){

			$scope.reserva = respuesta.data[0];

			console.log($scope.reserva);

		}).catch(function (error){

			console.log(error);
		})

	$scope.Guardar = function(){

		console.log($scope.encuesta);

	};


})