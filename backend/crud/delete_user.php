<?php
require_once('../config/cors.php');
require_once('../config/db.php');
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Non autenticato."]);
    exit;
}

$user_id = $_SESSION['user_id'];

$sql = "DELETE FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);

if ($stmt->execute()) {
    session_destroy();
    echo json_encode(["success" => true, "message" => "Account eliminato con successo."]);
} else {
    echo json_encode(["success" => false, "message" => "Errore durante l'eliminazione."]);
}
?>
