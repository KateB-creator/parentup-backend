<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: Content-Type');

require_once(__DIR__ . '/../db.php');

// Crea la cartella uploads se non esiste
$uploadDir = __DIR__ . '/../../../uploads/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Variabili iniziali
$name = $_POST['name'] ?? '';
$message = $_POST['message'] ?? '';
$userId = $_POST['user_id'] ?? null;
$mediaUrl = null;

// Validazione base
if (empty($name) || empty($message) || !$userId) {
    echo json_encode(['success' => false, 'error' => 'Nome, messaggio e user_id sono obbligatori.']);
    exit;
}

// Gestione upload file (immagine o video)
if (!empty($_FILES['media']) && $_FILES['media']['error'] === UPLOAD_ERR_OK) {
    $fileTmp = $_FILES['media']['tmp_name'];
    $fileName = basename($_FILES['media']['name']);

    // Aggiungi timestamp per evitare conflitti
    $extension = pathinfo($fileName, PATHINFO_EXTENSION);
    $baseName = pathinfo($fileName, PATHINFO_FILENAME);
    $newName = $baseName . '_' . time() . '.' . $extension;
    $targetPath = $uploadDir . $newName;

    if (move_uploaded_file($fileTmp, $targetPath)) {
        $mediaUrl = '/uploads/' . $newName; // path relativo da salvare nel DB
    }
}

// Salvataggio nel DB
try {
    $stmt = $pdo->prepare("INSERT INTO community_posts (user_id, name, message, media_url) VALUES (?, ?, ?, ?)");
    $stmt->execute([$userId, $name, $message, $mediaUrl]);

    echo json_encode(['success' => true, 'message' => 'Post pubblicato con successo.']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => 'Errore DB: ' . $e->getMessage()]);
}
