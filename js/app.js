angular.module('app', ['app.controllers', 'ui.router', 'angularFileUpload', 'satellizer'])


.config(function ($stateProvider, $urlRouterProvider, $authProvider){

	$authProvider.loginUrl ="LAB-IV/pizzeria-argenta/TPlaboratorioIV2016/ws1/servidor/jwt/php/auth.php";
	$authProvider.tokenName = "MiTokenGeneradoEnPHP";
	$authProvider.tokenPrefix="Aplicacion";
	$authProvider.authHeader="data";

	$authProvider.github({
      clientId: 'f169fb02e2243674fcb5'
    });

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

	//$urlRouterProvider.otherwise("/inicio");

})


