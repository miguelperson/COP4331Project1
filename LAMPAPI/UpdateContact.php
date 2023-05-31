<?php
$inData = json_decode(file_get_contents('php://input'), true);
$contactID = $inData["contactID"];
    $newName = $inData["name"];
	$newEmail = $inData["email"];
	$newPhoneNumber = $inData["phone"];


// create connection
$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); 

if($conn -> connect_error) // checks if connection is successful
{
	returnWithError( $conn->connect_error );
}else{

	$sql = "UPDATE Contacts SET Name = ? , Email = ?, Phone = ? WHERE ID = ?";
	$statement = $conn->prepare($sql);
	$statment->bind_param("ssss", $newName, $newEmail, $newPhoneNumber, $contactID);
	$statment->execute();
	
	$sqlQuery = "SELECT * FROM Contacts WHERE ID = ?";
	$stat = $conn->prepare($sql);
	$stat->bind_param("s", $contactID);
	$stat->execute();
	$result = $stat->get_result();
	$row = $result->fetch_assoc();
	echo '{"name":"'. $row["Name"].'", "email":"'.$row["Email"].'", "phone":"'.$row["Phone"],'", "userID":"'.$row["UserID"].'", "contactID":"'.$row["ID"].'"}';
	$statment->close();
	$conn -> close();
}


?>