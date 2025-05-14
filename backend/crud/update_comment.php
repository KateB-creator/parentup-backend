<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once('../config/db.php');

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['comment_id']) && !empty($data['user_id']) && !empty($data['content'])) {
    $comment_id = intval($data['comment_id']);
    $user_id = intval($data['user_id']);
    $content = htmlspecialchars(strip_tags($data['content']));

    $stmt = $conn->prepare("UPDATE comments SET content = ? WHERE id = ? AND user_id = ?");
    $stmt->bind_param("sii", $content, $comment_id, $user_id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Errore nella modifica."]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Dati mancanti."]);
}

$conn->close();
?>
