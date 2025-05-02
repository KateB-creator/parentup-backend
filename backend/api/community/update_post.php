<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: Content-Type');

require_once(__DIR__ . '/../db.php');

// Dati ricevuti in JSON
$data = json_decode(file_get_contents('php://input'), true);
$postId = $data['id'] ?? null;
$newMessage = $data['message'] ?? '';
$userId = $data['user_id'] ?? null;

if (!$postId || !$newMessage || !$userId) {
    echo json_encode(['error' => 'Dati mancanti.']);
    exit;
}

// Verifica che il post appartenga all'utente
$checkStmt = $pdo->prepare("SELECT user_id FROM community_posts WHERE id = ?");
$checkStmt->execute([$postId]);
$post = $checkStmt->fetch(PDO::FETCH_ASSOC);

if (!$post || $post['user_id'] != $userId) {
    echo json_encode(['error' => 'Non autorizzato a modificare questo post.']);
    exit;
}

// Aggiorna il messaggio del post
$updateStmt = $pdo->prepare("UPDATE community_posts SET message = ? WHERE id = ?");
$updateStmt->execute([$newMessage, $postId]);

echo json_encode(['success' => true, 'message' => 'Post aggiornato con successo.']);
