<?php
$inData = json_decode(file_get_contents('php://input'), true);
$contactID = $inData["contactID"];
    $name = $contactInfo["name"];
	$email = $contactInfo["email"];
	$phoneNumber = $contactInfo["phone"];

// create connection
$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); 


?>