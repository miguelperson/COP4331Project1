<?php
    $searchQuery = $_GET['query'];
    $id = $_GET['UserID'];

    
    // create connection
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); 	
	// check connection 
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
    else 
    {
        $sql = "SELECT * FROM Contacts WHERE (Name LIKE ?) AND UserID= ?";
        $stmt = $conn->prepare($sql);

        $searchValue = "%{$searchQuery}%";

        $stmt->bind_param("ss", $searchValue, $id);

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