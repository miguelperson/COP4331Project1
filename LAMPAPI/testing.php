<?php
    $inData = json_decode(file_get_contents('php://input'), true);
    $userID = $inData["userId"];
    $searchQuery = $inData["name"];

    debug_to_console($inData);

    debug_to_console($inData["userId"]);
    debug_to_console($inData["name"]);

    debug_to_console($userID);
    debug_to_console($searchQuery);

function debug_to_console($data) {
    $output = $data;
    if (is_array($output))
        $output = implode(',', $output);

    echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
}


?>