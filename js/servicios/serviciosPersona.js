angular
	.module('angularABM')
	.service('PersonaService', function ($http){

		this.traerTodasLasPersonas = TraerTodasLasPersonas;
		this.borrarPersona = BorrarPersona;
		this.insertarPersona = InsertarPersona;
		this.modificarPersona = ModificarPersona;


		function TraerTodasLasPersonas(){
			//return $http.get('http://baratinga.hol.es/ws1/personas')
			return $http.get('http://localhost:8080/LAB-IV/ABM_Angular_Project/ws1/personas')
				.then(function (respuesta){

					console.log(respuesta.data);

					return respuesta.data;

				}).catch(function (error){
					console.log(error);
					return error;
				})

		};


		function BorrarPersona(dato){
			//return $http.delete('http://baratinga.hol.es/ws1/persona/' + dato)
			return $http.delete('http://localhost:8080/LAB-IV/ABM_Angular_Project/ws1/persona/' + dato)
				.then(function (respuesta){

					console.log(respuesta);

				}).catch(function (error){

					console.log(error);

				})

		};

		function InsertarPersona(persona){

			//return $http.post('http://baratinga.hol.es/ws1/persona/' + persona)
			return $http.post('http://localhost:8080/LAB-IV/ABM_Angular_Project/ws1/persona/' + persona)
				.then(function (respuesta){

					return respuesta;

				}).catch(function (error){

					console.log(error);

				})

		};

		function ModificarPersona(persona){

			//return $http.put('http://baratinga.hol.es/ws1/persona/' + persona)
			return $http.put('http://localhost:8080/LAB-IV/ABM_Angular_Project/ws1/persona/' + persona)
				.then(function (respuesta){

					return respuesta;

				}).catch(function (error){

					console.log(error);

				})

		};

	})