<?php

	$userInfo = getRequestInfo();
	$id;
	$login;
	$password;
	$firstName;
	$lastName;

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); 	
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else 
	{

	}


?>