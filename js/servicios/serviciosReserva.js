angular
	.module('app')
	.service('ReservaService', function ($http, factoryRutas){

		this.insertarReserva = InsertarReserva;

		this.traerTodos = TraerTodos;

		var url = factoryRutas.RutaReservas;

		function InsertarReserva(reserva){

			console.log(reserva);
			//return $http.post('http://baratinga.hol.es/ws1/reserva/' + reserva)
			return $http.post(url + reserva)
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

	})