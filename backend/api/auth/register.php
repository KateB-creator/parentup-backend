<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../db.php';

// Ottieni dati in ingresso
$data = json_decode(file_get_contents("php://input"));

if (
  empty($data->name) ||
  empty($data->email) ||
  empty($data->password)
) {
  echo json_encode(['error' => 'Tutti i campi sono obbligatori.']);
  exit;
}

$name = htmlspecialchars(trim($data->name));
$email = filter_var(trim($data->email), FILTER_VALIDATE_EMAIL);
$password = $data->password;

if (!$email) {
  echo json_encode(['error' => 'Email non valida.']);
  exit;
}

// Controlla se l'utente esiste già
$stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
$stmt->execute([$email]);
if ($stmt->rowCount() > 0) {
  echo json_encode(['error' => 'Email già registrata.']);
  exit;
}

// Cripta la password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Inserisci nel DB
$stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
$success = $stmt->execute([$name, $email, $hashedPassword]);

if ($success) {
  echo json_encode(['success' => true, 'message' => 'Registrazione completata!']);
} else {
  echo json_encode(['error' => 'Errore nella registrazione.']);
}
