import { useEffect, useState } from 'react';
import '../styles/CommunitySupport.scss';

function CommunitySupport() {
  const currentUser = JSON.parse(localStorage.getItem('user'));

  const [formData, setFormData] = useState({ name: currentUser?.name || '', message: '', media: null });
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
    const { name, value, files } = e.target;
    if (name === 'media') {
      setFormData(prev => ({ ...prev, media: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCommentChange = (postId, value) => {
    setCommentData({ ...commentData, [postId]: value });
  };

  const submitPost = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append('name', formData.name);
    form.append('message', formData.message);
    form.append('user_id', currentUser?.id);
    if (formData.media) {
      form.append('media', formData.media);
    }

    await fetch('http://localhost/parentup/backend/api/community/save_post.php', {
      method: 'POST',
      body: form
    });

    setFormData({ name: currentUser?.name || '', message: '', media: null });
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
        name: currentUser?.name || 'Utente',
        comment: commentData[postId],
        user_id: currentUser?.id
      })
    });

    setCommentData({ ...commentData, [postId]: '' });
    fetchPosts();
  };

  const deletePost = async (id) => {
    const res = await fetch('http://localhost/parentup/backend/api/community/delete_post.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id }) // <-- questo è fondamentale
    });
  
    const result = await res.json();
    console.log(result);
  
    if (result.success) {
      fetchPosts(); // aggiorna i post
    } else {
      alert(result.error || 'Errore nella cancellazione');
    }
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
      body: JSON.stringify({ id, message: newMessage, user_id: currentUser?.id })
    });
    setEditingPostId(null);
    fetchPosts();
  };

  const updateComment = async (id, newText) => {
    await fetch('http://localhost/parentup/backend/api/community/update_comment.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, comment: newText, user_id: currentUser?.id })
    });
    setEditingCommentId(null);
    fetchPosts();
  };

  return (
    <main className="container py-5">
      <h2 className="mb-4">🌐 Social Community</h2>

      {/* Form per nuovo post */}
      <form onSubmit={submitPost} className="mb-5">
        <input name="name" value={formData.name} onChange={handlePostChange} className="form-control mb-2" placeholder="Il tuo nome" required />
        <textarea name="message" value={formData.message} onChange={handlePostChange} className="form-control mb-2" rows="3" placeholder="Scrivi qualcosa..." required />
        <input type="file" name="media" onChange={handlePostChange} className="form-control mb-2" />
        <button type="submit" className="btn btn-primary">{loading ? 'Invio...' : 'Pubblica'}</button>
      </form>

      {/* Elenco post */}
      <div className="community-posts">
        {posts.map(post => (
          <div key={post.id} className="card mb-4 shadow-sm">
            <div className="card-body">
              <div className="post-header mb-2">
                <div className="avatar">{post.name.charAt(0).toUpperCase()}</div>
                <div>
                  <div className="username">{post.name}</div>
                  <small className="text-muted">{post.created_at}</small>
                </div>
              </div>

              {editingPostId === post.id ? (
                <>
                  <textarea className="form-control mb-2" defaultValue={post.message} onBlur={(e) => updatePost(post.id, e.target.value)} autoFocus />
                  <button className="btn btn-sm btn-secondary" onClick={() => setEditingPostId(null)}>Annulla</button>
                </>
              ) : (
                <p>{post.message}</p>
              )}

              {post.media && (
                post.media.match(/\.(jpeg|jpg|png|gif)$/i) ? (
                  <img src={`http://localhost/parentup/backend/uploads/${post.media}`} alt="media" className="img-fluid rounded my-2 post-media" />
                ) : (
                  <video controls className="w-100 my-2">
                    <source src={`http://localhost/parentup/backend/uploads/${post.media}`} type="video/mp4" />
                    Il tuo browser non supporta il video.
                  </video>
                )
              )}

              {/* Azioni sul post */}
              {parseInt(currentUser?.id) === parseInt(post.user_id) && (
                <div className="text-end mt-2">
                  <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => setEditingPostId(post.id)}>Modifica</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => deletePost(post.id)}>Elimina</button>
                </div>
              )}

              {/* Commenti */}
              <div className="comment-thread mt-4">
                {post.comments?.map(comment => (
                  <div key={comment.id} className="mb-3">
                    <strong className="comment-author">{comment.name}</strong>:{" "}
                    {editingCommentId === comment.id ? (
                      <>
                        <input className="form-control mb-1" defaultValue={comment.comment} onBlur={(e) => updateComment(comment.id, e.target.value)} autoFocus />
                        <button className="btn btn-sm btn-secondary" onClick={() => setEditingCommentId(null)}>Annulla</button>
                      </>
                    ) : (
                      comment.comment
                    )}
                    <div className="comment-meta">{comment.created_at}</div>

                    {parseInt(currentUser?.id) === parseInt(comment.user_id) && (
                      <div className="comment-actions d-flex gap-2 mt-1">
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => setEditingCommentId(comment.id)}>Modifica</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => deleteComment(comment.id)}>Elimina</button>
                      </div>
                    )}
                  </div>
                ))}

                {/* Nuovo commento */}
                <div className="mt-3">
                  <input
                    className="form-control mb-2"
                    placeholder="Scrivi un commento..."
                    value={commentData[post.id] || ''}
                    onChange={(e) => handleCommentChange(post.id, e.target.value)}
                  />
                  <button className="btn btn-sm btn-outline-primary" onClick={() => submitComment(post.id)}>Commenta</button>
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
