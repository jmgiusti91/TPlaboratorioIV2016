angular
	.module('app')
	.service('EstadisticasService', function ($http, factoryRutas){

		function extraerData (data){
      		return data.data;
    	}
		

    	this.ventasLocales = function() {
    		return $http.get('./json/venta_locales.json').then(extraerData); 
    	}

    	this.ventasEmpleados = function() {
    		return $http.get('./json/venta_empleados.json').then(extraerData); 
    	}

    	this.comprasCliente = function() {
    		return $http.get('./json/compras_cliente.json').then(extraerData); 
    	}

    	this.recaudadoDia = function() {
    		return $http.get('./json/recaudado_dia.json').then(extraerData); 
    	}

    	this.ventasTipoProd = function() {
    		return $http.get('./json/tipoProd_ventas.json').then(extraerData); 
    	}
	})