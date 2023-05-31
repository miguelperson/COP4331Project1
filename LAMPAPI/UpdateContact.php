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

	$sql = "UPDATE Contacts SET Email=". $newEmail .", Name = ". $newName .", Phone = ". $newPhoneNumber . " WHERE ID=". $contactID.";" ;
		if(mysqli_query($conn, $sql)){
			echo "Records were updated successfully.";
		} else {
			echo "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
		}
	
}


?>