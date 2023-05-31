<?php
$inData = json_decode(file_get_contents('php://input'), true);
$contactID = $inData["contactID"];
    $name = $inData["name"];
	$email = $inData["email"];
	$phoneNumber = $inData["phone"];
	$userID = $inData["userID"];


// create connection
$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); 

if($conn -> connect_error) // checks if connection is successful
{
	returnWithError( $conn->connect_error );
}else{
	// $sqlCommand = "SELECT Email, Name,  FROM Contacts WHERE ID = '$contactID'";
	
	// if (($result = $conn->query($sqlCommand)) === TRUE) 
	// {
	// 	echo "Users found";
	// }
	// else 
	// {
	// 	echo "Users not found";
	// }

//UPDATE Customers
//SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
//WHERE CustomerID = 1;

	$sqlUpdate = "UPDATE Contacts SET Name = '$name' , Email = '$email', Phone = '$phoneNumber' WHERE ID = '$contactID'";
	

	if(($sqlQuery = $conn->query($sqlUpdate)) === TRUE)
	{
		$result = $sqlQuery->get_result();
		$row = $result->fetch_assoc();
		$returnString = '{"name":"' . $name . '","userID":"' . $row["UserID"] . '","phone":"' . $phoneNumber . '","email":"' . $email . '"}';
		echo $returnString;
	}
	else 
	{
		echo "Error: Did not update";
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