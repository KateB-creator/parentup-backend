<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once(__DIR__.'/../db.php');

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['lat'], $input['lng'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Coordinate mancanti."]);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO pink_parking (lat, lng) VALUES (:lat, :lng)");
    $stmt->execute(['lat' => $input['lat'], 'lng' => $input['lng']]);
    echo json_encode(["success" => true]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
