angular
	.module('app')
	.service('ReservaService', function ($http, factoryRutas){

		this.insertarReserva = InsertarReserva;

		this.traerTodos = TraerTodos;

		this.modificarReserva = ModificarReserva;

		this.traerConsumido = TraerConsumido;

		var url = factoryRutas.RutaReservas;

		function InsertarReserva(reserva){

			console.log(reserva);
			//return $http.post('http://baratinga.hol.es/ws1/reserva/' + reserva)
			return $http.post(url + reserva)
				.then(function (respuesta){

					return respuesta;

				}).catch(function (error){

					console.log(error);
					$( "div.falla" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );

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

		function ModificarReserva(reserva){

			return $http.put(url + reserva)
				.then(function (respuesta){

					return respuesta;

				}).catch(function (error){

					console.log(error);

				})

		};

		function TraerConsumido(idCliente){

			return $http.get(url + idCliente)
				.then(function (respuesta){

					return respuesta;

				}).catch(function (error){

					console.log(error);

				})

		};

	})