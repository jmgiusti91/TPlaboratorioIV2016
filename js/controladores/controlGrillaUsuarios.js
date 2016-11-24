angular.module('app.controllers')

.controller('grillaUsuariosCtrl', function($scope, $state, $timeout, UsuarioActual, ClienteService, EmpleadoService, i18nService, uiGridConstants){

	$scope.usuario = JSON.parse(UsuarioActual.getFullData());


	$scope.titulo = "Listado de Usuarios";

  $scope.listado = [];


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


    ClienteService.traerTodos()
    	.then(function (respuesta){

    		console.info("todos los clientes", respuesta);

    		for (var i = 0; i < respuesta.data.length; i++){

          $scope.user = {};

          $scope.user.id = respuesta.data[i].id_cliente;
          $scope.user.habilitado = respuesta.data[i].habilitado;
          $scope.user.nombre = respuesta.data[i].nombre;
          $scope.user.email = respuesta.data[i].email;
          $scope.user.tipo = "cliente";

          $scope.listado[i] = $scope.user;

        };

        console.log($scope.listado);

        EmpleadoService.traerTodos()
          .then(function (respuesta){

            console.info("todos los empleados", respuesta);

            for (var i = 0; i < respuesta.data.length; i++){

              $scope.user = {};

              if (respuesta.data[i].tipo != "empleado") {
                continue;
              } else {

                $scope.user.id = respuesta.data[i].id_empleado;
                $scope.user.habilitado = respuesta.data[i].habilitado;
                $scope.user.nombre = respuesta.data[i].nombre;
                $scope.user.email = respuesta.data[i].email;
                $scope.user.tipo = "empleado";

                $scope.listado.push($scope.user);

              }
              

            };

            $scope.gridOptions.data = $scope.listado;       

          }).catch(function (error){

            console.log(error);

          })

    	}).catch(function (error){

        console.log(error);

    	})


      $scope.Inhabilitar = function(user){

        if(user.tipo == "empleado"){

          user.habilitado = 0;

          var idEmpleado = JSON.stringify(parseInt(user.id));
          var habilit = JSON.stringify(parseInt(user.habilitado));

          EmpleadoService.habilitar(idEmpleado, habilit)
            .then(function (respuesta){

              console.log(respuesta);

            }).catch(function (error){

              console.log(error);

            })

        };

        if(user.tipo == "cliente"){

          user.habilitado = 0;

          var idCliente = JSON.stringify(parseInt(user.id));
          var habilit = JSON.stringify(parseInt(user.habilitado));

          ClienteService.habilitar(idCliente, habilit)
            .then(function (respuesta){

              console.log(respuesta);

            }).catch(function (error){

              console.log(error);

            })

        };

      };


      $scope.Habilitar = function(user){

        if(user.tipo == "empleado"){

          user.habilitado = 1;

          var idEmpleado = JSON.stringify(parseInt(user.id));
          var habilit = JSON.stringify(parseInt(user.habilitado));

          EmpleadoService.habilitar(idEmpleado, habilit)
            .then(function (respuesta){

              console.log(respuesta);

            }).catch(function (error){

              console.log(error);

            })

        };


        if(user.tipo == "cliente"){

          user.habilitado = 1;

          var idCliente = JSON.stringify(parseInt(user.id));
          var habilit = JSON.stringify(parseInt(user.habilitado));

          ClienteService.habilitar(idCliente, habilit)
            .then(function (respuesta){

              console.log(respuesta);

            }).catch(function (error){

              console.log(error);

            })

        };

      };


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
        { field: 'nombre', name: 'nombre', height:45},
        { field: 'email', name: 'email'},
        { field: 'tipo', name: 'tipo'},
        { field: 'inhabilitar', name: 'inhabilitar'
          ,cellTemplate:'<button ng-click="grid.appScope.Inhabilitar(row.entity)" class="btn btn-danger btn-sm"><i class="glyphicon glyphicon-ban-circle">&nbsp;Inhabilitar</i></button>'
          ,visible: true
          ,enableFiltering: false
        },
        { field: 'habilitar', name: 'habilitar'
          ,cellTemplate:'<button ng-click="grid.appScope.Habilitar(row.entity)" class="btn btn-info btn-sm"><i class="glyphicon glyphicon-ok-circle">&nbsp;Habilitar</i></button>'
          ,visible: true
          ,enableFiltering: false
        },
      ];
    }

})