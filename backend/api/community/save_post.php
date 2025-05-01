<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: Content-Type');

require_once(__DIR__ . '/../db.php');

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['post_id']) || empty($data['name']) || empty($data['comment'])) {
    echo json_encode(['error' => 'Tutti i campi sono obbligatori.']);
    exit;
}

$stmt = $pdo->prepare("INSERT INTO community_comments (post_id, name, comment) VALUES (?, ?, ?)");
$stmt->execute([$data['post_id'], $data['name'], $data['comment']]);

echo json_encode(['success' => true, 'message' => 'Commento salvato con successo.']);
