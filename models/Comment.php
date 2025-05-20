<?php
class Comment {
    private $conn;
    private $table = "comments";

    public $user_id;
    public $post_id;
    public $content;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAllByPostId($postId) {
        $query = "SELECT comments.*, users.nome as autore
                  FROM comments
                  JOIN users ON comments.user_id = users.id
                  WHERE comments.post_id = :post_id
                  ORDER BY comments.created_at ASC";
    
        $stmt = $this->conn->prepare($query);
        $stmt->execute(['post_id' => $postId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create() {
        $query = "INSERT INTO " . $this->table . " (user_id, post_id, content) VALUES (?, ?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("iis", $this->user_id, $this->post_id, $this->content);
        return $stmt->execute();
    }

    public function update($id, $content) {
        $query = "UPDATE " . $this->table . " SET content = ? WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("si", $content, $id);
        return $stmt->execute();
    }

    public function delete($id) {
        $query = "DELETE FROM " . $this->table . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }

    public function belongsToUser($comment_id, $user_id) {
        $query = "SELECT id FROM " . $this->table . " WHERE id = ? AND user_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("ii", $comment_id, $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->num_rows === 1;
    }
}
