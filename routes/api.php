<?php

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../controllers/UserController.php';
require_once __DIR__ . '/../controllers/PostController.php';
require_once __DIR__ . '/../controllers/CommentController.php';
require_once __DIR__ . '/../controllers/NotificationController.php';

header("Content-Type: application/json");

// Middleware per autenticazione
function requireAuth() {
    if (!isset($_SESSION['user_id'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Non autorizzato']);
        exit();
    }
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
        requireAuth();
        $userController->update($id);
        break;

    case $method === 'DELETE' && preg_match('/\/index\.php\/api\/users\/\d+$/', $uri):
        requireAuth();
        $userController->delete($id);
        break;

    case $method === 'POST' && preg_match('/\/index\.php\/api\/register$/', $uri):
        $userController->register();
        break;
        
    case $method === 'POST' && preg_match('/\/index\.php\/api\/login$/', $uri):
        $userController->login();
        break;
        
    case $method === 'POST' && preg_match('/\/index\.php\/api\/logout$/', $uri):
        requireAuth();
        $userController->logout();
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
        requireAuth();
        $postController->create();
        break;

    case $method === 'PUT' && preg_match('/\/index\.php\/api\/posts\/\d+$/', $uri):
        requireAuth();
        $postController->update($id);
        break;

    case $method === 'DELETE' && preg_match('/\/index\.php\/api\/posts\/\d+$/', $uri):
        requireAuth();
        $postController->delete($id);
        break;

    // --- COMMENTI ---
    case $method === 'GET' && preg_match('/\/index\.php\/api\/comments$/', $uri):
        $commentController->getAll();
        break;

    case $method === 'POST' && preg_match('/\/index\.php\/api\/comments$/', $uri):
        requireAuth();
        $commentController->create();
        break;

    case $method === 'PUT' && preg_match('/\/index\.php\/api\/comments\/\d+$/', $uri):
        requireAuth();
        $commentController->update($id);
        break;

    case $method === 'DELETE' && preg_match('/\/index\.php\/api\/comments\/\d+$/', $uri):
        requireAuth();
        $commentController->delete($id);
        break;

    // --- NOTIFICHE ---
    case $method === 'GET' && preg_match('/\/index\.php\/api\/notifications$/', $uri):
        requireAuth();
        $notificationController->getAll();
        break;
    
    case $method === 'POST' && preg_match('/\/index\.php\/api\/notifications$/', $uri):
        requireAuth();
        $notificationController->create();
        break;

    case $method === 'PUT' && preg_match('/\/index\.php\/api\/notifications$/', $uri):
        requireAuth();
        $notificationController->markAllAsRead();
        break;

    // --- ROTTA NON TROVATA ---
    default:
        http_response_code(404);
        echo json_encode(["message" => "Endpoint non trovato"]);
        break;
}
