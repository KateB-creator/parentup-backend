import React, { useState, useEffect } from 'react';
import {
  createPost,
  getPosts,
  createComment,
  deletePost,
  deleteComment,
  getUser,
  updatePost,
  updateComment
} from '../api/auth';

export default function BoardSection() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [commentInputs, setCommentInputs] = useState({});
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [editPostId, setEditPostId] = useState(null);
  const [editPostData, setEditPostData] = useState({ title: '', content: '' });
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentContent, setEditCommentContent] = useState('');

  const fetchPosts = () => {
    getPosts()
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchPosts();
    getUser()
      .then(res => {
        if (res.data && res.data.user && res.data.user.id) {
          setLoggedUserId(res.data.user.id);
          console.log("Utente loggato ID:", res.data.user.id);
        } else {
          console.warn("getUser() non ha restituito un utente valido:", res.data);
        }
      })
      .catch(err => console.error('Errore getUser:', err));
  }, []);

  const handlePostSubmit = () => {
    if (newPost.title && newPost.content) {
      createPost(newPost.title, newPost.content, loggedUserId)
        .then(() => {
          setNewPost({ title: '', content: '' });
          fetchPosts();
        })
        .catch(err => console.error(err));
    }
  };

  const handleCommentSubmit = (postId) => {
    const content = commentInputs[postId];
    if (content) {
      createComment(postId, content, loggedUserId)
        .then(() => {
          setCommentInputs(prev => ({ ...prev, [postId]: '' }));
          fetchPosts();
        })
        .catch(err => console.error('Errore invio commento:', err));
    }
  };

  const handleDeletePost = (postId) => {
    deletePost(postId, loggedUserId)
      .then(() => fetchPosts())
      .catch(err => console.error('Errore eliminazione post:', err));
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(commentId, loggedUserId)
      .then(() => fetchPosts())
      .catch(err => console.error('Errore eliminazione commento:', err));
  };

  const handleUpdatePost = (postId) => {
    updatePost(postId, editPostData.title, editPostData.content, loggedUserId)
      .then(() => {
        setEditPostId(null);
        setEditPostData({ title: '', content: '' });
        fetchPosts();
      })
      .catch(err => console.error('Errore modifica post:', err));
  };

  const handleUpdateComment = (commentId) => {
    updateComment(commentId, editCommentContent, loggedUserId)
      .then(() => {
        setEditCommentId(null);
        setEditCommentContent('');
        fetchPosts();
      })
      .catch(err => console.error('Errore modifica commento:', err));
  };

 
  return (
    <div className="mt-4">
      <h4>Condividi la tua esperienza sul rientro al lavoro</h4>

      <div className="mb-4 p-3 border rounded bg-light">
        <input
          type="text"
          placeholder="Titolo"
          className="form-control my-2"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Scrivi il tuo messaggio..."
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        />
        <button className="btn btn-primary" onClick={handlePostSubmit}>
          Pubblica
        </button>
      </div>

      <div className="mt-4">
        {posts.length === 0 ? (
          <p>Nessun post ancora. Sii il primo a scrivere!</p>
        ) : (
          posts.map(post => (
            <div key={post.id} className="border p-3 mb-4 rounded">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h5>{post.title}</h5>
                  <p>{post.content}</p>
                  <small className="text-muted">{post.created_at}</small>
                </div>
                {parseInt(post.user_id) === loggedUserId && (
                <div style={{ backgroundColor: 'lightyellow', border: '1px solid red' }}>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => {
                      setEditPostId(post.id);
                      setEditPostData({ title: post.title, content: post.content });
                    }}
                  >
                    ✏ MOD
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    🗑 DEL
                  </button>
                </div>
              )}
              </div>
              {editPostId === post.id && (
                <div className="mt-2">
                  <input
                    className="form-control mb-2"
                    value={editPostData.title}
                    onChange={(e) => setEditPostData({ ...editPostData, title: e.target.value })}
                  />
                  <textarea
                    className="form-control mb-2"
                    value={editPostData.content}
                    onChange={(e) => setEditPostData({ ...editPostData, content: e.target.value })}
                  />
                  <button className="btn btn-sm btn-success me-2" onClick={() => handleUpdatePost(post.id)}>Salva</button>
                  <button className="btn btn-sm btn-secondary" onClick={() => setEditPostId(null)}>Annulla</button>
                </div>
              )}

              <div className="mt-3 ps-3 border-start">
                <h6>Commenti</h6>
                {post.comments && post.comments.length > 0 ? (
                  post.comments.map(comment => (
                    <div key={comment.id} className="mb-2 d-flex justify-content-between">
                      <div>
                        <p className="mb-1">{comment.content}</p>
                        <small className="text-muted">{comment.created_at}</small>
                        {editCommentId === comment.id && (
                          <div className="mt-2">
                            <textarea
                              className="form-control mb-1"
                              value={editCommentContent}
                              onChange={(e) => setEditCommentContent(e.target.value)}
                            />
                            <button className="btn btn-sm btn-success me-2" onClick={() => handleUpdateComment(comment.id)}>Salva</button>
                            <button className="btn btn-sm btn-secondary" onClick={() => setEditCommentId(null)}>Annulla</button>
                          </div>
                        )}
                      </div>
                      {parseInt(comment.user_id) === loggedUserId && (
                        <div>
                          <button
                            className="btn btn-sm btn-warning me-2"
                            onClick={() => {
                              setEditCommentId(comment.id);
                              setEditCommentContent(comment.content);
                            }}
                          >✏</button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteComment(comment.id)}
                          >🗑</button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-muted">Nessun commento ancora.</p>
                )}

                <div className="mt-2">
                  <textarea
                    className="form-control mb-2"
                    rows="2"
                    placeholder="Scrivi un commento..."
                    value={commentInputs[post.id] || ''}
                    onChange={(e) =>
                      setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))
                    }
                  />
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleCommentSubmit(post.id)}
                  >
                    Commenta
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
