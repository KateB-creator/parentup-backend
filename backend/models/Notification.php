<?php
class Notification {
    private $conn;
    private $table = "notifications";

    public $user_id;
    public $message;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAllByUserId($user_id) {
        $query = "SELECT * FROM " . $this->table . " WHERE user_id = ? ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $user_id);
        $stmt->execute();

        $result = $stmt->get_result();
        $notifications = [];

        while ($row = $result->fetch_assoc()) {
            $notifications[] = $row;
        }

        return $notifications;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table . " (user_id, message) VALUES (?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("is", $this->user_id, $this->message);
        return $stmt->execute();
    }

    public function markAllAsRead($user_id) {
        $query = "UPDATE $this->table SET is_read = 1 WHERE user_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $user_id);
        return $stmt->execute();
    }
}
