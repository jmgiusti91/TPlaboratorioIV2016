angular.module('app.controllers')

.controller("altaLocalesCtrl", function($scope, $auth, $state, $timeout, UsuarioActual, LocalService, FileUploader){

	$scope.usuario = {};

	$scope.local = {};

	$scope.SubidorDeArchivos = new FileUploader({url:'http://localhost:8080/LAB-IV/pizzeria-argenta/TPlaboratorioIV2016/ws1/archivo/'});


	$scope.SubidorDeArchivos.onSuccessItem=function(item, response, status, headers){
		console.log(response);
		//console.log(item);
		if(item.file.name == $scope.local.foto3){

			$scope.local.id_encargado = null;
			$scope.local.cant_empleados = 0;
			var local = JSON.stringify($scope.local);

			console.log(local);

			LocalService.insertarLocal(local)
			  	.then(function(respuesta) {     	
					 //aca se ejetuca si retorno sin errores      	
					 //console.log("El id ingresado es: "+respuesta.data);
					 console.info("respuesta", respuesta);
					 $state.go("locales-perfil");

				},function errorCallback(response) {     		
						//aca se ejecuta cuando hay errores
						console.log( response);     			
				});
		}
	};
	  // Create the autocomplete object, restricting the search to geographical
	  // location types.
	  autocomplete = new google.maps.places.Autocomplete(
	      /** @type {!HTMLInputElement} */(document.getElementById('direccion')),
	      {types: ['geocode']});

	  autocomplete.addListener('place_changed', fillInAddress);

	function fillInAddress() {
	  // Get the place details from the autocomplete object.
		  var place = autocomplete.getPlace();

		  console.log(place);

		  console.info("latitud", place.geometry.location.lat());
		  console.info("longitud", place.geometry.location.lng());

		  $scope.local.direccion = place.formatted_address;

		  $scope.local.lat = place.geometry.location.lat().toString();

		  $scope.local.lng = place.geometry.location.lng().toString();

		  // Get each component of the address from the place details
		  // and fill the corresponding field on the form.
		  /*for (var i = 0; i < place.address_components.length; i++) {
		    var addressType = place.address_components[i].types[0];
		    if (componentForm[addressType]) {
		      var val = place.address_components[i][componentForm[addressType]];
		      document.getElementById(addressType).value = val;
		    }
		  }*/
	}


	$scope.Guardar = function(){

		console.log($scope.SubidorDeArchivos.queue);
		if($scope.SubidorDeArchivos.queue[0]!=undefined)
		{
			var nombreFoto1 = $scope.SubidorDeArchivos.queue[0]._file.name;
			$scope.local.foto1=nombreFoto1;

			var nombreFoto2 = $scope.SubidorDeArchivos.queue[1]._file.name;
			$scope.local.foto2=nombreFoto2;

			var nombreFoto3 = $scope.SubidorDeArchivos.queue[2]._file.name;
			$scope.local.foto3=nombreFoto3;

			$scope.SubidorDeArchivos.uploadAll();
		}

	};

	
})