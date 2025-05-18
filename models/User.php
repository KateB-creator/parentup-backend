<?php
class User {
    private $conn;
    private $table = "users";

    public $email;
    public $password;
    public $nome;
    public $cognome;
    public $genere;
    public $data_nascita;

    public function __construct($db) {
        $this->conn = $db;
    }

    // CREA UTENTE
    public function create() {
        $query = "INSERT INTO $this->table (email, password, nome, cognome, genere, data_nascita)
                  VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param(
            "ssssss",
            $this->email,
            $this->password,
            $this->nome,
            $this->cognome,
            $this->genere,
            $this->data_nascita
        );
        return $stmt->execute();
    }

    // TROVA UTENTE PER EMAIL
    public function getByEmail($email) {
        $query = "SELECT * FROM $this->table WHERE email = ? LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function getAll() {
        $query = "SELECT id, nome, cognome, email FROM $this->table ORDER BY id ASC";
        $result = $this->conn->query($query);
        $users = [];
        while ($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
        return $users;
    }

    // AGGIORNA EMAIL E/O PASSWORD
    public function update($id, $email = null, $password = null) {
        if (!$email && !$password) return false;

        $fields = [];
        $params = [];
        $types = "";

        if ($email) {
            $fields[] = "email = ?";
            $params[] = $email;
            $types .= "s";
        }
        if ($password) {
            $fields[] = "password = ?";
            $params[] = $password;
            $types .= "s";
        }

        $params[] = $id;
        $types .= "i";

        $query = "UPDATE $this->table SET " . implode(", ", $fields) . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param($types, ...$params);

        return $stmt->execute();
    }

    // ELIMINA UTENTE
    public function delete($id) {
        $query = "DELETE FROM $this->table WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }

    public function setPassword($id, $password) {
        $query = "UPDATE $this->table SET password = ? WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $hash = password_hash($password, PASSWORD_BCRYPT);
        $stmt->bind_param("si", $hash, $id);
        return $stmt->execute();
    }

    
}
