<?php
// Abilita CORS
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];
if (in_array($origin, $allowedOrigins)) {
  header("Access-Control-Allow-Origin: $origin");
}
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

header('Content-Type: application/json');
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Autenticazione
require_once __DIR__ . '/../auth/validate_jwt.php';
require_once __DIR__ . '/../db.php';

$authUser = getAuthenticatedUser();
if (!$authUser) {
  http_response_code(401);
  echo json_encode(["success" => false, "error" => "Token non valido"]);
  exit;
}

$user_id = $authUser['id'];
$partner_id = $authUser['partner_id'] ?? null;

$input = json_decode(file_get_contents('php://input'), true);
$content = $input['entry'] ?? '';
$emotion = $input['emotion'] ?? null;

if (!$content || !$partner_id) {
  http_response_code(400);
  echo json_encode(["success" => false, "error" => "Dati mancanti"]);
  exit;
}

try {
  // Salva nel diario
  $stmt = $pdo->prepare("
    INSERT INTO shared_diary (user_id, partner_id, content, emotion)
    VALUES (?, ?, ?, ?)
  ");
  $stmt->execute([$user_id, $partner_id, $content, $emotion]);

  // Notifica al partner
  $notifStmt = $pdo->prepare("
      INSERT INTO notifications (user_id, title, message, is_read)
      VALUES (?, ?, ?, 0)
  ");
  $notifStmt->execute([
      $partner_id,
      'Nuovo messaggio dal partner',
      $authUser['name'] . ' ha scritto nel diario condiviso.',
  ]);

  echo json_encode(["success" => true]);
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(["success" => false, "error" => "Errore DB", "message" => $e->getMessage()]);
}
