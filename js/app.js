angular.module('app', ['app.controllers', 'ui.router', 'angularFileUpload', 'satellizer'])


.config(function ($stateProvider, $urlRouterProvider, $authProvider){

	$authProvider.loginUrl ="LAB-IV/pizzeria-argenta/TPlaboratorioIV2016/ws1/servidor/jwt/php/auth.php";
	$authProvider.tokenName = "MiTokenGeneradoEnPHP";
	$authProvider.tokenPrefix="Aplicacion";
	$authProvider.authHeader="data";

	$stateProvider
		.state("inicio", {
			url:"/inicio",
			templateUrl:"inicio.html",
			controller:"controlInicio"
		})

		.state("log", {
			url:"/log",
			abstract:true,
			templateUrl:"log-abstract.html"
		})

		.state("log.login", {
			url:"/login",
			views: {
				"registro": {
					templateUrl:"login.html",
					controller:"controlLogin"
				}
			}
		})

		.state("log.register", {
			url:"/register",
			views: {
				"registro": {
					templateUrl:"register.html",
					controller:"controlRegistro"
				}
			}
		})

	//$urlRouterProvider.otherwise("/inicio");

})


