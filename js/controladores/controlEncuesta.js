angular.module('app.controllers')

.controller('EncuestaCtrl', function($scope, $state, $rootScope, $timeout, UsuarioActual, ReservaService, EncuestaService){

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

		if (!$scope.encuesta.web) {
			$scope.encuesta.web = 0;
		} else {
			$scope.encuesta.web = 1;
		};

		if (!$scope.encuesta.atencion) {
			$scope.encuesta.atencion = 0;
		} else {
			$scope.encuesta.atencion = 1;
		};

		if (!$scope.encuesta.producto) {
			$scope.encuesta.producto = 0;
		} else {
			$scope.encuesta.producto = 1;
		};

		if (!$scope.encuesta.local) {
			$scope.encuesta.local = 0;
		} else {
			$scope.encuesta.local = 1;
		};

		if (!$scope.encuesta.comentario) {
			$scope.encuesta.comentario = "Sin Comentario";
		};

		$scope.encuesta.id_cliente = $scope.reserva.id_cliente;
		$scope.encuesta.id_producto = $scope.reserva.id_producto;

		var encuesta = JSON.stringify($scope.encuesta);

		EncuestaService.insertarEncuesta(encuesta)
			.then(function (respuesta){

				console.info("encuesta", respuesta);

				$scope.reserva.estado = "calificado";

				var reserva = JSON.stringify($scope.reserva);

				ReservaService.modificarReserva(reserva)
					.then(function (respuesta){

						console.log(respuesta);

					}).catch(function (error){

						console.log(error);

					})


			}).catch(function (error){

				console.info("error", error);

			})

		console.log($scope.encuesta);

	};

	$scope.FinalizarEncuesta = function(){

		$rootScope.haceEncuesta = false;

		$timeout(function (){

			$state.go('bienvenida');

		}, 500);

	};


})