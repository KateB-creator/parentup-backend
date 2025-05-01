<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: Content-Type');

require_once(__DIR__ . '/../db.php');

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['id'])) {
    echo json_encode(['error' => 'ID del post mancante.']);
    exit;
}

$stmt = $pdo->prepare("DELETE FROM community_posts WHERE id = ?");
$stmt->execute([$data['id']]);

echo json_encode(['success' => true, 'message' => 'Post eliminato.']);
