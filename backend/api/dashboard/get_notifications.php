<?php
require_once '../auth/validate_jwt.php';

$user = getAuthenticatedUser();
$user_id = $user['id'];

require_once '../db.php';

$stmt = $pdo->prepare("SELECT id, title, message, is_read, created_at FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 10");
$stmt->execute([$user_id]);
$notifications = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($notifications);
