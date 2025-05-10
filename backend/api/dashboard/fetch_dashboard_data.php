<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Authorization, Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Content-Type: application/json');

// Se è una richiesta OPTIONS (preflight), termina subito
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

require_once '../auth/validate_jwt.php';

$user = getAuthenticatedUser();
$user_id = $user['id']; // ✅ Variabile definita correttamente

$response = [];

// Rientro al lavoro
$stmt = $pdo->prepare("SELECT checklist, planner, form_data FROM return_to_work_data WHERE user_id = ?");
$stmt->execute([$user_id]);
$row = $stmt->fetch(PDO::FETCH_ASSOC);

$response['returnToWork'] = [
  'checklist' => json_decode($row['checklist'] ?? '[]', true),
  'planner' => json_decode($row['planner'] ?? '{}', true),
  'formData' => json_decode($row['form_data'] ?? '{}', true)
];

echo json_encode($response);
