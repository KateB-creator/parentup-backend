<?php
class Post {
    private $conn;
    private $table = "posts";

    public $user_id;
    public $title;
    public $content;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
        $query = "SELECT * FROM posts ORDER BY created_at DESC";
        $result = $this->conn->query($query);
    
        $posts = [];
    
        while ($row = $result->fetch_assoc()) {
            $post_id = $row['id'];
    
            // Prendi i commenti associati
            $commentsQuery = "SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC";
            $stmt = $this->conn->prepare($commentsQuery);
            $stmt->bind_param("i", $post_id);
            $stmt->execute();
            $commentsResult = $stmt->get_result();
    
            $comments = [];
            while ($comment = $commentsResult->fetch_assoc()) {
                $comments[] = $comment;
            }
    
            $row['comments'] = $comments;
            $posts[] = $row;
        }
    
        return $posts;
    }

    public function getById($id) {
        $query = "SELECT * FROM $this->table WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function create() {
        $query = "INSERT INTO $this->table (user_id, title, content) VALUES (?, ?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("iss", $this->user_id, $this->title, $this->content);
        return $stmt->execute();
    }

    public function update($id, $title, $content) {
        $query = "UPDATE $this->table SET title = ?, content = ? WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("ssi", $title, $content, $id);
        return $stmt->execute();
    }

    public function delete($id) {
        $query = "DELETE FROM $this->table WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }

    public function belongsToUser($id, $user_id) {
        $query = "SELECT id FROM $this->table WHERE id = ? AND user_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("ii", $id, $user_id);
        $stmt->execute();
        return $stmt->get_result()->num_rows === 1;
    }
}
