<?php
	
	$contactInfo = getRequestInfo();

	$name = $contactInfo["name"];
	$email = $contactInfo["email"];
	$phoneNumber = $contactInfo["phone"];
	$userID = $contactInfo["id"];

	// create connection
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); 	
	// check connection 
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	
	else 
	{
		$sql = $conn -> prepare("INSERT INTO Contacts (Name, Phone, Email, UserID) VALUES (?, ?, ?, ?) ");
	
		$insertID = $sql->insert_id;
		$sql->bind_param("ssss", $name, $phoneNumber, $email, $userID);

		$inserted = $sql->execute();
		
		// check if successfully added
		if ($inserted)
		{  
			returnWithInfo($name, $phoneNumber, $userID, $email);
		}
		else 
		{
			
			returnWithError("ERROR: DID NOT ADD");
		}
		$sql->close();
		$conn->close();
	}
	


	function getRequestInfo()
	{
    	return json_decode(file_get_contents('php://input'), true);
	}
	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithError( $err )
	{
		$retValue = '{"id":0,"name":"","phone":"","email":"","userID":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	function returnWithInfo($name, $phoneNumber, $userID, $email) 
	{
		$retValue = '{"name":"' . $name . '","userID":"' . $userID . '","phone":"' . $phoneNumber . '","email":"' . $email . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>
