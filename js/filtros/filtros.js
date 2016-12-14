angular.module('app')
  .filter('tipoProducto', function () {
    var tipo = {
      'pizzas': 'Pizzas',
      'picadas': 'Picadas',
      'postres': 'Postres'
    }
    return function (input) {
      if (!input)
        return '';
      return tipo[input];
    };
  })
  .filter('tipoEstado', function () {
    var tipo = {
      'activo': 'Activo',
      'consumido': 'Consumido',
      'calificado': 'Calificado',
      'cancelado': 'Cancelado'
    }
    return function (input) {
      if (!input)
        return '';
      return tipo[input];
    };
  });