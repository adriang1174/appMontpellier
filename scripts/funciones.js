$(document).ready(function () {

	if (localStorage["name"]) {
		$('#name').val(localStorage["name"]);
	}
	else{
			$.fancybox("#inline");
	}

	$( ".contenidoSeccion" ).css( "height", "0" );	
	
	
	altoRedes=$( window ).height()-150;
	$('#seccionFacebook .container').html('<iframe src="http://www.facebook.com/plugins/likebox.php?href=http://www.facebook.com/ComunidadResidentesArgentina&amp;stream=true&show_faces=false&show_border=false&header=false&height='+altoRedes+'" scrolling="no" frameborder="0" allowTransparency="true" height="'+altoRedes+'"></iframe>');

	$('#seccionTwitter .container').html('<a class="twitter-timeline" href="https://twitter.com/ResidentesArg" data-tweet-limit="7" height="'+altoRedes+'" data-widget-id="467785476154200064" data-chrome="nofooter noborders transparent">Tweets por @ResidentesArg</a>');
	!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

	$( document ).on( "vmousedown", ".botonSeccion", function() {
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
			}	
			altoNuevo=$( seccion+" .container").outerHeight()+"px";
			$( seccion ).css( "height", altoNuevo );
		}
	});
	
	$( document ).on( "vmousedown", ".botonSeccion", function() {		$( ".botonSeccion" ).removeClass( "botonSeccionHover" ); $( ".botonSeccion2" ).removeClass( "botonSeccion2Hover" ); $( this ).addClass( "botonSeccionHover" );	});
	$( document ).on( "vmouseup", ".botonSeccion", function() {		$( this ).removeClass( "botonSeccionHover" );	});
	$( document ).on( "vmousedown", ".botonSeccion2", function() {	$( ".botonSeccion" ).removeClass( "botonSeccionHover" ); $( ".botonSeccion2" ).removeClass( "botonSeccion2Hover" ); $( this ).addClass( "botonSeccion2Hover" );	});
	$( document ).on( "vmouseup", ".botonSeccion2", function() {		$( this ).removeClass( "botonSeccion2Hover" );	});
	
	$("#botonEnviarInvitacion").click(function() {
		   
		   $('#invita').val(localStorage["name"]);
		   var postData = $('#ajaxform').serializeArray();
		   $.ajax({
				 type: "POST",
				 url: 'http://www.comunidadresidentes.com.ar/appmontpellier/invita.php',
				 data : postData,
				 dataType: "html",
				 success: function(data) {
					   // data is ur summary
					   //alert(data);
					   if(data != "OK")
					   {
					         $('#txtRes').html("Se ha producido un error al enviar la invitación. Intente más tarde");
					   }
					   else
					   {
					         $('#txtRes').html("Se ha enviado la invitación exitosamente");
					         $('#ajaxform').clear();
					   }
					   
 				 }
			   });
	});	
	
	$('#nameForm').submit(function() {
		localStorage["name"] = $('#name').val();
		$.fancybox.close();
	});	
	
	$(".modalbox").fancybox();

});

function getEvents()
{
   $.ajax({

     type: "GET",
     url: 'http:/www.comunidadresidentes.com.ar/appmontpellier/eventos.html',
     dataType: "html",
     success: function(data) {
           // data is ur summary
		   //alert(data);
          $('#eventos').html(data);
		  altoNuevo=$( '#eventos').outerHeight()+"px";
		  $( '#seccionProximosEventos' ).css( "height", altoNuevo );
     }

   });

}