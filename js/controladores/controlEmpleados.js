angular.module('app.controllers')

.controller('altaEmpleadosCtrl', function($scope, $state, $timeout, EmpleadoService, UsuarioActual){


	$scope.usuario = JSON.parse(UsuarioActual.getFullData());
	$scope.empleado = {};
	$scope.empleado.nombre = "nombreEmpleado";
	$scope.empleado.tipo = "empleado";
	$scope.empleado.email = "empleado1@empleado1.com"
	$scope.empleado.clave = 1234;
	$scope.empleado.copiaclave = 1234;
	$scope.empleado.id_local = null;

	$scope.Guardar = function(){

		$scope.empleado.habilitado = true;

		var empleado = JSON.stringify($scope.empleado);

		EmpleadoService.insertarEmpleado(empleado)
			.then(function (respuesta){

				console.info("Respuesta", respuesta);

			}).catch(function (error){

				console.info("Error", error);

			})

	}

})