$(document).ready(function () {

	if (localStorage["name"]) {
		$('#name').val(localStorage["name"]);
	}
	else{
			$.fancybox("#inline");
	}

	$( ".contenidoSeccion" ).css( "height", "0" );	
	
	$(".botonSeccion").click(function() {
		seccion=$(this).data( "seccion" );
		
		//Cambiamos el alto dinamicamente
		$( ".contenidoSeccion" ).css( "height", "0" );	
		
		altoNuevo=$( seccion+" .container").outerHeight()+"px";
		//alert(altoNuevo);
		//Abre o cierra la sección
		if($( seccion ).css( "height")!="0px")
		{   //Cierra
		     $( seccion ).css( "height", "0" );
		}
		else
		{	
			//Abre
			//Buscamos data de la sección (solo cuando abre)
			if(seccion=="#seccionProximosEventos")
			{
				getEvents();
			}	
			altoNuevo=$( seccion+" .container").outerHeight()+"px";
			$( seccion ).css( "height", altoNuevo );
			if(seccion=="#seccionFacebook")
			{
			   $('#seccionFacebook' ).css( "height", "300px" );
			}
		}
	});
	
	$("#botonEnviarInvitacion").click(function() {
		   
		   $('#invita').val(localStorage["name"]);
		   var postData = $('#ajaxform').serializeArray();
		   $.ajax({
				 type: "POST",
				 url: 'http://www.inversionesdevida.com/montpellier/invita.php',
				 data : postData,
				 dataType: "html",
				 success: function(data) {
					   // data is ur summary
					   alert(data);
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
     url: 'http://www.inversionesdevida.com/montpellier/eventos.html',
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