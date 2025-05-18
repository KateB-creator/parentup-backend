<?php

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../controllers/UserController.php';
require_once __DIR__ . '/../controllers/PostController.php';
require_once __DIR__ . '/../controllers/CommentController.php';
require_once __DIR__ . '/../controllers/NotificationController.php';


header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

$db = (new Database())->connect();

$userController = new UserController($db);
$postController = new PostController($db);
$notificationController = new NotificationController($db);
$commentController = new CommentController($db);


// --- ID estratti dalle route ---
$id = null;
if (preg_match('/\/api\/(users|posts|comments|notifications)\/(\d+)/', $uri, $matches)) {
    $id = (int)$matches[2];
}

switch (true) {
    // --- USERS ---
    
    case $method === 'GET' && preg_match('/\/index\.php\/api\/users$/', $uri):
        $userController->getAll(); 

    case $method === 'POST' && preg_match('/\/index\.php\/api\/users$/', $uri):
        $userController->create();
        break;

    case $method === 'PUT' && preg_match('/\/index\.php\/api\/users\/\d+$/', $uri):
        $userController->update($id);
        break;

    case $method === 'DELETE' && preg_match('/\/index\.php\/api\/users\/\d+$/', $uri):
        $userController->delete($id);
        break;

        case $method === 'POST' && preg_match('/\/index\.php\/api\/register$/', $uri):
            $userController->register();
            break;
        
        case $method === 'POST' && preg_match('/\/index\.php\/api\/login$/', $uri):
            $userController->login();
            break;
        
        case $method === 'POST' && preg_match('/\/index\.php\/api\/logout$/', $uri):
            $userController->logout();
            break;   

        case $method === 'POST' && preg_match('/\/index\.php\/api\/recover-password$/', $uri):
            $userController->recoverPassword();
            break;
        
        case $method === 'POST' && preg_match('/\/index\.php\/api\/reset-password$/', $uri):
            $userController->resetPassword();
            break;
            
    // --- POSTS ---
    case $method === 'GET' && preg_match('/\/index\.php\/api\/posts$/', $uri):
        $postController->getAll();
        break;

    case $method === 'GET' && preg_match('/\/index\.php\/api\/posts\/\d+$/', $uri):
        $postController->getById($id);
        break;

    case $method === 'POST' && preg_match('/\/index\.php\/api\/posts$/', $uri):
        $postController->create();
        break;

    case $method === 'PUT' && preg_match('/\/index\.php\/api\/posts\/\d+$/', $uri):
        $postController->update($id);
        break;

    case $method === 'DELETE' && preg_match('/\/index\.php\/api\/posts\/\d+$/', $uri):
        $postController->delete($id);
        break;

    // --- COMMENTS ---
    case $method === 'GET' && preg_match('/\/index\.php\/api\/comments$/', $uri):
        $commentController->getAll();
        break;

    case $method === 'POST' && preg_match('/\/index\.php\/api\/comments$/', $uri):
        $commentController->create();
        break;

    case $method === 'PUT' && preg_match('/\/index\.php\/api\/comments\/\d+$/', $uri):
        $commentController->update($id);
        break;

    case $method === 'DELETE' && preg_match('/\/index\.php\/api\/comments\/\d+$/', $uri):
        $commentController->delete($id);
        break;

    // --- NOTIFICATIONS ---
    case $method === 'GET' && preg_match('/\/index\.php\/api\/notifications$/', $uri):
        $notificationController->getAll();
        break;
    
    case $method === 'POST' && preg_match('/\/index\.php\/api\/notifications$/', $uri):
        $notificationController->create();
        break;

    case $method === 'PUT' && preg_match('/\/index\.php\/api\/notifications$/', $uri):
        $notificationController->markAllAsRead();
        break;

    // --- DEFAULT ---
    default:
        http_response_code(404);
        echo json_encode(["message" => "Endpoint non trovato"]);
        break;

}
