<?php
require_once '../auth/validate_jwt.php';

$stmt = $pdo->prepare("SELECT checklist, planner, form_data FROM return_to_work_data WHERE user_id = ?");
$stmt->execute([$user_id]);
$row = $stmt->fetch(PDO::FETCH_ASSOC);

$response = [
  'checklist' => json_decode($row['checklist'] ?? '[]', true),
  'planner' => json_decode($row['planner'] ?? '{}', true),
  'formData' => json_decode($row['form_data'] ?? '{}', true)
];

echo json_encode($response);
