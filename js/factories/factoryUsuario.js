angular
	.module('app')
	.factory('UsuarioActual', [function(){

		var nombre = "";
		var email = "";
		var tipo = "";
		var id = "";

		return {

			login:function(name,mail,type,id_usu){

				nombre = name;
				email = mail;
				tipo = type;
				id=id_usu;

			},getName:function(){
				return nombre;
			},getEmail:function(){
				return email;
			},getTipo:function(){
				return tipo;
			},getFullData:function(){
				var jsonUsuario = {};
				jsonUsuario.nombre = nombre;
				jsonUsuario.email = email;
				jsonUsuario.tipo = tipo;
				jsonUsuario.id = id;

				return JSON.stringify(jsonUsuario);
			}

		};

	}])