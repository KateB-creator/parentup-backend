<?php
// CORS
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];
if (in_array($origin, $allowedOrigins)) {
  header("Access-Control-Allow-Origin: $origin");
}
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

// Forza la risposta in JSON
header('Content-Type: application/json');

// Debug
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Inclusioni
require_once __DIR__ . '/../auth/validate_jwt.php';
require_once __DIR__ . '/../db.php';

// Autenticazione
$authUser = getAuthenticatedUser();
if (!$authUser) {
  http_response_code(401);
  echo json_encode(["error" => "Token non valido o utente non trovato"]);
  exit;
}

$user_id = $authUser['id'];
$partner_id = $authUser['partner_id'] ?? null;

if (!$partner_id) {
  http_response_code(400);
  echo json_encode(["error" => "partner_id mancante"]);
  exit;
}

try {
  $stmt = $pdo->prepare("
    SELECT content, emotion, created_at 
    FROM shared_diary 
    WHERE (user_id = :user1 AND partner_id = :user2)
       OR (user_id = :user2 AND partner_id = :user1)
    ORDER BY created_at DESC
    LIMIT 1
  ");
  $stmt->execute([
    ':user1' => $user_id,
    ':user2' => $partner_id
  ]);

  $entry = $stmt->fetch(PDO::FETCH_ASSOC);
  echo json_encode($entry ?: []);
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(["error" => "Errore nel recupero diario", "message" => $e->getMessage()]);
}
