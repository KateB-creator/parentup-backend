<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: Content-Type');

require_once(__DIR__ . '/../db.php');

// Ricezione dati
$data = json_decode(file_get_contents('php://input'), true);
$commentId = $data['id'] ?? null;
$newComment = $data['comment'] ?? '';
$userId = $data['user_id'] ?? null;

if (!$commentId || !$newComment || !$userId) {
    echo json_encode(['error' => 'Dati mancanti.']);
    exit;
}

// Verifica se il commento appartiene all'utente
$checkStmt = $pdo->prepare("SELECT user_id FROM community_comments WHERE id = ?");
$checkStmt->execute([$commentId]);
$comment = $checkStmt->fetch(PDO::FETCH_ASSOC);

if (!$comment || $comment['user_id'] != $userId) {
    echo json_encode(['error' => 'Non autorizzato a modificare questo commento.']);
    exit;
}

// Aggiornamento commento
$updateStmt = $pdo->prepare("UPDATE community_comments SET comment = ? WHERE id = ?");
$updateStmt->execute([$newComment, $commentId]);

echo json_encode(['success' => true, 'message' => 'Commento aggiornato con successo.']);
