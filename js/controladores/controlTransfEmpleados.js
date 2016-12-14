angular.module('app.controllers')

.controller('transfEmpleadosCtrl', function($scope, $state, $stateParams, $timeout, LocalService, EmpleadoService, UsuarioActual){

	$scope.usuario = JSON.parse(UsuarioActual.getFullData());

	$scope.empleado = JSON.parse($stateParams.empleado);

	if ($scope.empleado.id_local != null) {
		$scope.empleado.id_local = $scope.empleado.id_local.toString();
	};

	console.log($scope.empleado);

	$scope.listadoLocales = {};
	$scope.localElegido = {};
	$scope.localAnterior = {};

	LocalService.traerTodos()
		.then(function (respuesta){

			$scope.listadoLocales = JSON.parse(JSON.stringify(respuesta.data));

			console.log($scope.listadoLocales);

			//$scope.empleado.id_local = $scope.listadoLocales[0].id_local.toString();
			for(var i = 0; i < $scope.listadoLocales.length; i++){

				if ($scope.empleado.id_local == $scope.listadoLocales[i].id_local.toString()) {

					$scope.localAnterior = $scope.listadoLocales[i];

				};

			};

		}).catch(function (error){

			$scope.listadoLocales = {};

			console.log(error);

		});

	$scope.Guardar = function(){

		var empleado = JSON.stringify($scope.empleado);

		for(var i = 0; i < $scope.listadoLocales.length; i++){

			if ($scope.empleado.id_local == $scope.listadoLocales[i].id_local.toString()) {

				$scope.localElegido = $scope.listadoLocales[i];

			};

			if ($scope.empleado.tipo == "encargado" && $scope.empleado.id_local == $scope.listadoLocales[i].id_local.toString() && $scope.listadoLocales[i].id_encargado != null) {

				alert("El local seleccionado ya tiene asignado un encargado.");
				return;

			};

		};

		if ($scope.empleado.tipo == "encargado") {

			EmpleadoService.modificarEmpleado(empleado)
			.then(function (respuesta){

				console.info("Respuesta", respuesta);

					$scope.localElegido.id_encargado = $scope.empleado.id_empleado;

					var localElegido = JSON.stringify($scope.localElegido);

					console.info("localElegido", $scope.localElegido);

					LocalService.modificarLocal(localElegido)
						.then(function (respuesta){

							console.info("local modificado", respuesta);
							$( "div.exito" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );

						}).catch(function (error){

							console.info("Error en modificar local", error);

						})

					$scope.localAnterior.id_encargado = null;

					var localAnterior = JSON.stringify($scope.localAnterior);

					console.info("localAnterior", $scope.localAnterior);

					LocalService.modificarLocal(localAnterior)
						.then(function (respuesta){

							console.info("local modificado", respuesta);

						}).catch(function (error){

							console.info("Error en modificar local", error);

						})

			}).catch(function (error){

				console.info("Error", error);

			})

		};

		if ($scope.empleado.tipo == "empleado") {

			$scope.localElegido.cant_empleados += 1;
			$scope.localAnterior.cant_empleados -= 1;

			EmpleadoService.modificarEmpleado(empleado)
			.then(function (respuesta){

				console.info("Respuesta", respuesta);
					
				var localElegido = JSON.stringify($scope.localElegido);

				console.info("localElegido", $scope.localElegido);

				var localAnterior = JSON.stringify($scope.localAnterior);

				LocalService.modificarLocal(localElegido)
					.then(function (respuesta){

						console.info("local modificado", respuesta);
						$( "div.exito" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );

					}).catch(function (error){

						console.info("Error en modificar local", error);

					})

				LocalService.modificarLocal(localAnterior)
					.then(function (respuesta){

						console.info("local modificado", respuesta);

					}).catch(function (error){

						console.info("Error en modificar local", error);

					})

			}).catch(function (error){

				console.info("Error", error);

			})

		};

	}

})