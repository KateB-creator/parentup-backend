<?php
// Opzionale: gestione CORS per accesso diretto al file (in caso venga testato standalone)
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];

if (in_array($origin, $allowedOrigins)) {
  header("Access-Control-Allow-Origin: $origin");
}
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Preflight check
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

// Connessione DB
require_once __DIR__ . '/../db.php';

/**
 * Recupera l'utente autenticato in base al token Bearer
 * Restituisce array associativo con id, partner_id, name, ecc.
 */
function getAuthenticatedUser()
{
  global $pdo;

  $headers = getallheaders();
  $authHeader = $headers['Authorization'] ?? '';

  if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
    $token = $matches[1];

    // Simulazione: token tipo "user-1", "user-2"
    if (strpos($token, 'user-') === 0) {
      $user_id = intval(str_replace('user-', '', $token));

      $stmt = $pdo->prepare("SELECT id, partner_id, name FROM users WHERE id = ?");
      $stmt->execute([$user_id]);
      $user = $stmt->fetch(PDO::FETCH_ASSOC);

      if ($user) {
        return $user;
      }
    }
  }

  http_response_code(401);
  echo json_encode(["error" => "Token non valido o utente non trovato"]);
  exit;
}
