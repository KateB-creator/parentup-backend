<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

session_start();

require_once('../config/db.php');

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['title']) && !empty($data['content'])) {
    $title = htmlspecialchars(strip_tags($data['title']));
    $content = htmlspecialchars(strip_tags($data['content']));
    $user_id = isset($data['user_id']) ? intval($data['user_id']) : 1; // fallback utente 1

    $stmt = $conn->prepare("INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)");
    $stmt->bind_param("iss", $user_id, $title, $content);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Post creato con successo."]);
    } else {
        echo json_encode(["success" => false, "message" => "Errore nella creazione del post."]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Titolo e contenuto obbligatori."]);
}

$conn->close();
?>
