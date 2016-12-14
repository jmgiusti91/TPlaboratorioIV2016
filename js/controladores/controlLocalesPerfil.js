angular.module('app.controllers')

.controller("localesPerfilCtrl", function($scope, LocalService, $stateParams){

  $scope.idLocalParams = JSON.parse($stateParams.idLocal);
  $scope.idLocalParams = parseInt($scope.idLocalParams);
  console.log($scope.idLocalParams);
	LocalService.traerTodos()
 	.then(function(respuesta) {     	

      	 $scope.ListadoLocales = respuesta.data;
      	 console.log(respuesta);
      	 console.log(respuesta.data.length);

         for(var i = 0; i < $scope.ListadoLocales.length; i++){

            if ($scope.idLocalParams == $scope.ListadoLocales[i].id_local) {

              var arrayLocal = $scope.ListadoLocales[i];
              console.log(arrayLocal);
              $scope.local={};
              $scope.local.id=arrayLocal['id_local'];
              $scope.local.direccion=arrayLocal['direccion'];
              $scope.local.foto1=arrayLocal['foto1'];
              $scope.local.foto2=arrayLocal['foto2'];
              $scope.local.foto3=arrayLocal['foto3'];

              break;
            };

         };

    },function errorCallback(response) {
     	$scope.ListadoLocales= [];
     	console.log( response);
     			
 	 });

});