import { useEffect, useState } from 'react';
import '../styles/CommunitySupport.scss';

function CommunitySupport() {
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [commentData, setCommentData] = useState({});
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    const res = await fetch('http://localhost/parentup/backend/api/community/get_posts.php');
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCommentChange = (postId, value) => {
    setCommentData({ ...commentData, [postId]: value });
  };

  const submitPost = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch('http://localhost/parentup/backend/api/community/save_post.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    setFormData({ name: '', message: '' });
    await fetchPosts();
    setLoading(false);
  };

  const submitComment = async (postId) => {
    if (!commentData[postId]) return;

    await fetch('http://localhost/parentup/backend/api/community/save_comment.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        post_id: postId,
        name: 'Utente',
        comment: commentData[postId]
      })
    });

    setCommentData({ ...commentData, [postId]: '' });
    fetchPosts();
  };

  const deletePost = async (id) => {
    await fetch('http://localhost/parentup/backend/api/community/delete_post.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    fetchPosts();
  };

  const deleteComment = async (id) => {
    await fetch('http://localhost/parentup/backend/api/community/delete_comment.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    fetchPosts();
  };

  const updatePost = async (id, newMessage) => {
    await fetch('http://localhost/parentup/backend/api/community/update_post.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, message: newMessage })
    });
    setEditingPostId(null);
    fetchPosts();
  };

  const updateComment = async (id, newText) => {
    await fetch('http://localhost/parentup/backend/api/community/update_comment.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, comment: newText })
    });
    setEditingCommentId(null);
    fetchPosts();
  };

  return (
    <main className="container py-5">
      <h2 className="mb-4">🗨️ Bacheca della Community</h2>

      {/* Form per post */}
      <form onSubmit={submitPost} className="mb-4">
        <div className="mb-3">
          <input
            name="name"
            value={formData.name}
            onChange={handlePostChange}
            className="form-control"
            placeholder="Il tuo nome"
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            name="message"
            value={formData.message}
            onChange={handlePostChange}
            className="form-control"
            rows="3"
            placeholder="Scrivi un messaggio per la community..."
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Invio...' : 'Pubblica'}
        </button>
      </form>

      {/* Lista dei post */}
      <div className="community-posts">
        {posts.map(post => (
          <div key={post.id} className="card mb-4">
            <div className="card-body">
              <h5>{post.name}</h5>

              {/* Modifica Post */}
              {editingPostId === post.id ? (
                <>
                  <textarea
                    className="form-control mb-2"
                    defaultValue={post.message}
                    onBlur={(e) => updatePost(post.id, e.target.value)}
                    autoFocus
                  />
                  <button className="btn btn-sm btn-secondary" onClick={() => setEditingPostId(null)}>Annulla</button>
                </>
              ) : (
                <p>{post.message}</p>
              )}

              <small className="text-muted">{post.created_at}</small>

              <div className="mt-2">
                <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => setEditingPostId(post.id)}>Modifica</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => deletePost(post.id)}>Elimina</button>
              </div>

              {/* Commenti */}
              <div className="mt-4 ms-3">
                {post.comments?.map(comment => (
                  <div key={comment.id} className="border-start ps-3 mb-2">
                    <strong>{comment.name}</strong>:{" "}
                    {editingCommentId === comment.id ? (
                      <>
                        <input
                          className="form-control mb-1"
                          defaultValue={comment.comment}
                          onBlur={(e) => updateComment(comment.id, e.target.value)}
                          autoFocus
                        />
                        <button className="btn btn-sm btn-secondary" onClick={() => setEditingCommentId(null)}>Annulla</button>
                      </>
                    ) : (
                      comment.comment
                    )}
                    <div className="d-flex gap-2 mt-1">
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => setEditingCommentId(comment.id)}>Modifica</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => deleteComment(comment.id)}>Elimina</button>
                    </div>
                  </div>
                ))}

                {/* Form commento */}
                <div className="mt-3">
                  <input
                    className="form-control mb-2"
                    placeholder="Scrivi un commento..."
                    value={commentData[post.id] || ''}
                    onChange={(e) => handleCommentChange(post.id, e.target.value)}
                  />
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => submitComment(post.id)}
                  >
                    Commenta
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default CommunitySupport;
