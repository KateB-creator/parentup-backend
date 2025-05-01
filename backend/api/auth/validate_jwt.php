<?php
// Connessione al DB
require_once __DIR__ . '/../db.php';

// Simulazione: estrai il token da Authorization Header
$headers = apache_request_headers();
$authHeader = $headers['Authorization'] ?? '';

if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
    $token = $matches[1];
    // Per test: decodifica finta (in produzione usa JWT vera)
    // Esempio: supponiamo che il token sia 'user-1', 'user-2', ecc.
    if (strpos($token, 'user-') === 0) {
        $user_id = intval(str_replace('user-', '', $token));
        return;
    }
}

// Se token non valido
http_response_code(401);
echo json_encode(["error" => "Token non valido o assente"]);
exit;
