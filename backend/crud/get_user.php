<?php
require_once('../config/cors.php');
require_once('../config/db.php');
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Utente non autenticato."]);
    exit;
}

$user_id = $_SESSION['user_id'];

$sql = "SELECT nome, cognome, email, genere, dataNascita FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    echo json_encode(["success" => true, "user" => $user]);
} else {
    echo json_encode(["success" => false, "message" => "Utente non trovato."]);
}
?>
