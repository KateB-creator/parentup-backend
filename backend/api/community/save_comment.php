<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: Content-Type');

require_once(__DIR__ . '/../db.php');

// Leggi i dati JSON inviati
$data = json_decode(file_get_contents('php://input'), true);

$postId = $data['post_id'] ?? null;
$name = $data['name'] ?? '';
$comment = $data['comment'] ?? '';
$userId = $data['user_id'] ?? null;

if (!$postId || !$name || !$comment || !$userId) {
    echo json_encode(['error' => 'Tutti i campi sono obbligatori.']);
    exit;
}

// Inserisci il commento
$stmt = $pdo->prepare("INSERT INTO community_comments (post_id, name, comment, user_id) VALUES (?, ?, ?, ?)");
$stmt->execute([$postId, $name, $comment, $userId]);

echo json_encode(['success' => true, 'message' => 'Commento salvato con successo.']);
