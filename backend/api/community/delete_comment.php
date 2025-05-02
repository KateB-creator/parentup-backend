<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: Content-Type');

require_once(__DIR__ . '/../db.php');

$data = json_decode(file_get_contents('php://input'), true);
$commentId = $data['id'] ?? null;

if (!$commentId) {
  echo json_encode(['error' => 'ID commento mancante']);
  exit;
}

$pdo->prepare("DELETE FROM community_comments WHERE id = ?")->execute([$commentId]);

echo json_encode(['success' => true, 'message' => 'Commento eliminato']);
