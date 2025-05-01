<?php
require_once '../auth/validate_jwt.php'; // recupera $user_id e connessione $pdo

$data = json_decode(file_get_contents("php://input"), true);

$checklist = json_encode($data['checklist']);
$planner = json_encode($data['planner']);
$formData = json_encode($data['formData']);

// Inserisci o aggiorna
$stmt = $pdo->prepare("
  INSERT INTO return_to_work_data (user_id, checklist, planner, form_data)
  VALUES (?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE checklist = VALUES(checklist), planner = VALUES(planner), form_data = VALUES(form_data)
");

if ($stmt->execute([$user_id, $checklist, $planner, $formData])) {
  echo json_encode(["success" => true]);
} else {
  echo json_encode(["success" => false, "error" => "DB error"]);
}
