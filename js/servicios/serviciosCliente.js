angular
	.module('app')
	.service('ClienteService', function ($http, factoryRutas){

		this.insertarCliente = InsertarCliente;

		var url = factoryRutas.RutaClientes;


		function InsertarCliente(cliente){

			console.log(cliente);
			//return $http.post('http://baratinga.hol.es/ws1/cliente/' + cliente)
			return $http.post(url + cliente)
				.then(function (respuesta){

					return respuesta;

				}).catch(function (error){

					console.log(error);

				})

		};

		

	})