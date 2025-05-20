<?php 
require_once __DIR__ . '/../models/Comment.php';

class CommentController {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
        if (!isset($_GET['post_id'])) {
            http_response_code(400);
            echo json_encode(["message" => "post_id è richiesto"]);
            return;
        }

        $post_id = intval($_GET['post_id']);
        $model = new Comment($this->conn);
        $comments = $model->getAllByPostId($post_id);

        echo json_encode($comments);
    }

    // ✅ riceve $userId dal token via api.php
    public function create($userId) {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['post_id'], $data['content'])) {
            http_response_code(400);
            echo json_encode(["message" => "post_id e content sono obbligatori"]);
            return;
        }

        $model = new Comment($this->conn);
        $model->user_id = $userId;
        $model->post_id = $data['post_id'];
        $model->content = $data['content'];

        if ($model->create()) {
            http_response_code(201);
            echo json_encode(["success" => true, "message" => "Commento creato"]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Errore nella creazione del commento"]);
        }
    }

    public function update($id, $userId) {
        $data = json_decode(file_get_contents("php://input"), true);
        $model = new Comment($this->conn);

        if (!$model->belongsToUser($id, $userId)) {
            http_response_code(403);
            echo json_encode(["message" => "Non puoi modificare questo commento"]);
            return;
        }

        $content = $data['content'] ?? '';

        if ($model->update($id, $content)) {
            echo json_encode(["message" => "Commento aggiornato"]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Errore aggiornamento commento"]);
        }
    }

    public function delete($id, $userId) {
        $model = new Comment($this->conn);

        if (!$model->belongsToUser($id, $userId)) {
            http_response_code(403);
            echo json_encode(["message" => "Non puoi eliminare questo commento"]);
            return;
        }

        if ($model->delete($id)) {
            echo json_encode(["message" => "Commento eliminato"]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Errore eliminazione commento"]);
        }
    }
}
