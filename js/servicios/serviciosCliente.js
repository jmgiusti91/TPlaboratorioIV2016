angular
	.module('app')
	.service('ClienteService', function ($http){

		this.insertarCliente = InsertarCliente;


		function InsertarCliente(cliente){

			console.log(cliente);
			//return $http.post('http://baratinga.hol.es/ws1/cliente/' + cliente)
			return $http.post('http://localhost:8080/LAB-IV/pizzeria-argenta/TPlaboratorioIV2016/ws1/cliente/' + cliente)
				.then(function (respuesta){

					return respuesta;

				}).catch(function (error){

					console.log(error);

				})

		};

		

	})