<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

session_start();
include '../config/db.php';

// Ricevi i dati dal frontend
$data = json_decode(file_get_contents("php://input"));
$email = $data->email ?? '';
$password = $data->password ?? '';

// Cerca l'utente nel DB
$query = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user && password_verify($password, $user['password'])) {
    // Salva nella sessione se necessario
    $_SESSION['user'] = $user['email'];

    // Risposta al frontend
    echo json_encode([
        "success" => true,
        "email" => $user['email'],
        "nome" => $user['nome'],
        "cognome" => $user['cognome']
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Email o password errati."]);
}
?>
