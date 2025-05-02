<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once(__DIR__ . '/../db.php');

// Leggi il body JSON
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id)) {
  echo json_encode(['error' => 'ID post mancante']);
  exit;
}

// 1. Elimina prima i commenti associati
$stmt1 = $pdo->prepare("DELETE FROM community_comments WHERE post_id = ?");
$stmt1->execute([$data->id]);

// 2. Elimina il post
$stmt2 = $pdo->prepare("DELETE FROM community_posts WHERE id = ?");
$stmt2->execute([$data->id]);

echo json_encode(['success' => true]);
