<?php
// --- CORS ---
$allowed_origin = 'http://localhost:5173';

if (isset($_SERVER['HTTP_ORIGIN']) && $_SERVER['HTTP_ORIGIN'] === $allowed_origin) {
    header("Access-Control-Allow-Origin: $allowed_origin");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
}

// Rispondi alle richieste preflight CORS (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// --- SESSIONE ---
// In sviluppo (HTTP): NON usare Secure
ini_set('session.cookie_samesite', 'None');
ini_set('session.cookie_secure', '1');
session_start();

// --- ROUTING ---
require_once __DIR__ . '/routes/api.php';
