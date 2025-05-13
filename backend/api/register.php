<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include '../config/db.php';

$data = json_decode(file_get_contents("php://input"));

if (!$data) {
    echo json_encode(["success" => false, "message" => "Dati mancanti."]);
    exit;
}

$nome = $data->nome ?? '';
$cognome = $data->cognome ?? '';
$email = $data->email ?? '';
$password = isset($data->password) ? password_hash($data->password, PASSWORD_DEFAULT) : '';
$genere = $data->genere ?? '';
$data_nascita = $data->dataNascita ?? '';

// Controllo email duplicata
$checkQuery = "SELECT id FROM users WHERE email = ?";
$checkStmt = $conn->prepare($checkQuery);
$checkStmt->bind_param("s", $email);
$checkStmt->execute();
$checkStmt->store_result();

if ($checkStmt->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Email già registrata."]);
    exit;
}

// Inserimento nuovo utente
$query = "INSERT INTO users (nome, cognome, email, password, genere, data_nascita)
          VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("ssssss", $nome, $cognome, $email, $password, $genere, $data_nascita);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Utente registrato con successo."]);
} else {
    echo json_encode(["success" => false, "message" => "Errore durante la registrazione: " . $conn->error]);
}
?>
