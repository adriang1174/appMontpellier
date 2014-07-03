
$(document).ready(function () {
	
	if (localStorage["name"]) {
		$('#name').val(localStorage["name"]);
	}
	else{
			$.fancybox("#inline");
	}

	$( ".contenidoSeccion" ).css( "height", "0" );	
	
	for (var i = 0; i < $( ".contenidoSeccion" ).length; i++) {
		$( ".contenidoSeccion:eq("+i+")" ).data("posicion",  $(".botonSeccion:eq("+i+")").position().top);
	}
	
	altoRedes=$( window ).height()-150;
	$('#seccionFacebook .container').html('<iframe src="http://www.facebook.com/plugins/likebox.php?href=http://www.facebook.com/ComunidadResidentesArgentina&amp;stream=true&show_faces=false&show_border=false&header=false&height='+altoRedes+'" scrolling="no" frameborder="0" allowTransparency="true" height="'+altoRedes+'"></iframe>');

	$('#seccionTwitter .container').html('<a class="twitter-timeline" href="https://twitter.com/ResidentesArg" data-tweet-limit="7" height="'+altoRedes+'" data-widget-id="467785476154200064" data-chrome="nofooter noborders transparent">Tweets por @ResidentesArg</a>');
	!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

	$( document ).on( "vclick", ".botonSeccion", function() {
		seccion=$(this).data( "seccion" );
		
		//Cambiamos el alto dinamicamente
		$( ".contenidoSeccion" ).css( "height", "0" );	
		
		altoNuevo=$( seccion+" .container").outerHeight()+"px";
		//alert(altoNuevo);
		//Abre o cierra la sección
		if($( seccion ).css( "height")!="0px")
		{   //Cierra
		     $( seccion ).css( "height", "0px" );
		}
		else
		{	
			//Abre
			//Buscamos data de la sección (solo cuando abre)
			
			if(seccion=="#seccionProximosEventos") {
				getEvents();
			}	else {
				altoNuevo=$( seccion+" .container").outerHeight()+"px";
				$( seccion ).css( "height", altoNuevo );
			}
			$('html, body').animate({scrollTop:$( seccion).data("posicion")+150}, 300);
			
			
		}
	});
	
	$( document ).on( "vmousedown", ".botonSeccion", function() {		$( ".botonSeccion" ).removeClass( "botonSeccionHover" ); $( ".botonSeccion2" ).removeClass( "botonSeccion2Hover" ); $( this ).addClass( "botonSeccionHover" );	});
	$( document ).on( "vmouseup", ".botonSeccion", function() {		$( this ).removeClass( "botonSeccionHover" );	});
	$( document ).on( "vmousedown", ".botonSeccion2", function() {	$( ".botonSeccion" ).removeClass( "botonSeccionHover" ); $( ".botonSeccion2" ).removeClass( "botonSeccion2Hover" ); $( this ).addClass( "botonSeccion2Hover" );	});
	$( document ).on( "vmouseup", ".botonSeccion2", function() {		$( this ).removeClass( "botonSeccion2Hover" );	});
	
	$("#botonEnviarInvitacion").click(function() {
		   hayCamposEnBlanco=false;
			for (var i = 0; i < $( ".campo" ).length-1; i++) {
				if ( $( ".campo:eq("+i+")" ).val() == "" ) {
					hayCamposEnBlanco=true;
				};
			}
			if (hayCamposEnBlanco) {
				alert("Por favor complete todos los campos para enviar el formulario");
			} else {
				$('#invita').val(localStorage["name"]);
				var postData = $('#ajaxform').serializeArray();
				$.ajax({
					 type: "POST",
					 url: 'http://www.comunidadresidentes.com.ar/appmontpellier/invita.php',
					 data : postData,
					 dataType: "html",
					 success: function(data) {
						if(data != "OK") {
							alert("Se ha producido un error al enviar la invitación. Intente más tarde");
							//$('#txtRes').html("Se ha producido un error al enviar la invitación. Intente más tarde");
						}
						else {
							alert("Se ha enviado la invitación exitosamente"); $('.campo').val("");
							//$('#txtRes').html("Se ha enviado la invitación exitosamente");
							$('#ajaxform').clear();
						}
					},
					error: function(xhr, error){
						 alert("Se ha producido un error al enviar la invitación. Intente más tarde");
				}
				});
			}
	});	
	
	$('#nameForm').submit(function() {
		localStorage["name"] = $('#name').val();
		$.fancybox.close();
	});	
	
	$(".modalbox").fancybox();
	
	$( ".eventoMasInfo" ).css({
		'transform':'translate(500px,0)',
		'-moz-transform': 'translate(500px,0)',
		'-webkit-transform': 'translate(500px,0)',
	});
	
	$( document ).on( "vclick", ".botonMasInfo a", function() {
		eventoNum=$(this).data("evento");
		$( "#proximosEventos" ).css({
			'transform':'scale(0)',
			'-moz-transform': 'scale(0)',
			'-webkit-transform': 'scale(0)',
		});
		$( "#proximosEventos" ).css({
			'opacity':'0'
		});
		$( "#proximosEventos" ).css({
			'z-index':'0'
		});
		$( ".eventoMasInfo:eq("+eventoNum+")" ).css({
			'display':'block'
		});
		$( ".eventoMasInfo:eq("+eventoNum+")" ).css({
			'transform':'scale(1)',
			'-moz-transform': 'scale(1)',
			'-webkit-transform': 'scale(1)',
		});
		$( ".eventoMasInfo:eq("+eventoNum+")" ).css({
			'opacity':'1'
		});
		$( '#seccionProximosEventos .container').scrollTop( 0 );
	});
	
	$( document ).on( "vclick", ".botonVolver a", function() {
		$( ".eventoMasInfo" ).css({
			'transform':'scale(0)',
			'-moz-transform': 'scale(0)',
			'-webkit-transform': 'scale(0)',
		});
		$( ".eventoMasInfo" ).css({
			'opacity':'0'
		});
		$( "#proximosEventos" ).css({
			'transform':'scale(1)',
			'-moz-transform': 'scale(1)',
			'-webkit-transform': 'scale(1)',
		});
		$( "#proximosEventos" ).css({
			'opacity':'1'
		});
		$( "#proximosEventos" ).css({
			'z-index':'2'
		});
	});

});

function getEvents()
{
	$.ajax({
		type: "GET",
		url: 'http://www.comunidadresidentes.com.ar/appmontpellier/eventos.php',
		dataType: "html",
		success: function(data) {
			// data is ur summary
			localStorage["eventos"] = data; //Me guardo el html por si pierde conectividad
			$('#eventos').html(data);
			altoNuevo=$( window ).height()-150;
			$( '#seccionProximosEventos' ).css( "height", altoNuevo+"px" );
			$( '#seccionProximosEventos .container' ).css( "height", altoNuevo-100+"px" );
			$( '#seccionProximosEventos .container' ).scrollTop( 0 );
		},
		error: function(xhr, error){
            $('#eventos').html(localStorage["eventos"]);
   			altoNuevo=$( window ).height()-150;
			$( '#seccionProximosEventos' ).css( "height", altoNuevo+"px" );
			$( '#seccionProximosEventos .container' ).css( "height", altoNuevo-100+"px" );
			$( '#seccionProximosEventos .container' ).scrollTop( 0 );
 		}
	});
}