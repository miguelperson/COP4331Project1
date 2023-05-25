<?php
	$userInfo = getRequestInfo();

	$id = 0;
	$firstName = $userInfo["firstName"];
	$lastName = $userInfo["lastName"];
	$username = $userInfo["username"];
	$password = $userInfo["password"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}else{


	}


?>
