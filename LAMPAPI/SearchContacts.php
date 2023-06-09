<?php
    //ini_set('display_errors', 1);
    //ini_set('display_startup_errors', 1);
    //error_reporting(E_ALL);
    
    $inData = json_decode(file_get_contents('php://input'), true);
    $userID = $inData["userId"];
    $searchQuery = $inData["name"];

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
        $searchValue = "'%". $searchQuery. "%'";
        $sql = "SELECT * FROM Contacts WHERE Name LIKE ". $searchValue ." AND UserID=".$userID. ";";

        //debug_to_console($sql);
        
        //debug_to_console($searchValue);
        //debug_to_console($userID);

      

        $result = $conn->query($sql);
        //debug_to_console("hello");
        
        
        while($row = $result->fetch_assoc()){
            
            if( $searchCount > 0 )
			{
				$searchResults .= ",";
			}
            $searchCount++;
            
            $searchResults .= '{"name": "' .$row["Name"].'", "phone" : "' . $row["Phone"]. '", "email" : "' . $row["Email"]. '", "UserID" : "' . $row["UserID"].'", "ID" : "' . $row["ID"]. '"}';
        }
        //debug_to_console($searchCount);
        
        returnWithInfo($searchResults);

        $conn->close();
        
    }



    function returnWithError( $err )
	{
		$retValue = '{"id":0,"name":"","phone":"","email":"","userID":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
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

    function debug_to_console($data) {
        $output = $data;
        if (is_array($output))
            $output = implode(',', $output);
    
        echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
    }
?>