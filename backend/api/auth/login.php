<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../db.php';

$data = json_decode(file_get_contents("php://input"));

if (
  empty($data->email) ||
  empty($data->password)
) {
  echo json_encode(['error' => 'Email e password sono obbligatorie.']);
  exit;
}

$email = trim($data->email);
$password = $data->password;

$stmt = $pdo->prepare("SELECT id, name, password FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user || !password_verify($password, $user['password'])) {
  echo json_encode(['error' => 'Credenziali non valide.']);
  exit;
}

// Sessione (facoltativa in questo flusso)
$_SESSION['user_id'] = $user['id'];
$_SESSION['user_name'] = $user['name'];

// Genera token simulato (es. "user-1")
$token = 'user-' . $user['id'];

echo json_encode([
  'success' => true,
  'user' => [
    'id' => $user['id'],
    'name' => $user['name'],
    'token' => $token
  ]
]);
