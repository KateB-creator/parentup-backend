<?php
// CORS
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

header("Content-Type: application/json");
require_once __DIR__ . '/../auth/validate_jwt.php';
require_once __DIR__ . '/../db.php';

$authUser = getAuthenticatedUser();
if (!$authUser) {
  http_response_code(401);
  echo json_encode(["error" => "Utente non autenticato"]);
  exit;
}

$currentUserId = $authUser['id'];
$currentPartnerId = $authUser['partner_id'] ?? null;

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);
$partnerEmail = trim($data['partner_email'] ?? '');

if (!$partnerEmail) {
  http_response_code(400);
  echo json_encode(["error" => "Email partner mancante"]);
  exit;
}

// Recupera l'ID del partner a partire dall'email
$stmt = $pdo->prepare("SELECT id, partner_id FROM users WHERE email = ?");
$stmt->execute([$partnerEmail]);
$partner = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$partner) {
  http_response_code(404);
  echo json_encode(["error" => "Utente con questa email non trovato"]);
  exit;
}

$partnerId = $partner['id'];
$partnerPartnerId = $partner['partner_id'];

// ❌ Se stesso
if ($partnerId == $currentUserId) {
  http_response_code(400);
  echo json_encode(["error" => "Non puoi collegarti a te stesso"]);
  exit;
}

// ❌ Partner già collegato
if ($partnerPartnerId || $currentPartnerId) {
  http_response_code(400);
  echo json_encode(["error" => "Uno dei due utenti ha già un partner collegato"]);
  exit;
}

// ✅ Collega entrambi
try {
  $pdo->beginTransaction();

  $stmt1 = $pdo->prepare("UPDATE users SET partner_id = ? WHERE id = ?");
  $stmt1->execute([$partnerId, $currentUserId]);

  $stmt2 = $pdo->prepare("UPDATE users SET partner_id = ? WHERE id = ?");
  $stmt2->execute([$currentUserId, $partnerId]);

  $pdo->commit();

  echo json_encode([
    "success" => true,
    "message" => "Partner collegato con successo. Ora potete condividere il diario!"
  ]);
} catch (Exception $e) {
  $pdo->rollBack();
  http_response_code(500);
  echo json_encode(["error" => "Errore nel collegamento", "details" => $e->getMessage()]);
}
