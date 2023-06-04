<?php
    // get json from contacts.js
    $search = json_decode(file_get_contents('php://input'), true);

    $searchResults = "";
    $searchCount = 0;

    // create connection
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); 	
	// check connection 
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
    else 
    {
		
		$stmt = $conn->prepare("SELECT * FROM Contacts WHERE Name like ? AND UserID=?");
		$colorName = "%" . $inData["search"] . "%";
		$stmt->bind_param("sss", $colorName, $colorName, $inData["userId"]);
		$stmt->execute();
		$echo "1";
        $result = $stmt->get_result();
		$echo "2";
        while($row = $result->fetch_assoc())
		{
			if( $searchCount > 0 )
			{
				$searchResults .= ",";
			}
			$searchCount++;
			$searchResults .= '{"FirstName" : "' . $row["FirstName"]. '", "LastName" : "' . $row["LastName"]. '", "PhoneNumber" : "' . $row["PhoneNumber"]. '", "EmailAddress" : "' . $row["EmailAddress"]. '", "UserID" : "' . $row["UserID"].'", "ID" : "' . $row["ID"]. '"}';
		}
		$echo "3";
        if( $searchCount > 0 )
		{
            returnWithInfo( $searchResults );
		}
		else
		{
			returnWithError( "No Records Found" );
		}
		$echo "4";
        // Return the rows as JSON
        // Return the rows as JSON
        echo json_encode($rows);

        $stmt->close();
		$conn->close();
		$echo "5";
    }

    function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
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
?>
