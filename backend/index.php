<?php
// Avvia la sessione (utile per login/logout)
session_start();

// Includi il file che contiene tutte le rotte REST
require_once __DIR__ . '/routes/api.php';
