angular.module('app.controllers')

.controller('grillaReservasCtrl', function($scope, $state, $timeout, UsuarioActual, ProductoService, ClienteService, ReservaService, i18nService, uiGridConstants){

	$scope.usuario = JSON.parse(UsuarioActual.getFullData());

  $scope.reservas = {};

  $scope.datosReservas = [];


	$scope.titulo = "Listado de Reservas";


	$scope.gridOptions = {
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
    $scope.gridOptions.enableGridMenu = true;
    $scope.gridOptions.selectAll = true;
    $scope.gridOptions.paginationPageSizes = [25, 50, 75];
    // Configuracion de la paginacion
    $scope.gridOptions.paginationPageSize = 25;

    $scope.gridOptions.columnDefs = columnDefs();

    if ($scope.usuario.tipo == "empleado" || $scope.usuario.tipo == "cliente") {

      $scope.gridOptions.columnDefs[7].visible = false;

    };


    

    //console.log($scope.gridOptions.columnDefs);
    // Activo la busqueda en todos los campos.
    $scope.gridOptions.enableFiltering = true;
    // Configuracion del idioma.
    i18nService.setCurrentLang('es');

    /*data.data().then(function(rta){
      // Cargo los datos en la grilla.
      $scope.gridOptions.data = rta;
    });*/


    ReservaService.traerTodos()
      .then(function (respuesta){

        console.log(respuesta);

        if ($scope.usuario.tipo == "empleado" || $scope.usuario.tipo == "encargado") {

          $scope.gridOptions.data = respuesta.data;

        };


        if($scope.usuario.tipo == "cliente"){

          $scope.reservas = respuesta.data;

          for(var i = 0; i < $scope.reservas.length; i++){

            if ($scope.reservas[i].id_cliente == $scope.usuario.id) {

              $scope.datosReservas.push($scope.reservas[i]);
            
            };

          };

          console.log($scope.datosReservas);

          $scope.gridOptions.data = $scope.datosReservas;

        };

      }).catch(function (error){

        console.log(error);

        $scope.gridOptions.data = [];

      })


    /*$scope.Borrar = function (rta){

    	var dato = JSON.stringify(parseInt(rta.id_producto)); 

      console.log(rta);

    	ProductoService.borrarProducto(dato)
    		.then(function (respuesta){

    			ProductoService.traerTodos()
			    	.then(function (respuesta){

			    		console.info("todos los productos", respuesta);

			    		$scope.gridOptions.data = respuesta.data;

			    	}).catch(function (error){

			    		$scope.gridOptions.data = [];

			    	})

    		}).catch(function (error){

    			console.log(error);

    		})

    }*/

    function columnDefs () {
      return [
        { field: 'nombreCliente', name: 'Nombre Cliente'},
        { field: 'email', name: 'Email Cliente'},
        { field: 'telefono', name: 'Telefono Cliente'},
        { field: 'precio', name: 'Precio Producto'},
        { field: 'nombreProducto', name: 'Nombre Producto'},
        { field: 'fechaReserva', name: 'Fecha Reserva'},
        { field: 'estado', name: 'Estado'},
        { field: 'modificar', name: 'modificar'
          ,cellTemplate:'<button ui-sref="modificarProductos({id_producto:row.entity.id_producto, nombre:row.entity.nombre, precio:row.entity.precio, foto1:row.entity.foto1, foto2:row.entity.foto2, foto3:row.entity.foto3, tipo:row.entity.tipo, descripcion:row.entity.descripcion, id_local:row.entity.id_local})" class="btn btn-warning btn-sm"><i class="glyphicon glyphicon-erase">&nbsp;Modificar</i></button>'
          ,visible: true
          ,enableFiltering: false
        },
      ];
    }

})