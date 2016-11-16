angular.module('app', ['app.controllers', 'ui.router', 'angularFileUpload', 'satellizer'])

.run(function($rootScope){

	$rootScope.userActual = {};
	$rootScope.userActual.login = false;
	$rootScope.userActual.nombre = "JuanGiusti";

})

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

		.state("bienvenida", {
			url:"/bienvenida",
			templateUrl: "bienvenida.html",
			controller:"BienvenidaCtrl"
		})

		.state("altaLocales", {
			url:"/altaLocales",
			templateUrl: "altaLocales.html",
			controller:"altaLocalesCtrl"
		})

		.state("locales-perfil", {
			url:"/locales-perfil",
			templateUrl: "locales-perfil.html",
			controller:"localesPerfilCtrl"
		})

		.state("altaProductos", {
			url:"/altaProductos",
			templateUrl: "altaProductos.html",
			controller:"altaProductosCtrl"
		})

		.state("productos-perfil", {
			url:"/productos-perfil",
			templateUrl: "productos-perfil.html",
			controller:"productosPerfilCtrl"
		})

		.state("altaEmpleados", {
			url:"/altaEmpleados",
			templateUrl: "altaEmpleados.html",
			controller:"altaEmpleadosCtrl"
		})

		.state("altaClientes", {
			url:"/altaClientes",
			templateUrl: "register.html",
			controller:"controlRegistro"
		})

	//$urlRouterProvider.otherwise("/inicio");

})


