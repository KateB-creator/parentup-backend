<?php
session_start();
$_SESSION = [];
session_destroy();
echo json_encode(["message" => "Logout effettuato."]);
exit;
?>

