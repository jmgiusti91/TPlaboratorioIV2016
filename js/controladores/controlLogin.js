angular.module('app.controllers')

.controller("controlLogin", function($scope, $auth){

	$scope.usuario = {};
	$scope.registro = false;
	console.log("Hola");

	if ($auth.isAuthenticated()){
		console.info("getToken", $auth.getToken());
		console.info("token", $auth.getPayload());
	} else{
	    console.info("token", $auth.getPayload());
	}
	    	

	$scope.Registrarse=function(){
		$scope.registro = true;
	}

	$scope.Volver=function(){
		$scope.registro = false;
	}

	$scope.Guardar=function(){

	$auth.authenticate('github')
	  .then(function(response) {
	    alert(response);
	  })
	  .catch(function(response) {
	    alert(response);
	  });
	/*$auth.login($scope.usuario)
	  .then(function(response) {
	    console.info("correcto", response); //Sabemos que nos devuelve un token correcto SOLO CON EL ISAUTHENTICATED
	    if ($auth.isAuthenticated())
	    	console.info("token", $auth.getPayload());
	    else
	    	console.info("no token", $auth.getPayload());
	  })
	  .catch(function(response) {
	    console.info("NO volvio bien", response);
	  });*/

	}
	
})