<?php
// Permetti richieste CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Rispondi subito alle richieste di tipo OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'db.php';

// Leggi il corpo della richiesta
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["message" => "Nessun dato ricevuto o formato JSON errato."]);
    exit();
}

// Verifica dati
if (!isset($data['name'], $data['email'], $data['expertType'], $data['message'])) {
    http_response_code(400);
    echo json_encode(["message" => "Dati incompleti."]);
    exit();
}

// Inserisci nel database
try {
    $stmt = $pdo->prepare('INSERT INTO expert_requests (name, email, expert_type, message) VALUES (?, ?, ?, ?)');
    $stmt->execute([
        $data['name'],
        $data['email'],
        $data['expertType'],
        $data['message']
    ]);

    http_response_code(200);
    echo json_encode(["message" => "Richiesta salvata con successo!"]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Errore durante il salvataggio: " . $e->getMessage()]);
}
?>
