<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

session_start();

require_once('../config/db.php');

$sql = "SELECT * FROM posts ORDER BY created_at DESC";
$result = $conn->query($sql);

$posts = [];

while ($row = $result->fetch_assoc()) {
    $post_id = $row['id'];

    // recupera commenti per ogni post
    $comment_sql = "SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC";
    $stmt = $conn->prepare($comment_sql);
    $stmt->bind_param("i", $post_id);
    $stmt->execute();
    $comments_result = $stmt->get_result();

    $comments = [];
    while ($comment = $comments_result->fetch_assoc()) {
        $comments[] = $comment;
    }

    $row['comments'] = $comments;
    $posts[] = $row;
}

echo json_encode($posts);

$conn->close();
?>
