<?php
    $inData = json_decode(file_get_contents('php://input'), true);
    $userID = $inData["userID"];
    $searchQuery = $inData["query"];

    // create connection
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); 	
	// check connection 
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
    else 
    {
        $sql = "SELECT * FROM Contacts WHERE (FirstName LIKE ? OR LastName LIKE ?) AND UserID=?";
        $stmt = $conn->prepare($sql);

        $searchValue = "%". $searchQuery. "%";

        $stmt->bind_param("sss", $searchValue, $searchValue, $userID);

        $stmt->execute();

        $result = $stmt->get_result();

        $rows = $result->fetch_all(MYSQLI_ASSOC);

        $stmt->close();
        $conn->close();

        // Return the rows as JSON
        // Return the rows as JSON
        echo json_encode($rows);
    }



    function returnWithError( $err )
	{
		$retValue = '{"id":0,"name":"","phone":"","email":"","userID":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}


?>