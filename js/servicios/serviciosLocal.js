angular
	.module('app')
	.service('LocalService', function ($http, factoryRutas){

		this.insertarLocal = InsertarLocal;

		this.traerTodos = TraerTodos;

		this.traerTodosActivos = TraerTodosActivos;

		this.modificarLocal = ModificarLocal;

		var url = factoryRutas.RutaLocales;

		function InsertarLocal(local){

			console.log(local);
			//return $http.post('http://baratinga.hol.es/ws1/local/' + local)
			return $http.post(url + local)
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

		function ModificarLocal(local){

			return $http.put(url + local)
				.then(function (respuesta){

					return respuesta;

				}).catch(function (error){

					console.log(error);

				})

		};

		function TraerTodosActivos(numero){

			return $http.get(url + numero)
				.then(function (respuesta){

					return respuesta;

				}).catch(function (error){

					console.log(error);

				})
		}

	})