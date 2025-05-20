<?php
require_once __DIR__ . '/../vendor/autoload.php'; // Carica Composer
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

/**
 * Estrae l'ID utente dal token JWT presente nell'header Authorization.
 * @return int|null ID utente autenticato, o null se non valido.
 */
function getAuthenticatedUserId() {
    $headers = getallheaders();

    if (!isset($headers['Authorization'])) {
        return null;
    }

    $authHeader = $headers['Authorization'];

    if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
        $token = $matches[1];
        try {
            $decoded = JWT::decode($token, new Key(JWT_SECRET, 'HS256'));
            return $decoded->sub ?? null;
        } catch (Exception $e) {
            error_log('Errore JWT: ' . $e->getMessage());
            return null;
        }
    }

    return null;
}
