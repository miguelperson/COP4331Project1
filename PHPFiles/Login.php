<?php
// MySQL database credentials
$servername = "localhost";
$username = "TheBeast";
$password = "WeLoveCOP4331";
$dbname = "COP4331";

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to retrieve ID, FirstName, and LastName
$sql = "SELECT ID, FirstName, LastName FROM Users";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $data = array();

    // Fetch the rows and add them to the data array
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    // Convert the data array to JSON
    $json = json_encode($data);

    // Output the JSON data
    header('Content-type: application/json');
    echo $json;
} else {
    echo "No results found.";
}

// Close the connection
$conn->close();
?>