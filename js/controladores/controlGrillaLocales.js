angular.module('app.controllers')

.controller('grillaLocalesCtrl', function($scope, $state, $timeout, UsuarioActual, LocalService, ProductoService, ReservaService, ClienteService, i18nService, uiGridConstants){

	$scope.usuario = JSON.parse(UsuarioActual.getFullData());

	$scope.titulo = "Listado de Locales";

  $scope.verProductos = false;

  var fecha = new Date();

  //var fechaMinima = fecha.setDate(fecha.getDate() + 10);

  $scope.fechaMin = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + (fecha.getDate() + 2); 

  $scope.fechaMax = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + (fecha.getDate() + 5);

  $scope.reserva = {};

  $scope.listadoClientes = {};


	$scope.gridLocales = {
      // Configuracion para exportar datos.
      exporterCsvFilename: 'misdatos.csv',
      exporterCsvColumnSeparator: ';',
      exporterPdfDefaultStyle: {fontSize: 9},
      exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
      exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
      exporterPdfHeader: { text: "My Header", style: 'headerStyle' },
      exporterPdfFooter: function ( currentPage, pageCount ) {
        return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
      },
      exporterPdfCustomFormatter: function ( docDefinition ) {
        docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
        docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
        return docDefinition;
      },
      exporterPdfOrientation: 'portrait',
      exporterPdfPageSize: 'LETTER',
      exporterPdfMaxGridWidth: 500,
      exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
      onRegisterApi: function(gridApi){
        $scope.gridApi = gridApi;
      }
    };
    $scope.gridLocales.enableGridMenu = true;
    $scope.gridLocales.selectAll = true;
    $scope.gridLocales.paginationPageSizes = [25, 50, 75];
    // Configuracion de la paginacion
    $scope.gridLocales.paginationPageSize = 25;
    $scope.gridLocales.columnDefs = columnDefs();

    //console.log($scope.gridLocales.columnDefs);
    // Activo la busqueda en todos los campos.
    $scope.gridLocales.enableFiltering = false;
    // Configuracion del idioma.
    i18nService.setCurrentLang('es');

    /*data.data().then(function(rta){
      // Cargo los datos en la grilla.
      $scope.gridLocales.data = rta;
    });*/


    LocalService.traerTodos()
    	.then(function (respuesta){

    		console.info("todos los locales", respuesta);

    		$scope.gridLocales.data = respuesta.data;

    	}).catch(function (error){

    		$scope.gridLocales.data = [];

    	})


      if ($scope.usuario.tipo == 'encargado' || $scope.usuario.tipo == 'empleado') {

        ClienteService.traerTodos()
          .then(function (respuesta){

            $scope.listadoClientes = JSON.parse(JSON.stringify(respuesta.data));

            console.log($scope.listadoClientes);

            $scope.reserva.id_cliente = $scope.listadoClientes[0].id_cliente.toString();

          }).catch(function (error){

            $scope.listadoClientes = {};

            console.log(error);

          });

      };


     $scope.traerProductos = function(local){

        $scope.verProductos = true;

        $scope.gridProductos = {
          // Configuracion para exportar datos.
          exporterCsvFilename: 'misdatos.csv',
          exporterCsvColumnSeparator: ';',
          exporterPdfDefaultStyle: {fontSize: 9},
          exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
          exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
          exporterPdfHeader: { text: "My Header", style: 'headerStyle' },
          exporterPdfFooter: function ( currentPage, pageCount ) {
            return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
          },
          exporterPdfCustomFormatter: function ( docDefinition ) {
            docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
            docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
            return docDefinition;
          },
          exporterPdfOrientation: 'portrait',
          exporterPdfPageSize: 'LETTER',
          exporterPdfMaxGridWidth: 500,
          exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
          onRegisterApi: function(gridApi){
            $scope.gridApi = gridApi;
          }
        };
        $scope.gridProductos.enableGridMenu = true;
        $scope.gridProductos.selectAll = true;
        $scope.gridProductos.paginationPageSizes = [25, 50, 75];
        // Configuracion de la paginacion
        $scope.gridProductos.paginationPageSize = 25;
        $scope.gridProductos.columnDefs = columnProductos();

        $scope.gridProductos.enableFiltering = false;

        var idLocal = JSON.stringify(parseInt(local.id_local));

        ProductoService.traerProductosPorLocal(idLocal)
          .then(function (respuesta){

            console.log(respuesta);

            $scope.gridProductos.data = respuesta.data;

          }).catch(function (error){

            console.log(error);

            $scope.gridProductos.data = [];

          })

      };


      $scope.realizarReserva = function(producto){

        $scope.producto = producto;

      };


      $scope.Reservar = function(){

        if ($scope.usuario.tipo == 'cliente') {

          $scope.reserva.id_cliente = $scope.usuario.id;
          $scope.reserva.id_producto = $scope.producto.id_producto;
          $scope.reserva.estado = "activo";
          console.log($scope.reserva);

        } else if ($scope.usuario.tipo == 'encargado' || $scope.usuario.tipo == 'empleado'){

          $scope.reserva.id_producto = $scope.producto.id_producto;
          $scope.reserva.estado = "activo";
          console.log($scope.reserva);

        }

        var reserva = JSON.stringify($scope.reserva);

          ReservaService.insertarReserva(reserva)
            .then(function (respuesta){

              console.log(respuesta);

            }).catch(function (error){

              console.log(error);

            })

      };


    /*$scope.Borrar = function (rta){

    	var dato = JSON.stringify(parseInt(rta.id_producto)); 

      console.log(rta);

    	ProductoService.borrarProducto(dato)
    		.then(function (respuesta){

    			ProductoService.traerTodos()
			    	.then(function (respuesta){

			    		console.info("todos los productos", respuesta);

			    		$scope.gridLocales.data = respuesta.data;

			    	}).catch(function (error){

			    		$scope.gridLocales.data = [];

			    	})

    		}).catch(function (error){

    			console.log(error);

    		})

    }*/

    function columnProductos () {
      return [
        { field: 'nombre', name: 'nombre', height:45},
        { field: 'precio', name: 'precio'},
        { field: 'tipo', name: 'tipo'},
        { field: 'reserva', name: 'reserva'
          ,cellTemplate:'<button ng-click="grid.appScope.realizarReserva(row.entity)" class="btn btn-success btn-sm" href="#ventanaReserva" data-toggle="modal">Reservar!</button>'
          ,visible: true
          ,enableFiltering: false
        },
      ];
    }


    function columnDefs () {
      return [
        { field: 'direccion', name: 'direccion', height:45},
        { field: 'local', name: 'local'
          ,cellTemplate:'<button ui-sref="locales-perfil">Ver Local</button>'
          ,enableFiltering: false
        },
        { field: 'productos', name: 'productos'
          ,cellTemplate:'<button ng-click="grid.appScope.traerProductos(row.entity)">Ver Productos</button>'
          ,enableFiltering: false
        }
      ];
    }

})