angular.module('app.controllers')

.controller('altaEmpleadosCtrl', function($scope, $state, $timeout, LocalService, EmpleadoService, UsuarioActual){


	$scope.usuario = JSON.parse(UsuarioActual.getFullData());
	$scope.empleado = {};
	$scope.empleado.nombre = "Lugones";
	$scope.empleado.tipo = "empleado";
	$scope.empleado.email = "lugones@pizzeriasargenta.com"
	$scope.empleado.clave = 1234;
	$scope.empleado.copiaclave = 1234;
	$scope.empleado.id_local = null;
	$scope.listadoLocales = {};
	$scope.localElegido = {};

	LocalService.traerTodos()
		.then(function (respuesta){

			$scope.listadoLocales = JSON.parse(JSON.stringify(respuesta.data));

			console.log($scope.listadoLocales);

			$scope.empleado.id_local = $scope.listadoLocales[0].id_local.toString();

		}).catch(function (error){

			$scope.listadoLocales = {};

			console.log(error);

		});

	$scope.Guardar = function(){

		$scope.empleado.habilitado = true;

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

			EmpleadoService.insertarEmpleado(empleado)
			.then(function (respuesta){

				console.info("Respuesta", respuesta);

				if (respuesta != undefined) {

					$scope.localElegido.id_encargado = parseInt(respuesta.data);

					var local = JSON.stringify($scope.localElegido);

					console.info("localElegido", $scope.localElegido);

					LocalService.modificarLocal(local)
						.then(function (respuesta){

							console.info("local modificado", respuesta);
							 $( "div.exito" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );

						}).catch(function (error){

							console.info("Error en modificar local", error);
							$( "div.falla" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );

						})

				};

				

			}).catch(function (error){

				console.info("Error", error);
				$( "div.falla" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );

			})

		};

		if ($scope.empleado.tipo == "empleado") {

			$scope.localElegido.cant_empleados += 1;

			EmpleadoService.insertarEmpleado(empleado)
			.then(function (respuesta){

				console.info("Respuesta", respuesta);

				if (respuesta != undefined) {
					
					var local = JSON.stringify($scope.localElegido);

					console.info("localElegido", $scope.localElegido);

					LocalService.modificarLocal(local)
						.then(function (respuesta){

							console.info("local modificado", respuesta);
							$( "div.exito" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );

						}).catch(function (error){

							console.info("Error en modificar local", error);
							$( "div.falla" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );

						})

				};

			}).catch(function (error){

				console.info("Error", error);
				$( "div.falla" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );

			})

		};

		if ($scope.empleado.tipo == "administrador") {

			$scope.empleado.id_local = null;

			empleado = JSON.stringify($scope.empleado);

			EmpleadoService.insertarEmpleado(empleado)
				.then(function (respuesta){

					console.log("respuesta", respuesta);
					$( "div.exito" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );

				}).catch(function (error){

					console.log("error", error);
					$( "div.falla" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );

				})

		};

	}

})