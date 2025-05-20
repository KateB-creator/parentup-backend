<?php

$allowed_origins = [
    'https://parentup.netlify.app',
    'http://localhost:5173' //  sviluppo locale
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
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
// Produzione: solo se usi HTTPS
ini_set('session.cookie_samesite', 'None');
ini_set('session.cookie_secure', '1');
session_start();

// --- ROUTING ---
require_once __DIR__ . '/routes/api.php';
