angular
	.module('app')
	.service('ProductoService', function ($http, factoryRutas){

		this.insertarProducto = InsertarProducto;

		this.traerTodos = TraerTodos;

		var url = factoryRutas.RutaProductos;

		function InsertarProducto(producto){

			console.log(producto);
			//return $http.post('http://baratinga.hol.es/ws1/producto/' + producto)
			return $http.post(url + producto)
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