<?php
							require("send/class.phpmailer.php");
							// registramos en la base
							$errorDB = false;
/*
							$link = mysqli_connect('localhost', 'uv9007', 'V*d*o*3037!','uv9007_registracionea');
							if (mysqli_connect_errno()) {
							$errorDB = true;
							}
							$apellido       = mysqli_real_escape_string($link, utf8_decode($_REQUEST['apellido']));
							$nombre 	    = mysqli_real_escape_string($link, utf8_decode($_REQUEST['nombre']));
							$dni			= mysqli_real_escape_string($link, $_REQUEST['dni']);
							$especialidad   = mysqli_real_escape_string($link, utf8_decode($_REQUEST['especialidad']));
							$hospital		= mysqli_real_escape_string($link, utf8_decode($_REQUEST['institucion']));
							$situacion		= mysqli_real_escape_string($link, utf8_decode($_REQUEST['condicion']));
							$telefono		= mysqli_real_escape_string($link, $_REQUEST['telefono']);
							$mail			= mysqli_real_escape_string($link, $_REQUEST['email']);
							$matricula		= mysqli_real_escape_string($link, $_REQUEST['matriculaNac']);
							$matricula_prov = mysqli_real_escape_string($link, $_REQUEST['matriculaProv']);

							$idCurso = $_REQUEST['idEvento'];
							$sql = "insert into participantes (Apellido,Nombre,Dni,especialidad,Hospital,Situacion,Telefono,Mail,Matricula,MatriculaProv) 
							values('{$apellido}','{$nombre}','{$dni}','{$especialidad}','{$hospital}','{$situacion}','{$telefono}','{$mail}','{$matricula}','{$matricula_prov}')";
							$res = mysqli_query($link,$sql);
*/
							$mail = new PHPMailer();
							try {
								//This is SMTP settings
								$mail->IsSMTP();
								$mail->SMTPAuth = true;
								$mail->SMTPSecure = "ssl";
								$mail->Host = "smtp.zoho.com";
								$mail->Port = 465;
								$mail->Username = "info@comunidadresidentes.com.ar";
								$mail->Password = "Residentes*123";
								//End SMTP settings
								$mail->From = "info@comunidadresidentes.com.ar";
								$mail->FromName = "Comunidad Medico Residente";
								$mail->AddAddress($_POST["email"]);
								$mail->WordWrap = 50; // set word wrap to 50 characters
								$mail->IsHTML(true); // set email format to HTML
								$mail->ContentType = "text/html";
								$mail->CharSet = "UTF-8";
								$mail->Subject = "Invitación a Comunidad Residentes";
								// Retrieve the email template required 
								// Acá va el template adecuado
								$message = file_get_contents('http://www.comunidadresidentes.com.ar/mailing/confirmacion/index.html'); 
								$nombre = $_POST["nombre"].":".$_POST["apellido"].":".$_POST["dni"].":".$_POST["email"].":".$_POST["invita"];
							
								// Replace the % with the actual information 
								$message = str_replace('%nombre%', $nombre, $message); 
								//Set the message 
								$mail->Body = $message; 
								//$mail->AltBody(strip_tags($message)); 
								$mailOK = $mail->Send();
								//echo $nombre." ".$mail->ErrorInfo;;
								//echo $mail->ErrorInfo;
								//print_r($mail);
							} catch (phpmailerException $e) {
							    echo $e->errorMessage(); //Pretty error messages from PHPMailer
							}
							
							if(!$mailOK) {
											echo "ERR";
							} else {	
									echo "OK";
							}

?>