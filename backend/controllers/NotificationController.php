<?php
require_once __DIR__ . '/../models/Notification.php';

class NotificationController {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Recupera tutte le notifiche per un determinato utente
    public function getAll() {
        if (session_status() === PHP_SESSION_NONE) session_start();
    
        // DEBUG TEMPORANEO
        error_log("SESSION USER_ID: " . ($_SESSION['user_id'] ?? 'nessuna'));
    
        if (!isset($_SESSION['user_id'])) {
            http_response_code(401);
            echo json_encode(["success" => false, "message" => "Non autorizzato"]);
            return;
        }
    
        $model = new Notification($this->conn);
        $notifications = $model->getAllByUserId($_SESSION['user_id']);
    
        echo json_encode($notifications);
    }
    

    // Crea una nuova notifica per un utente
    public function create() {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['user_id']) || !isset($data['message'])) {
            http_response_code(400);
            echo json_encode(["message" => "user_id e message sono obbligatori"]);
            return;
        }

        $model = new Notification($this->conn);
        $model->user_id = $data['user_id'];
        $model->message = $data['message'];

        if ($model->create()) {
            http_response_code(201);
            echo json_encode(["success" => true, "message" => "Notifica creata con successo"]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Errore durante la creazione della notifica"]);
        }
    }

    public function markAllAsRead() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    
        if (!isset($_SESSION['user_id'])) {
            http_response_code(401);
            echo json_encode(["success" => false, "message" => "Accesso non autorizzato"]);
            return;
        }
    
        $model = new Notification($this->conn);
        if ($model->markAllAsRead($_SESSION['user_id'])) {
            echo json_encode(["success" => true, "message" => "Notifiche segnate come lette"]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Errore nel segnare le notifiche"]);
        }
    }
}
