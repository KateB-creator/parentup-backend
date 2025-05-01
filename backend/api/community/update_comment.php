<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: Content-Type');

require_once(__DIR__ . '/../db.php');

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['id']) || empty($data['comment'])) {
    echo json_encode(['error' => 'ID e testo commento richiesti.']);
    exit;
}

$stmt = $pdo->prepare("UPDATE community_comments SET comment = ? WHERE id = ?");
$stmt->execute([$data['comment'], $data['id']]);

echo json_encode(['success' => true, 'message' => 'Commento aggiornato.']);
