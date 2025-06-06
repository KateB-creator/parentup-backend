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
        $query = "SELECT 
            posts.id,
            posts.title,
            posts.content,
            posts.user_id,
            posts.created_at,
            users.nome AS autore_nome
          FROM posts
          JOIN users ON posts.user_id = users.id
          ORDER BY posts.created_at DESC";
    
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();
        $posts = $result->fetch_all(MYSQLI_ASSOC);
    
        foreach ($posts as &$post) {
            $commentQuery = "SELECT comments.*, users.nome as autore_commento
                             FROM comments
                             JOIN users ON comments.user_id = users.id
                             WHERE comments.post_id = ?
                             ORDER BY comments.created_at ASC";
    
            $commentStmt = $this->conn->prepare($commentQuery);
            $commentStmt->bind_param("i", $post['id']);
            $commentStmt->execute();
            $commentResult = $commentStmt->get_result();
            $post['comments'] = $commentResult->fetch_all(MYSQLI_ASSOC);
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
