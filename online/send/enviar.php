<?php

require("class.phpmailer.php");

$mail = new PHPMailer();

$mail->From = "contacto@comunidadresidentes.com.ar";
$mail->FromName = "Comunidad Medico Residente";
$mail->AddAddress("osvaldo@globaldardos.com");
//$mail->AddAddress("contacto@comunidadresidentes.com.ar");
$mail->WordWrap = 50;                                 // set word wrap to 50 characters
$mail->IsHTML(true);                                  // set email format to HTML
$mail->ContentType = "text/html";
$mail->CharSet = "UTF-8";
$mail->Subject = "Inscripcion de " . $_POST["sendNombre"] . " " . $_POST["sendApellido"];
$mail->Body = "<font face=Verdana, Arial, Helvetica, sans-serif color=#666666 size=2>
<strong>Nombre del Evento: </strong>" . $_POST["sendNombreEvento"] ."<br><br>

<strong>Nombre: </strong>" . $_POST["sendNombre"] ."<br>
<strong>Apellido: </strong>" . $_POST["sendApellido"] ."<br>
<strong>Telefono: </strong>" . $_POST["sendTelefono"] . "<br>
<strong>Email: </strong>" . $_POST["sendEmail"] . "<br>
<strong>Nº Matricula - Nac.: </strong>" . $_POST["sendMatriculaNac"] . "<br>
<strong>Nº Matricula - Prov.: </strong>" . $_POST["sendMatriculaProv"] . "<br>
<strong>Condicion: </strong>" . $_POST["sendCondicion"] . "<br>
<strong>Especialidad: </strong>" . $_POST["sendEspecialidad"] . "<br>
<strong>Institucion: </strong>" . $_POST["sendInstitucion"] . "<br>
<strong>Localidad: </strong>" . $_POST["sendLocalidad"] . "<br>
<strong>Provincia: </strong>" . $_POST["sendProvincia"] . "<br>
</font>";

if(!$mail->Send()) { echo "NOK";
} else { echo "OK"; }
?>