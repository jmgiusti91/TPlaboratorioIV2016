angular
  .module('app')
  .factory('factoryRutas', function (){
  	var objeto = {};

    objeto.nombre = "Factory de rutas";

    objeto.RutaClientes = 'http://localhost:8080/LAB-IV/pizzeria-argenta/TPlaboratorioIV2016/ws1/clientes/';

    objeto.RutaEmpleados = 'http://localhost:8080/LAB-IV/pizzeria-argenta/TPlaboratorioIV2016/ws1/empleados/';

    objeto.RutaLocales = 'http://localhost:8080/LAB-IV/pizzeria-argenta/TPlaboratorioIV2016/ws1/locales/';

    objeto.RutaProductos = 'http://localhost:8080/LAB-IV/pizzeria-argenta/TPlaboratorioIV2016/ws1/productos/';

    return objeto;


    
  })