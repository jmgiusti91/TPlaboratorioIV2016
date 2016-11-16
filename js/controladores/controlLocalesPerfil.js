angular.module('app.controllers')

.controller("localesPerfilCtrl", function($scope, LocalService){

	LocalService.traerTodos()
 	.then(function(respuesta) {     	

      	 $scope.ListadoLocales = respuesta.data;
      	 console.log(respuesta);
      	 console.log(respuesta.data.length);
      	 var arrayLocal = $scope.ListadoLocales[respuesta.data.length - 1];
      	 console.log(arrayLocal);
      	 $scope.local={};
		 $scope.local.id=arrayLocal['id_local'];
		 $scope.local.direccion=arrayLocal['direccion'];
		 $scope.local.foto1=arrayLocal['foto1'];
		 $scope.local.foto2=arrayLocal['foto2'];
		 $scope.local.foto3=arrayLocal['foto3'];

    },function errorCallback(response) {
     	$scope.ListadoLocales= [];
     	console.log( response);
     			
 	 });

});