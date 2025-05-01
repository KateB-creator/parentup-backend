<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: Content-Type');

require_once(__DIR__ . '/../db.php');

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['id']) || empty($data['message'])) {
    echo json_encode(['error' => 'ID e contenuto richiesti.']);
    exit;
}

$stmt = $pdo->prepare("UPDATE community_posts SET message = ? WHERE id = ?");
$stmt->execute([$data['message'], $data['id']]);

echo json_encode(['success' => true, 'message' => 'Post aggiornato.']);
