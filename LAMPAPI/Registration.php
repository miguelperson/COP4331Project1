<?php

$requestData = getRequestData();

$firstName = $requestData["firstName"];
$lastName = $requestData["lastName"];
$login = $requestData["login"];
$password = $requestData["password"];

$databaseConnection = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
if ($databaseConnection->connect_error) {
    returnWithError($databaseConnection->connect_error);
} else {
    $sql = "SELECT * FROM Users WHERE Login=?";
    $statement = $databaseConnection->prepare($sql);
    $statement->bind_param("s", $login);
    $statement->execute();
    $result = $statement->get_result();
    $rowCount = $result->num_rows;
    if ($rowCount == 0) {
        $insertStatement = $databaseConnection->prepare("INSERT INTO Users (FirstName, LastName, Login, Password) VALUES (?,?,?,?)");
        $insertStatement->bind_param("ssss", $firstName, $lastName, $login, $password);
        $insertStatement->execute();
        $insertId = $insertStatement->insert_id;
        $insertStatement->close();
        $databaseConnection->close();
        http_response_code(200);
        $responseData = '{"id": "' . $insertId . '"}';
        header('Content-type: application/json');
        echo $responseData;
    } else {
        http_response_code(409);
        $errorData = '{"error":"Username taken"}';
        header('Content-type: application/json');
        echo $errorData;
    }
}

function getRequestData()
{
    return json_decode(file_get_contents('php://input'), true);
}
