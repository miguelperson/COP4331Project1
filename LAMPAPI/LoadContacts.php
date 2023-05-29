<?php
    $inputData = getRequestData();

    $userID = $inputData["id"];

    //output data
    $searchResults = "";
	$searchCount = 0;


    $connection = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
    if ($connection->connect_error) {
        returnWithError($connection->connect_error);
    }
    else{
        $sql = "SELECT * FROM Contacts WHERE UserID=?";
        $statement = $connection->prepare($sql);
        $statement->bind_param("s", $userID);
        $statement->execute();

        $result = $statement->get_result();

        while($row = $result->fetch_assoc()){
            
            if( $searchCount > 0 )
			{
				$searchResults .= ",";
			}
            $searchCount++;

            $searchResults .= '{"Name": "' .$row["Name"].'", "Phone" : "' . $row["Phone"]. '", "Email" : "' . $row["Email"]. '", "UserID" : "' . $row["UserID"].'", "ID" : "' . $row["ID"]. '"}';
        }

        returnWithInfo($searchResults);
        
        $statement->close();
        $connection->close();

    }

    function getRequestData()
    {
        return json_decode(file_get_contents('php://input'), true);
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

?>