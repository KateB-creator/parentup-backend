<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require_once(__DIR__ . '/../db.php');

// Recupera tutti i post con user_id incluso
$postsStmt = $pdo->query("
  SELECT id, user_id, name, message, media_url, created_at 
  FROM community_posts 
  ORDER BY created_at DESC
");
$posts = $postsStmt->fetchAll(PDO::FETCH_ASSOC);

// Aggiungi i commenti a ciascun post con user_id
foreach ($posts as &$post) {
    $commentsStmt = $pdo->prepare("
      SELECT id, post_id, user_id, name, comment, created_at 
      FROM community_comments 
      WHERE post_id = ? 
      ORDER BY created_at ASC
    ");
    $commentsStmt->execute([$post['id']]);
    $post['comments'] = $commentsStmt->fetchAll(PDO::FETCH_ASSOC);
}

echo json_encode($posts);
