<?php
require_once('../config/cors.php');
require_once('../config/db.php');
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Non autenticato."]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['email'])) {
    echo json_encode(["success" => false, "message" => "Email mancante."]);
    exit;
}

$user_id = $_SESSION['user_id'];
$email = $data['email'];

$sql = "UPDATE users SET email = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $email, $user_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Dati aggiornati."]);
} else {
    echo json_encode(["success" => false, "message" => "Errore durante l'aggiornamento."]);
}
?>
