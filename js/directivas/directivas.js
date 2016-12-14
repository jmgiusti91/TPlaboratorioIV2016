angular
	.module('app')
	.directive('directivaBienvenida', function(){

		return {
			scope: {miUsuario: '=usuarioporparametro'},
			replace: true,
			restrict: 'E',
			link: function(scope, element, attrs) {
            	$('.hover').hover(function(){
			      $(this).addClass('flip');
			    },function(){
			      $(this).removeClass('flip');
			    });
        	},
			templateUrl: 'templates/templateBienvenida.html'
		};

	})