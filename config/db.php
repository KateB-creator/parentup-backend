<?php
require_once __DIR__ . '/../vendor/autoload.php'; // Carica Composer

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

define('JWT_SECRET', $_ENV['JWT_SECRET']); // ✅ Aggiunto

class Database {
    private $host;
    private $user;
    private $password;
    private $dbname;
    public $conn;

    public function __construct() {
        $this->host = $_ENV['DB_HOST'];
        $this->user = $_ENV['DB_USER'];
        $this->password = $_ENV['DB_PASS'];
        $this->dbname = $_ENV['DB_NAME'];
    }

    public function connect() {
        $this->conn = new mysqli($this->host, $this->user, $this->password, $this->dbname);
        if ($this->conn->connect_error) {
            die("Connessione fallita: " . $this->conn->connect_error);
        }
        return $this->conn;
    }
}
