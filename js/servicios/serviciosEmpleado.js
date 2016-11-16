angular
	.module('app')
	.service('EmpleadoService', function ($http, factoryRutas){

		this.insertarEmpleado = InsertarEmpleado;

		var url = factoryRutas.RutaEmpleados;

		function InsertarEmpleado(empleado){

			console.log(empleado);
			//return $http.post('http://baratinga.hol.es/ws1/empleado/' + empleado)
			return $http.post(url + empleado)
				.then(function (respuesta){

					return respuesta;

				}).catch(function (error){

					console.log(error);

				})

		};

		

	})