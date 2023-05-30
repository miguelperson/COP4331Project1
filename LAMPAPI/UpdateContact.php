<?php
$inData = json_decode(file_get_contents('php://input'), true);
$contactID = $inData["contactID"];
    $firstName = $contactInfo["firstName"];
	$lastName = $inData["lastName"];
	$email = $contactInfo["email"];
	$phoneNumber = $contactInfo["phone"];

// create connection
$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); 


?>