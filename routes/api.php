<?php

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../controllers/UserController.php';
require_once __DIR__ . '/../controllers/PostController.php';
require_once __DIR__ . '/../controllers/CommentController.php';
require_once __DIR__ . '/../controllers/NotificationController.php';
require_once __DIR__ . '/../middleware/authMiddleware.php'; 

header("Content-Type: application/json");

// Middleware basato su token JWT
function requireTokenAuth() {
    $userId = getAuthenticatedUserId();
    if (!$userId) {
        http_response_code(403);
        echo json_encode(['error' => 'Accesso negato: token non valido o mancante']);
        exit;
    }
    return $userId;
}

$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

$db = (new Database())->connect();

$userController = new UserController($db);
$postController = new PostController($db);
$notificationController = new NotificationController($db);
$commentController = new CommentController($db);

// --- Estrai ID da URI se presente ---
$id = null;
if (preg_match('/\/api\/(users|posts|comments|notifications)\/(\d+)/', $uri, $matches)) {
    $id = (int)$matches[2];
}

switch (true) {
    // --- USER AUTH E GESTIONE UTENTI ---
    case $method === 'GET' && preg_match('/\/index\.php\/api\/users$/', $uri):
        $userController->getAll(); 
        break;

    case $method === 'PUT' && preg_match('/\/index\.php\/api\/users\/\d+$/', $uri):
        $userId = requireTokenAuth();
        $userController->update($id);
        break;

    case $method === 'DELETE' && preg_match('/\/index\.php\/api\/users\/\d+$/', $uri):
        $userId = requireTokenAuth();
        $userController->delete($id);
        break;

    case $method === 'POST' && preg_match('/\/index\.php\/api\/register$/', $uri):
        $userController->register();
        break;
        
    case $method === 'POST' && preg_match('/\/index\.php\/api\/login$/', $uri):
        $userController->login();
        break;

    // logout non necessario con JWT, ma puoi tenerlo per frontend
    case $method === 'POST' && preg_match('/\/index\.php\/api\/logout$/', $uri):
        echo json_encode(['message' => 'Logout gestito lato client con JWT']);
        break;

    case $method === 'POST' && preg_match('/\/index\.php\/api\/recover-password$/', $uri):
        $userController->recoverPassword();
        break;
        
    case $method === 'POST' && preg_match('/\/index\.php\/api\/reset-password$/', $uri):
        $userController->resetPassword();
        break;

    // --- POST ---
    case $method === 'GET' && preg_match('/\/index\.php\/api\/posts$/', $uri):
        $postController->getAll();
        break;

    case $method === 'GET' && preg_match('/\/index\.php\/api\/posts\/\d+$/', $uri):
        $postController->getById($id);
        break;

    case $method === 'POST' && preg_match('/\/index\.php\/api\/posts$/', $uri):
        $userId = requireTokenAuth();
        $postController->create($userId);
        break;

    case $method === 'PUT' && preg_match('/\/index\.php\/api\/posts\/\d+$/', $uri):
        $userId = requireTokenAuth();
        $postController->update($id, $userId);
        break;

    case $method === 'DELETE' && preg_match('/\/index\.php\/api\/posts\/\d+$/', $uri):
        $userId = requireTokenAuth();
        $postController->delete($id, $userId);
        break;

    // --- COMMENTI ---
    case $method === 'GET' && preg_match('/\/index\.php\/api\/comments$/', $uri):
        $commentController->getAll();
        break;

    case $method === 'POST' && preg_match('/\/index\.php\/api\/comments$/', $uri):
        $userId = requireTokenAuth();
        $commentController->create($userId);
        break;

    case $method === 'PUT' && preg_match('/\/index\.php\/api\/comments\/\d+$/', $uri):
        $userId = requireTokenAuth();
        $commentController->update($id, $userId);
        break;

    case $method === 'DELETE' && preg_match('/\/index\.php\/api\/comments\/\d+$/', $uri):
        $userId = requireTokenAuth();
        $commentController->delete($id, $userId);
        break;

    // --- NOTIFICHE ---
    case $method === 'GET' && preg_match('/\/index\.php\/api\/notifications$/', $uri):
        $userId = requireTokenAuth();
        $notificationController->getAll($userId);
        break;
    
    case $method === 'POST' && preg_match('/\/index\.php\/api\/notifications$/', $uri):
        $userId = requireTokenAuth();
        $notificationController->create($userId);
        break;

    case $method === 'PUT' && preg_match('/\/index\.php\/api\/notifications$/', $uri):
        $userId = requireTokenAuth();
        $notificationController->markAllAsRead($userId);
        break;

    // --- ROTTA NON TROVATA ---
    default:
        http_response_code(404);
        echo json_encode(["message" => "Endpoint non trovato"]);
        break;
}
