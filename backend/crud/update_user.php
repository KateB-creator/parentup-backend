<?php

// Abilita errori per debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// CORS headers completi e corretti
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json");

// Se è una preflight request, termina subito
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();
$user_id = $_SESSION['user_id'] ?? null;

// Debug temporaneo:
if (!$user_id) {
    echo json_encode(["success" => false, "message" => "Sessione mancante", "session" => $_SESSION]);
    exit();
}

require_once('../config/db.php');


$user_id = $_SESSION['user_id'] ?? null;
$data = json_decode(file_get_contents("php://input"), true);

if ($user_id && isset($data['email'])) {
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);

    if (!empty($data['password'])) {
        $password = password_hash($data['password'], PASSWORD_DEFAULT);
        $stmt = $conn->prepare("UPDATE users SET email = ?, password = ? WHERE id = ?");
        $stmt->bind_param("ssi", $email, $password, $user_id);
    } else {
        $stmt = $conn->prepare("UPDATE users SET email = ? WHERE id = ?");
        $stmt->bind_param("si", $email, $user_id);
    }

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Errore durante l’aggiornamento."]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Dati non validi o utente non loggato."]);
}

$conn->close();
