<?php
require_once __DIR__ . '/../models/Post.php';

class PostController {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
        $model = new Post($this->conn);
        $posts = $model->getAll();
        echo json_encode($posts);
    }

    public function getById($id) {
        $model = new Post($this->conn);
        $post = $model->getById($id);
        echo json_encode($post ?: ["message" => "Post non trovato"]);
    }

    public function create() {
        session_start();
        if (!isset($_SESSION['user_id'])) {
            http_response_code(401);
            echo json_encode(["message" => "Accesso non autorizzato"]);
            return;
        }

        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['title']) || !isset($data['content'])) {
            http_response_code(400);
            echo json_encode(["message" => "title e content sono obbligatori"]);
            return;
        }

        $model = new Post($this->conn);
        $model->user_id = $_SESSION['user_id'];
        $model->title = $data['title'];
        $model->content = $data['content'];

        if ($model->create()) {
            http_response_code(201);
            echo json_encode(["message" => "Post creato"]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Errore nella creazione del post"]);
        }
    }

    public function update($id) {
        session_start();
        if (!isset($_SESSION['user_id'])) {
            http_response_code(401);
            echo json_encode(["message" => "Non autorizzato"]);
            return;
        }

        $model = new Post($this->conn);
        if (!$model->belongsToUser($id, $_SESSION['user_id'])) {
            http_response_code(403);
            echo json_encode(["message" => "Non puoi modificare questo post"]);
            return;
        }

        $data = json_decode(file_get_contents("php://input"), true);
        $title = $data['title'] ?? '';
        $content = $data['content'] ?? '';

        if ($model->update($id, $title, $content)) {
            echo json_encode(["message" => "Post aggiornato"]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Errore aggiornamento post"]);
        }
    }

    public function delete($id) {
        session_start();
        if (!isset($_SESSION['user_id'])) {
            http_response_code(401);
            echo json_encode(["message" => "Non autorizzato"]);
            return;
        }

        $model = new Post($this->conn);
        if (!$model->belongsToUser($id, $_SESSION['user_id'])) {
            http_response_code(403);
            echo json_encode(["message" => "Non puoi eliminare questo post"]);
            return;
        }

        if ($model->delete($id)) {
            echo json_encode(["message" => "Post eliminato"]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Errore eliminazione post"]);
        }
    }
}
