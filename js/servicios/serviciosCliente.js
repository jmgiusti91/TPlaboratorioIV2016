angular
	.module('app')
	.service('ClienteService', function ($http, factoryRutas){

		this.insertarCliente = InsertarCliente;

		this.traerTodos = TraerTodos;

		this.habilitar = Habilitar;

		var url = factoryRutas.RutaClientes;


		function InsertarCliente(cliente){

			console.log(cliente);
			//return $http.post('http://baratinga.hol.es/ws1/cliente/' + cliente)
			return $http.post(url + cliente)
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


		function Habilitar(idCliente, habilitar){

			console.log(idCliente);
			console.log(habilitar);
			//return $http.post('http://baratinga.hol.es/ws1/empleado/' + empleado)
			return $http.put(url + idCliente + "/" + habilitar)
				.then(function (respuesta){

					return respuesta;

				}).catch(function (error){

					console.log(error);

				})			

		};

		

	})