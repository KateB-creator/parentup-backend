<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
require_once 'db.php';

try {
  $stmt = $pdo->query("SELECT * FROM wellbeing_resources ORDER BY id ASC");
  $resources = $stmt->fetchAll();
  echo json_encode($resources);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Errore nel recupero risorse']);
}
