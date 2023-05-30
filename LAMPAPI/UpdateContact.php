<?php
$inData = json_decode(file_get_contents('php://input'), true);
$contactID = $inData["contactID"];
    $name = $contactInfo["name"]
	$email = $contactInfo["email"];
	$phoneNumber = $contactInfo["phone"];
	$userID = $contactInfo["uesrID"];


// create connection
$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); 

if($conn -> connect_error) // checks if connection is successful
{
	returnWithError( $conn->connect_error );
}else{
	$sqlCommand = "SELECT * FROM Contacts WHERE UserID = '$userID' AND contactID = '$contactID'"
	$result = $conn->query($sqlCommand);

//UPDATE Customers
//SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
//WHERE CustomerID = 1;

	$sqlUpdate = "UPDATE FROM Contacts WHERE UserID = '$userID' AND contactID = '$contactID' SET name = '$name' AND email = '$email' AND phoneNumber = '$phoneNumber'";


	if($sqlQuery = $conn->query($sqlCommand) == TRUE)
	{
		$returnString = '{"name":"' . $name . '","userID":"' . $userID . '","phone":"' . $phoneNumber . '","email":"' . $email . '"}';
	}

	$conn -> close();

	  //  function sendResultInfoAsJson( $obj )
	//{
		//header('Content-type: application/json');
		//echo $obj;
	//}


//	function returnWithInfo($name, $phoneNumber, $userID, $email) 
//	{
//		$retValue = '{"name":"' . $name . '","userID":"' . $userID . '","phone":"' . $phoneNumber . '","email":"' . $email . '"}';
//		sendResultInfoAsJson( $retValue );
//	}
}


?>