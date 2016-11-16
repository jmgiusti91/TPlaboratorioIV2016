angular.module('app.controllers')

.controller("IndexCtrl", function($scope, $auth, UsuarioActual, $rootScope, $state){

	$scope.Logout = function (){

		$auth.logout();

		UsuarioActual.login("", "", "");

		$rootScope.userActual = {};
		$rootScope.userActual.login = false;
		$rootScope.userActual.nombre = "JuanGiusti";

		$state.go('log.login');

	};
	
})