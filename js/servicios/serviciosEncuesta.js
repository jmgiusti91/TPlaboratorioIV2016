angular
	.module('app')
	.service('EncuestaService', function ($http, factoryRutas){

		this.insertarEncuesta = InsertarEncuesta;

		this.traerTodos = TraerTodos;

		var url = factoryRutas.RutaEncuestas;

		function InsertarEncuesta(encuesta){

			console.info("encuensta en service", encuesta);
			//return $http.post('http://baratinga.hol.es/ws1/encuesta/' + encuesta)
			return $http.post(url + encuesta)
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