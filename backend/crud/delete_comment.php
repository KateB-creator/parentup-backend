<?php
// Intestazioni CORS per React con credenziali
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Connessione al DB
require_once('../config/db.php');

// Recupero dati dal body della richiesta
$data = json_decode(file_get_contents("php://input"), true);

// Controllo che i dati richiesti siano presenti
if (!empty($data['comment_id']) && !empty($data['user_id'])) {
    $comment_id = intval($data['comment_id']);
    $user_id = intval($data['user_id']);

    // Solo l'autore del commento può cancellarlo
    $stmt = $conn->prepare("DELETE FROM comments WHERE id = ? AND user_id = ?");
    $stmt->bind_param("ii", $comment_id, $user_id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Commento eliminato con successo."]);
    } else {
        echo json_encode(["success" => false, "message" => "Errore nell'eliminazione del commento."]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Dati mancanti per l'eliminazione."]);
}

$conn->close();
?>
