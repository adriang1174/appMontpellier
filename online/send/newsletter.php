<?php

require("class.phpmailer.php");

$mail = new PHPMailer();

$mail->From = "contacto@comunidadresidentes.com.ar";
$mail->FromName = "Comunidad Medico Residente";
//$mail->AddAddress("osvaldo@globaldardos.com");
$mail->AddAddress("contacto@comunidadresidentes.com.ar");
$mail->WordWrap = 50;                                 // set word wrap to 50 characters
$mail->IsHTML(true);                                  // set email format to HTML
$mail->ContentType = "text/html";
$mail->CharSet = "UTF-8";
$mail->Subject = "Suscripción al newsletter de " . $_POST["sendNewsNombre"];
$mail->Body = "<font face=Verdana, Arial, Helvetica, sans-serif color=#666666 size=2>
<strong>Nombre: </strong>" . $_POST["sendNewsNombre"] ."<br>
<strong>E-mail: </strong>" . $_POST["sendNewsEmail"] ."<br>
</font>";

if(!$mail->Send()) { echo "NOK";
} else { echo "OK"; }
?>