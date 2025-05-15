<?php
require_once __DIR__ . '/../models/User.php';

class UserController {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    // REGISTRAZIONE
    public function register() {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['email']) || !isset($data['password'])) {
            http_response_code(400);
            echo json_encode(["message" => "Email e password sono obbligatori"]);
            return;
        }

        $userModel = new User($this->conn);
        $userModel->email = $data['email'];
        $userModel->password = password_hash($data['password'], PASSWORD_BCRYPT);

        if ($userModel->create()) {
            http_response_code(201);
            echo json_encode(["message" => "Registrazione avvenuta con successo"]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Errore nella registrazione"]);
        }
    }

    // LOGIN
    public function login() {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['email']) || !isset($data['password'])) {
            http_response_code(400);
            echo json_encode(["message" => "Email e password sono obbligatori"]);
            return;
        }

        $userModel = new User($this->conn);
        $user = $userModel->getByEmail($data['email']);

        if ($user && password_verify($data['password'], $user['password'])) {
            session_start();
            $_SESSION['user_id'] = $user['id'];
            echo json_encode(["message" => "Login effettuato", "user_id" => $user['id']]);
        } else {
            http_response_code(401);
            echo json_encode(["message" => "Credenziali non valide"]);
        }
    }

    // LOGOUT
    public function logout() {
        session_start();
        $_SESSION = [];

        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
            );
        }

        session_destroy();
        echo json_encode(["message" => "Logout effettuato con successo"]);
    }

    // GET USER BY ID (esempio REST)
    public function getById($id) {
        $userModel = new User($this->conn);
        $user = $userModel->getById($id);
        echo json_encode($user ?: ["message" => "Utente non trovato"]);
    }

    // DELETE USER (esempio REST)
    public function delete($id) {
        $userModel = new User($this->conn);
        if ($userModel->delete($id)) {
            echo json_encode(["message" => "Utente eliminato"]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Errore durante l'eliminazione"]);
        }
    }
}
