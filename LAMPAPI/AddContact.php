<?php
	
	$contactInfo = getRequestInfo();
	echo "got request";
	$name = $contactInfo["name"];
	$email = $contactInfo["email"];
	$phoneNumber = $contactInfo["phoneNumber"];
	$userID = $contactInfo["userID"];
	echo "line 9";
	// create connection
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); 	
	// check connection 
	if( $conn->connect_error )
	{
		echo "not connect";
		returnWithError( $conn->connect_error );
	}
	
	else 
	{
		echo "connected";
		$sql = $conn -> prepare("INSERT INTO Contacts (Name, Phone, Email, UserID) VALUES (?, ?, ?, ?) ");
		echo "line 23";
		$insertID = $sql->insert_id;
		$sql->bind_param("sssi", $name, $phoneNumber, $email, $userID);
		echo "line 25";
		$sql->execute();
		
        
		echo "line 28";
		
	
		// check if successfully added
		if (($result = $conn->query($sql)) === TRUE)
		{  
			echo "line 35";
			returnWithInfo($name, $phoneNumber, $userID, $email);
		}
		else 
		{
			echo "line 35";
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
		$retValue = '{","name":"' . $name . ',"userID":"'. 
			$userID. ',"Phone":"'. $phoneNumber. ',"email":"'. $email. '"}';
		sendResultInfoAsJson( $retValue );
	}
?>
