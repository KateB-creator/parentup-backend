<?php
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../vendor/autoload.php'; // Assicurati che questo punti al file giusto
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

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
        error_log("LOGIN richiesto");
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['email']) || !isset($data['password'])) {
            error_log("Email o password mancanti");
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Email e password sono obbligatori"]);
            return;
        }
    
        $userModel = new User($this->conn);
        $user = $userModel->getByEmail($data['email']);
    
        if ($user && password_verify($data['password'], $user['password'])) {
            error_log("Login OK, generazione token");
            $payload = [
                'sub' => $user['id'],
                'email' => $user['email'],
                'exp' => time() + (60 * 60 * 24),
            ];
            
            error_log("JWT_SECRET = " . ($_ENV['JWT_SECRET'] ?? 'NON DEFINITA'));
            $jwt = JWT::encode($payload, $_ENV['JWT_SECRET'], 'HS256');
    
            echo json_encode([
                "success" => true,
                "message" => "Login effettuato",
                "token" => $jwt,
                "user" => [
                    "id" => $user['id'],
                    "email" => $user['email'],
                    "nome" => $user['nome'],
                    "cognome" => $user['cognome']
                ]
            ]);
        } else {
            error_log("Login fallito: credenziali errate");
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

    public function update($id) {
        $data = json_decode(file_get_contents("php://input"), true);
        $email = $data['email'] ?? null;
        $password = isset($data['password']) && $data['password'] !== ''
            ? password_hash($data['password'], PASSWORD_BCRYPT)
            : null;
    
        $userModel = new User($this->conn);
        if ($userModel->update($id, $email, $password)) {
            echo json_encode(["success" => true, "message" => "Utente aggiornato"]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Errore durante l'aggiornamento"]);
        }
    }

    // Recupero password (verifica esistenza email)
    public function resetPassword() {
        $data = json_decode(file_get_contents("php://input"), true);
    
        if (!isset($data['email']) || !isset($data['newPassword'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Email e nuova password sono obbligatorie"]);
            return;
        }
    
        $userModel = new User($this->conn);
        $user = $userModel->getByEmail($data['email']);
    
        if ($user) {
            $result = $userModel->setPassword($user['id'], $data['newPassword']);
            if ($result) {
                echo json_encode(["success" => true, "message" => "Password aggiornata con successo"]);
            } else {
                http_response_code(500);
                echo json_encode(["success" => false, "message" => "Errore durante l'aggiornamento della password"]);
            }
        } else {
            http_response_code(404);
            echo json_encode(["success" => false, "message" => "Email non trovata"]);
        }
    }

    public function recoverPassword() {
        $data = json_decode(file_get_contents("php://input"), true);
    
        if (!isset($data['email'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Email obbligatoria"]);
            return;
        }
    
        $userModel = new User($this->conn);
        $user = $userModel->getByEmail($data['email']);
    
        if ($user) {
            echo json_encode([
                "success" => true,
                "message" => "Email trovata. Puoi procedere con il reset.",
                "user_id" => $user['id']
            ]);
        } else {
            http_response_code(404);
            echo json_encode(["success" => false, "message" => "Email non trovata"]);
        }
    }
    

}
