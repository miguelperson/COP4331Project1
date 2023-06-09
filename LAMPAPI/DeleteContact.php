<?php
    $contactInfo = json_decode(file_get_contents('php://input'), true);

    $contactID = $contactInfo["id"];
    // create connection
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); 	
	// check connection 
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
    else 
    {
        $checksql = "SELECT * FROM Contacts WHERE ID = '$contactID'";
        $result = $conn->query($checksql);

        $sql = "DELETE FROM Contacts WHERE ID = '$contactID'";
        $conn->query($sql);
        // echo "line 38";
        if ($result->num_rows > 0) 
        {
           
            if (($retval = $conn->query($sql)) === TRUE) 
            {
               returnWithInfo($name, $phoneNumber, $userID, $email); 
            }
            else 
            {
                returnWithError($conn->error);
            }
            
        } 
        else 
        {
            returnWithError("ERROR: Contact not found");
        }

		$conn->close();
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
