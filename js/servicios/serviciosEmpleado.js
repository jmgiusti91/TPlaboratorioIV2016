angular
	.module('app')
	.service('EmpleadoService', function ($http, factoryRutas){

		this.insertarEmpleado = InsertarEmpleado;

		this.traerTodos = TraerTodos;

		this.habilitar = Habilitar;

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


		function TraerTodos(){

			return $http.get(url)
				.then(function (respuesta){

					return respuesta;

				}).catch(function (error){

					console.log(error);

				})

		};


		function Habilitar(idEmpleado, habilitar){

			console.log(idEmpleado);
			console.log(habilitar);
			//return $http.post('http://baratinga.hol.es/ws1/empleado/' + empleado)
			return $http.put(url + idEmpleado + "/" + habilitar)
				.then(function (respuesta){

					return respuesta;

				}).catch(function (error){

					console.log(error);

				})			

		};

		

	})