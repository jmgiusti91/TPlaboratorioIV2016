angular.module('app.controllers')

.controller('grillaLocalesModificarCtrl', function($scope, $state, $timeout, UsuarioActual, LocalService, i18nService, uiGridConstants){

	$scope.usuario = JSON.parse(UsuarioActual.getFullData());


	$scope.titulo = "Listado de Locales";


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
    $scope.gridOptions.rowHeight = 100;
    // Configuracion de la paginacion
    $scope.gridOptions.paginationPageSize = 25;
    $scope.gridOptions.columnDefs = columnDefs();

    //console.log($scope.gridOptions.columnDefs);
    // Activo la busqueda en todos los campos.
    $scope.gridOptions.enableFiltering = false;
    // Configuracion del idioma.
    i18nService.setCurrentLang('es');

    /*data.data().then(function(rta){
      // Cargo los datos en la grilla.
      $scope.gridOptions.data = rta;
    });*/


    LocalService.traerTodos()
    	.then(function (respuesta){

    		console.info("todos los locales", respuesta);

    		$scope.gridOptions.data = respuesta.data;

    	}).catch(function (error){

    		$scope.gridOptions.data = [];

    	})

    function columnDefs () {
      return [
        { field: 'direccion', name: 'direccion', height:150},
        { field: 'foto1', name: 'foto1', cellTemplate:"<img width='150px' ng-src='fotos/{{row.entity.foto1}}' lazy-src>" },
        { field: 'modificar', name: 'modificar'
          ,cellTemplate:'<button ui-sref="modificarLocales({id_local:row.entity.id_local, direccion:row.entity.direccion, lat:row.entity.lat, lng:row.entity.lng, id_encargado:row.entity.id_encargado, cant_empleados:row.entity.cant_empleados})" class="btn btn-warning btn-sm"><i class="glyphicon glyphicon-erase">&nbsp;Modificar</i></button>'
          ,visible: true
          ,enableFiltering: false
        },
      ];
    }

})