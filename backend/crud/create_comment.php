<?php
// Intestazioni CORS obbligatorie per withCredentials
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once('../config/db.php');

$data = json_decode(file_get_contents("php://input"), true);

// Controllo validità dati ricevuti
if (!empty($data['post_id']) && !empty($data['content'])) {
    $post_id = intval($data['post_id']);
    $content = htmlspecialchars(strip_tags($data['content']));
    $user_id = isset($data['user_id']) ? intval($data['user_id']) : 1;

    $stmt = $conn->prepare("INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)");
    // Recupera il post per trovare l'autore
    $postResult = $conn->query("SELECT user_id FROM posts WHERE id = $post_id LIMIT 1");
    if ($postResult && $postResult->num_rows > 0) {
        $postAuthor = $postResult->fetch_assoc()['user_id'];

        // Non inviare notifica a sé stessi
        if ($postAuthor != $user_id) {
            $msg = "Qualcuno ha commentato il tuo post.";
            $stmtNotify = $conn->prepare("INSERT INTO notifications (user_id, message) VALUES (?, ?)");
            $stmtNotify->bind_param("is", $postAuthor, $msg);
            $stmtNotify->execute();
            $stmtNotify->close();
        }
    }

    $stmt->bind_param("iis", $post_id, $user_id, $content);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Commento aggiunto."]);
    } else {
        echo json_encode(["success" => false, "message" => "Errore nell'inserimento."]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Dati mancanti."]);
}

$conn->close();
?>
