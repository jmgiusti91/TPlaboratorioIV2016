angular.module('app.controllers')

.controller("controlLogin", function($scope, $auth, $state, UsuarioActual, $rootScope){

	$scope.usuario = {};

	if ($auth.isAuthenticated()){
		console.info("getToken", $auth.getToken());
		console.info("token", $auth.getPayload());
	} else{
	    console.info("token", $auth.getPayload());
	    console.info("Factory Usuario Actual", UsuarioActual.getFullData());
	}
	    	

	$scope.IngresoCliente = function(){
		$scope.usuario.email = "cliente1@cliente1.com";
		$scope.usuario.clave = "1234";
	}

	$scope.IngresoEmpleado = function(){
		$scope.usuario.email = "empleado1@empleado1.com";
		$scope.usuario.clave = "1234";
	}

	$scope.IngresoEncargado = function(){
		$scope.usuario.email = "encargado1@encargado1.com";
		$scope.usuario.clave = "1234";
	}

	$scope.IngresoAdmin = function(){
		$scope.usuario.email = "administrador1@administrador1.com";
		$scope.usuario.clave = "1234";
	}


	$scope.Guardar=function(){

	/*$auth.authenticate('github')
	  .then(function(response) {
	    alert(response);
	  })
	  .catch(function(response) {
	    alert(response);
	  });*/
	$auth.login($scope.usuario)
	  .then(function(response) {
	    console.info("correcto", response); //Sabemos que nos devuelve un token correcto SOLO CON EL ISAUTHENTICATED
	    if ($auth.isAuthenticated()){
	    	console.info("token", $auth.getPayload());
	    	UsuarioActual.login($auth.getPayload().nombre, $auth.getPayload().email,  $auth.getPayload().tipo);
	    	$rootScope.userActual = JSON.parse(UsuarioActual.getFullData());
	    	$rootScope.userActual.login = true;
	    	$state.go('bienvenida');
	    }
	    else
	    	console.info("no token", $auth.getPayload());

	  })
	  .catch(function(response) {
	    console.info("NO volvio bien", response);
	  });

	}
	
})