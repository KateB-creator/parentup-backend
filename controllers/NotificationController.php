<?php
require_once __DIR__ . '/../models/Notification.php';

class NotificationController {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    // ✅ Recupera tutte le notifiche dell'utente autenticato
    public function getAll($userId) {
        $model = new Notification($this->conn);
        $notifications = $model->getAllByUserId($userId);
        echo json_encode($notifications);
    }

    // ✅ Crea una nuova notifica per l'utente autenticato
    public function create($userId) {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['message'])) {
            http_response_code(400);
            echo json_encode(["message" => "Il campo message è obbligatorio"]);
            return;
        }

        $model = new Notification($this->conn);
        $model->user_id = $userId;
        $model->message = $data['message'];

        if ($model->create()) {
            http_response_code(201);
            echo json_encode(["success" => true, "message" => "Notifica creata con successo"]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Errore durante la creazione della notifica"]);
        }
    }

    // ✅ Segna tutte le notifiche come lette per l'utente autenticato
    public function markAllAsRead($userId) {
        $model = new Notification($this->conn);

        if ($model->markAllAsRead($userId)) {
            echo json_encode(["success" => true, "message" => "Notifiche segnate come lette"]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Errore nel segnare le notifiche"]);
        }
    }
}
