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
        $query = "SELECT posts.*, users.nome as autore_nome
                  FROM posts
                  JOIN users ON posts.user_id = users.id
                  ORDER BY posts.created_at DESC";
    
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
        foreach ($posts as &$post) {
            // carica i commenti per ogni post
            $commentQuery = "SELECT comments.*, users.nome as autore_commento
                             FROM comments
                             JOIN users ON comments.user_id = users.id
                             WHERE post_id = :post_id
                             ORDER BY created_at ASC";
    
            $commentStmt = $this->conn->prepare($commentQuery);
            $commentStmt->execute(['post_id' => $post['id']]);
            $post['comments'] = $commentStmt->fetchAll(PDO::FETCH_ASSOC);
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
