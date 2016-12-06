angular.module('app.controllers')

.controller('grillaEmpleadosTransfCtrl', function($scope, $state, $timeout, UsuarioActual, EmpleadoService, i18nService, uiGridConstants){

	$scope.usuario = JSON.parse(UsuarioActual.getFullData());


	$scope.titulo = "Listado de Empleados";

  $scope.empleado = {};


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

    //console.log($scope.gridOptions.columnDefs);

    if ($scope.usuario.tipo == "cliente" || $scope.usuario.tipo == "empleado") {
    	$scope.gridOptions.columnDefs[2].visible = false;
    };
    // Activo la busqueda en todos los campos.
    $scope.gridOptions.enableFiltering = false;
    // Configuracion del idioma.
    i18nService.setCurrentLang('es');

    /*data.data().then(function(rta){
      // Cargo los datos en la grilla.
      $scope.gridOptions.data = rta;
    });*/


    EmpleadoService.traerEmpleadosYEncargados()
    	.then(function (respuesta){

    		console.info("todos los empleados y encargados", respuesta);

    		$scope.gridOptions.data = respuesta.data;

    	}).catch(function (error){

    		$scope.gridOptions.data = [];

    	})

    $scope.transferirEmpleado = function(empleado){

      $scope.empleado = empleado;

    };


    $scope.Aceptar = function(){

      var dato = JSON.stringify($scope.empleado);

      $timeout(function (){

        $state.go("transfEmpleados", {empleado:dato});

      }, 500);
      
      
    };

    function columnDefs () {
      return [
        { field: 'nombre', name: 'nombre', height:45},
        { field: 'email', name: 'email'},
        { field: 'tipo', name: 'tipo'},
        { field: 'transferir', name: 'transferir'
          ,cellTemplate:'<button ng-click="grid.appScope.transferirEmpleado(row.entity)" href="#ventanaTransferir" data-toggle="modal"" class="btn btn-info btn-sm"><i class="glyphicon glyphicon-transfer">&nbsp;Transferir</i></button>'
          ,visible: true
          ,enableFiltering: false
        },
      ];
    }

})