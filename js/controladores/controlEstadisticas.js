angular.module('app.controllers')

.controller('EstadisticasCtrl', function($scope, $state, $timeout, UsuarioActual, EstadisticasService){

	$scope.usuario = JSON.parse(UsuarioActual.getFullData());

	$scope.ventasLocales = {};

	Chart.defaults.global.maintainAspectRatio = false;

	EstadisticasService.ventasLocales()
		.then(function (respuesta){

			$scope.ventasLocales = respuesta;

			console.info("Ventas Locales", respuesta);

			var cantVentasUno = 0;
			var cantVentasDos = 0;
			var cantVentasTres = 0;

			for (var i = 0; i < $scope.ventasLocales.length; i++){

				switch($scope.ventasLocales[i].id_local){

					case 1:
						cantVentasUno += $scope.ventasLocales[i].ventas;
					break;

					case 2:
						cantVentasDos += $scope.ventasLocales[i].ventas;
					break;

					case 3:
						cantVentasTres += $scope.ventasLocales[i].ventas;
					break;

				}

			};

			$scope.labelVentaLocales = ["Av Asamblea", "Bolivar", "Hipolito Yrigoyen"];

			$scope.dataVentaLocales = [cantVentasUno, cantVentasDos, cantVentasTres];

		}).catch(function (error){

			console.log(error);

		})


		EstadisticasService.ventasEmpleados()
		.then(function (respuesta){

			$scope.ventasEmpleados = respuesta;

			console.info("Ventas Empleados", respuesta);

			var cantVentasUno = 0;
			var cantVentasDos = 0;
			var cantVentasTres = 0;
			var cantVentasCuatro = 0;
			var cantVentasCinco = 0;
			var cantVentasSeis = 0;
			var cantVentasSiete = 0;
			var cantVentasOcho = 0;
			var cantVentasNueve = 0;
			var cantVentasDiez = 0;

			for (var i = 0; i < $scope.ventasEmpleados.length; i++){

				switch($scope.ventasEmpleados[i].id_empleado){

					case 1:
						cantVentasUno += $scope.ventasEmpleados[i].ventas;
					break;

					case 2:
						cantVentasDos += $scope.ventasEmpleados[i].ventas;
					break;

					case 3:
						cantVentasTres += $scope.ventasEmpleados[i].ventas;
					break;

					case 4:
						cantVentasCuatro += $scope.ventasEmpleados[i].ventas;
					break;

					case 5:
						cantVentasCinco += $scope.ventasEmpleados[i].ventas;
					break;

					case 6:
						cantVentasSeis += $scope.ventasEmpleados[i].ventas;
					break;

					case 7:
						cantVentasSiete += $scope.ventasEmpleados[i].ventas;
					break;

					case 8:
						cantVentasOcho += $scope.ventasEmpleados[i].ventas;
					break;

					case 9:
						cantVentasNueve += $scope.ventasEmpleados[i].ventas;
					break;

					case 10:
						cantVentasDiez += $scope.ventasEmpleados[i].ventas;
					break;

				}

			};

			$scope.labelVentaEmpleados = ["Grosso", "Materazzi", "Cannavaro", "Zambrotta", "Pirlo", "Gattuso", "Camoranesi", "Totti", "Del Piero", "Inzaghi"];

			$scope.dataVentaEmpleados = [cantVentasUno, cantVentasDos, cantVentasTres, cantVentasCuatro, cantVentasCinco, cantVentasSeis, cantVentasSiete, cantVentasOcho, cantVentasNueve, cantVentasDiez];

		}).catch(function (error){

			console.log(error);

		})


		EstadisticasService.comprasCliente()
		.then(function (respuesta){

			$scope.comprasCliente = respuesta;

			console.info("Compras Clientes", respuesta);

			var cantComprasUno = 0;
			var cantComprasDos = 0;
			var cantComprasTres = 0;
			var cantComprasCuatro = 0;
			var cantComprasCinco = 0;
			var cantComprasSeis = 0;
			var cantComprasSiete = 0;
			var cantComprasOcho = 0;
			var cantComprasNueve = 0;
			var cantComprasDiez = 0;

			for (var i = 0; i < $scope.comprasCliente.length; i++){

				switch($scope.comprasCliente[i].id_cliente){

					case 1:
						cantComprasUno += $scope.comprasCliente[i].compras;
					break;

					case 2:
						cantComprasDos += $scope.comprasCliente[i].compras;
					break;

					case 3:
						cantComprasTres += $scope.comprasCliente[i].compras;
					break;

					case 4:
						cantComprasCuatro += $scope.comprasCliente[i].compras;
					break;

					case 5:
						cantComprasCinco += $scope.comprasCliente[i].compras;
					break;

					case 6:
						cantComprasSeis += $scope.comprasCliente[i].compras;
					break;

					case 7:
						cantComprasSiete += $scope.comprasCliente[i].compras;
					break;

					case 8:
						cantComprasOcho += $scope.comprasCliente[i].compras;
					break;

					case 9:
						cantComprasNueve += $scope.comprasCliente[i].compras;
					break;

					case 10:
						cantComprasDiez += $scope.comprasCliente[i].compras;
					break;

				}

			};

			$scope.labelCompraClientes = ["Ramos", "Puyol", "Pique", "Albiol", "Alonso", "Fabregas", "Xavi", "Iniesta", "Torres", "Villa"];

			$scope.dataCompraClientes = [cantComprasUno, cantComprasDos, cantComprasTres, cantComprasCuatro, cantComprasCinco, cantComprasSeis, cantComprasSiete, cantComprasOcho, cantComprasNueve, cantComprasDiez];

		}).catch(function (error){

			console.log(error);

		})

		EstadisticasService.recaudadoDia()
		.then(function (respuesta){

			$scope.recaudadoDia = respuesta;

			console.info("Importe Dia", respuesta);

			var cantImporteUno = 0;
			var cantImporteDos = 0;
			var cantImporteTres = 0;
			var cantImporteCuatro = 0;
			var cantImporteCinco = 0;
			var cantImporteSeis = 0;
			var cantImporteSiete = 0;

			for (var i = 0; i < $scope.recaudadoDia.length; i++){

				switch($scope.recaudadoDia[i].dia){

					case 1:
						cantImporteUno += $scope.recaudadoDia[i].importe;
					break;

					case 2:
						cantImporteDos += $scope.recaudadoDia[i].importe;
					break;

					case 3:
						cantImporteTres += $scope.recaudadoDia[i].importe;
					break;

					case 4:
						cantImporteCuatro += $scope.recaudadoDia[i].importe;
					break;

					case 5:
						cantImporteCinco += $scope.recaudadoDia[i].importe;
					break;

					case 6:
						cantImporteSeis += $scope.recaudadoDia[i].importe;
					break;

					case 7:
						cantImporteSiete += $scope.recaudadoDia[i].importe;
					break;

				}

			};

			$scope.labelImporteDia = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

			$scope.dataImporteDia = [cantImporteUno, cantImporteDos, cantImporteTres, cantImporteCuatro, cantImporteCinco, cantImporteSeis, cantImporteSiete];

		}).catch(function (error){

			console.log(error);

		})

		EstadisticasService.ventasTipoProd()
		.then(function (respuesta){

			$scope.ventasTipoProd = respuesta;

			console.info("Importe Dia", respuesta);

			var cantImporteUnoInicio = 0;
			var cantImporteDosInicio = 0;
			var cantImporteTresInicio = 0;
			var cantImporteUnoFin = 0;
			var cantImporteDosFin = 0;
			var cantImporteTresFin = 0;

			for (var i = 0; i < $scope.ventasTipoProd.length; i++){

				switch($scope.ventasTipoProd[i].id_tipo){

					case 1:
						cantImporteUnoInicio += $scope.ventasTipoProd[i].ventasInicio;
						cantImporteUnoFin += $scope.ventasTipoProd[i].ventasFin;
					break;

					case 2:
						cantImporteDosInicio += $scope.ventasTipoProd[i].ventasInicio;
						cantImporteDosFin += $scope.ventasTipoProd[i].ventasFin;
					break;

					case 3:
						cantImporteTresInicio += $scope.ventasTipoProd[i].ventasInicio;
						cantImporteTresFin += $scope.ventasTipoProd[i].ventasFin;
					break;

				}

			};

			$scope.labelImporteTipoProd = ["01/11/2016", "30/11/2016"];

			$scope.seriesTipoProd = ['Pizzas', 'Picadas', 'Postres'];

			$scope.dataImporteTipoProd = [[cantImporteUnoInicio, cantImporteUnoFin], [cantImporteDosInicio, cantImporteDosFin], [cantImporteTresInicio, cantImporteTresFin]];

		}).catch(function (error){

			console.log(error);

		})

})