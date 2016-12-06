angular.module('app.controllers')

.controller("modificarReservasCtrl", function($scope, $auth, UsuarioActual, $stateParams, $state, ReservaService){

	$scope.reserva = {};

	var fecha = new Date();

	$scope.fechaMax = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + (fecha.getDate() + 5);

	$scope.reserva.id_producto = parseInt($stateParams.id_producto);
	$scope.reserva.id_cliente = parseInt($stateParams.id_cliente);
	$scope.reserva.estado = $stateParams.estado;
	var fechaTmp = new Date($stateParams.fechaReserva);
	fechaTmp = fechaTmp.setSeconds(86400); //Añado un dia.. Me traia dia anterior.
	console.log(fechaTmp);
	$scope.reserva.fechaReserva = new Date(fechaTmp);

	console.log($scope.reserva);

	$scope.Guardar = function(){

		$scope.reserva.fechaReserva.setDate($scope.reserva.fechaReserva.getDate() - 1);

		var reserva = JSON.stringify($scope.reserva);

		ReservaService.modificarReserva(reserva)
			.then(function (respuesta){

				console.log(respuesta);

			}).catch(function (error){

				console.log(error);

			})

	};
	
})