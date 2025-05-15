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
            echo json_encode(["success" => false, "message" => "Email e password sono obbligatori"]);
            return;
        }
    
        $userModel = new User($this->conn);
        $userModel->email = $data['email'];
        $userModel->password = password_hash($data['password'], PASSWORD_BCRYPT);
        $userModel->nome = $data['nome'] ?? '';
        $userModel->cognome = $data['cognome'] ?? '';
        $userModel->genere = $data['genere'] ?? '';
        $userModel->data_nascita = $data['dataNascita'] ?? null;
    
        if ($userModel->create()) {
            $user_id = $this->conn->insert_id;
            http_response_code(201);
            echo json_encode([
                "success" => true,
                "message" => "Registrazione avvenuta con successo",
                "user_id" => $user_id
            ]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Errore nella registrazione"]);
        }
    }

    // LOGIN
    public function login() {
        $data = json_decode(file_get_contents("php://input"), true);
    
        if (!isset($data['email']) || !isset($data['password'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Email e password sono obbligatori"]);
            return;
        }
    
        $userModel = new User($this->conn);
        $user = $userModel->getByEmail($data['email']);
    
        if ($user && password_verify($data['password'], $user['password'])) {
            if (session_status() === PHP_SESSION_NONE) {
                session_start();
            }
            $_SESSION['user_id'] = $user['id'];
            echo json_encode([
                "success" => true,
                "message" => "Login effettuato",
                "user_id" => $user['id'],
                "email" => $user['email'],
                "nome" => $user['nome'],
                "cognome" => $user['cognome']
            ]);
        } else {
            http_response_code(401);
            echo json_encode(["success" => false, "message" => "Credenziali non valide"]);
        }
    }

    // LOGOUT
    public function logout() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    
        $_SESSION = [];
    
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
            );
        }
    
        session_destroy();
        echo json_encode(["success" => true, "message" => "Logout effettuato con successo"]);
    }
    
    // GET USER BY ID (esempio REST)
    public function getById($id) {
        $userModel = new User($this->conn);
        $user = $userModel->getById($id);
        echo json_encode($user ?: ["message" => "Utente non trovato"]);
    }

    public function getAll() {
        $userModel = new User($this->conn);
        $users = $userModel->getAll();
        echo json_encode($users);
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

    public function create() {
        $data = json_decode(file_get_contents("php://input"), true);
        
        if (!isset($data['nome'], $data['cognome'], $data['email'])) {
            http_response_code(400);
            echo json_encode(['message' => 'Dati incompleti']);
            return;
        }
    
        $user = new User($this->conn);
        $user->nome = $data['nome'];
        $user->cognome = $data['cognome'];
        $user->email = $data['email'];
    
        // Opzionale: imposta anche password, genere, data_nascita se presenti
        $user->password = isset($data['password']) ? password_hash($data['password'], PASSWORD_BCRYPT) : null;
        $user->genere = $data['genere'] ?? null;
        $user->data_nascita = $data['data_nascita'] ?? null;
    
        if ($user->create()) {
            http_response_code(201);
            echo json_encode([
                'success' => true,
                'message' => 'Utente creato con successo',
                'user_id' => $this->conn->insert_id
            ]);
        } else {
            http_response_code(500);
            echo json_encode(['message' => 'Errore nella creazione utente']);
        }
    }
    
}
