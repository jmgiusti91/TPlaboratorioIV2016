angular.module('app.controllers')

.controller('mapaCtrl', function($scope, $state, $timeout, LocalService, UsuarioActual){

	var vm = this;

	$scope.usuario = JSON.parse(UsuarioActual.getFullData());

	$scope.listadoLocales = {};

	$scope.localizacionActual = {};

	$scope.destino = {};

	var options = {
				maximumAge: 50000,
				timeout: 20000,
                enableHighAccuracy: true
            };

	  if (navigator.geolocation) {
		    navigator.geolocation.getCurrentPosition(function(position) {
		      $scope.localizacionActual = {
		        lat: position.coords.latitude,
		        lng: position.coords.longitude
		      };
		    }, function(error){
		    	console.log(error.message);
		    	jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCQP6UEJy0yokHj7dkWM6exrkt7iP1qBu0", function(success) {
					$scope.localizacionActual = {
				        lat: success.location.lat,
				        lng: success.location.lng
				      };
  				})
		    }, options);
	  }

	  LocalService.traerTodosActivos(1)
    	.then(function (respuesta){

    		console.info("todos los locales", respuesta);

    		$scope.listadoLocales = respuesta.data;

    	}).catch(function (error){

    		$scope.listadoLocales = {};

    	})


    $scope.IndicarRuta = function(event, latitud, longitud){

    	console.log("entre aca!");
    	console.log(latitud);
    	console.log(longitud);

    	$scope.destino.lat = latitud;
    	$scope.destino.lng = longitud;

    	$scope.$apply();

    };

})