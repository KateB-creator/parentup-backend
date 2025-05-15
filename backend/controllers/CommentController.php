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

    public function create() {
        $data = json_decode(file_get_contents("php://input"), true);
    
        if (!isset($data['post_id'], $data['content'], $data['user_id'])) {
            http_response_code(400);
            echo json_encode(["message" => "post_id, content e user_id sono obbligatori"]);
            return;
        }
    
        $model = new Comment($this->conn);
        $model->user_id = $data['user_id'];
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

    public function update($id) {
        session_start();
        if (!isset($_SESSION['user_id'])) {
            http_response_code(401);
            echo json_encode(["message" => "Accesso non autorizzato"]);
            return;
        }

        $data = json_decode(file_get_contents("php://input"), true);
        $model = new Comment($this->conn);

        // Verifica che il commento appartenga all’utente loggato
        if (!$model->belongsToUser($id, $_SESSION['user_id'])) {
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

    public function delete($id) {
        session_start();
        if (!isset($_SESSION['user_id'])) {
            http_response_code(401);
            echo json_encode(["message" => "Accesso non autorizzato"]);
            return;
        }

        $model = new Comment($this->conn);
        if (!$model->belongsToUser($id, $_SESSION['user_id'])) {
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
