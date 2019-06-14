<?php

	include("phpqrcode/qrlib.php");
	$email = $_REQUEST['email'];
	$concert = $_REQUEST['concert'];
	$filename = $email . $concert . '.png';
	QRcode::png("Gratis toegang tot concert $concert
		bij het vertonen van dit QR code", $filename);
	$eticket= "http://localhost:8888/Flashtix/$filename";

	echo $eticket;

?>