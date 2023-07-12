<?php

$username = $password = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = sanatize($_POST["username"]);
    $password = sanatize($_POST["password"]);
}

echo $username;
echo $password;

function sanatize($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);

    return $data;
}


?>