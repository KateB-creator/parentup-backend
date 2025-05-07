<?php
require_once '../auth/validate_jwt.php';
require_once '../db.php';

// ✅ Recupera l’utente autenticato e il suo ID
$user = getAuthenticatedUser();
if (!$user || !isset($user['id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Utente non autenticato']);
    exit;
}
$user_id = $user['id'];

try {
    $stmt = $pdo->prepare("SELECT checklist, planner, form_data FROM return_to_work_data WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $response = [
        'checklist' => json_decode($row['checklist'] ?? '[]', true),
        'planner' => json_decode($row['planner'] ?? '{}', true),
        'formData' => json_decode($row['form_data'] ?? '{}', true)
    ];

    echo json_encode($response);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Errore del server',
        'details' => $e->getMessage()
    ]);
}
