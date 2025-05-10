<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once(__DIR__ . '/../db.php');

try {
    $data = json_decode(file_get_contents("php://input"));

    if (!isset($data->id)) {
        echo json_encode(['success' => false, 'error' => 'ID post mancante']);
        exit;
    }

    // Elimina prima i commenti collegati al post
    $stmt1 = $pdo->prepare("DELETE FROM community_comments WHERE post_id = ?");
    $stmt1->execute([$data->id]);

    // Poi elimina il post
    $stmt2 = $pdo->prepare("DELETE FROM community_posts WHERE id = ?");
    $stmt2->execute([$data->id]);

    // Controlla se il post è stato effettivamente eliminato
    if ($stmt2->rowCount() > 0) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Post non trovato o già eliminato']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => 'Errore DB: ' . $e->getMessage()]);
}
