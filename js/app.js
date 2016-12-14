angular.module('app', ['app.controllers', 'ui.router', 'angularFileUpload', 'satellizer', 'ui.grid', 'ui.grid.pagination', 'ui.grid.resizeColumns', 'ui.grid.selection', 'ui.grid.exporter', 'ui.grid.edit', 'ngMap', 'chart.js'])

.run(function($rootScope){

	$rootScope.userActual = {};
	$rootScope.userActual.login = false;
	$rootScope.userActual.nombre = "JuanGiusti";

	$rootScope.haceEncuesta = true;

})

.config(function ($stateProvider, $urlRouterProvider, $authProvider){

	$authProvider.loginUrl ="LAB-IV/pizzeria-argenta/TPlaboratorioIV2016/ws1/servidor/jwt/php/auth.php";
	$authProvider.tokenName = "MiTokenDePizzeriasArgenta";
	$authProvider.tokenPrefix="Aplicacion";
	$authProvider.authHeader="data";

	$stateProvider
		.state("inicio", {
			url:"/",
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
			url:"/locales-perfil/:idLocal",
			cache: false,
			templateUrl: "locales-perfil.html",
			controller:"localesPerfilCtrl"
		})

		.state("altaProductos", {
			url:"/altaProductos",
			templateUrl: "altaProductos.html",
			controller:"altaProductosCtrl"
		})

		.state("productos-perfil", {
			url:"/productos-perfil/:idProducto",
			cache: false,
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

		.state("grillaProductos", {
			url:"/grillaProductos",
			templateUrl: "grillaProductos.html",
			controller:"grillaProductosCtrl"
		})

		.state("modificarProductos", {
			url:"/modificarProductos/{id_producto}?:nombre:descripcion:foto1:foto2:foto3:tipo:precio:id_local",
			templateUrl: "altaProductos.html",
			controller:"modificarProductosCtrl"
		})

		.state("grillaLocales", {
			url:"/grillaLocales",
			templateUrl: "grillaLocales.html",
			controller:"grillaLocalesCtrl"
		})

		.state("grillaReservas", {
			url:"/grillaReservas",
			templateUrl: "grillaReservas.html",
			controller:"grillaReservasCtrl"
		})

		.state("grillaUsuarios", {
			url:"/grillaUsuarios",
			templateUrl: "grillaUsuarios.html",
			controller:"grillaUsuariosCtrl"
		})

		.state("modificarReservas", {
			url:"/modificarReservas/{id_producto}?:id_cliente:fechaReserva:estado",
			templateUrl: "modificarReservas.html",
			controller:"modificarReservasCtrl"
		})

		.state("grillaLocalesModificar", {
			url:"/grillaLocalesModificar",
			templateUrl: "grillaLocalesModificar.html",
			controller:"grillaLocalesModificarCtrl"
		})

		.state("modificarLocales", {
			url:"/modificarLocales/{id_local}?:direccion:lat:lng:id_encargado:cant_empleados",
			templateUrl: "altaLocales.html",
			controller:"modificarLocalesCtrl"
		})

		.state("grillaEmpleadosTransf", {
			url:"/grillaEmpleadosTransf",
			templateUrl: "grillaEmpleadosTransf.html",
			controller:"grillaEmpleadosTransfCtrl"
		})

		.state("transfEmpleados", {
			url:"/transfEmpleados/:empleado",
			cache:false,
			templateUrl: "transfEmpleados.html",
			controller:"transfEmpleadosCtrl"
		})

		.state("encuesta", {
			url:"/encuesta",
			templateUrl: "encuesta.html",
			controller:"EncuestaCtrl"
		})

		.state("estadisticas", {
			url:"/estadisticas",
			templateUrl: "estadisticas.html",
			controller:"EstadisticasCtrl"
		})

	//$urlRouterProvider.otherwise("/");

})


