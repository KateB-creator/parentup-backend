<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once('../config/db.php');
session_start();

$user_id = $_SESSION['user_id'] ?? null;

if ($user_id) {
    $stmt = $conn->prepare("DELETE FROM notifications WHERE user_id = ?");
    $stmt->bind_param("i", $user_id);
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Notifiche eliminate."]);
    } else {
        echo json_encode(["success" => false, "message" => "Errore durante l'eliminazione."]);
    }
    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Utente non autenticato."]);
}

$conn->close();
?>
