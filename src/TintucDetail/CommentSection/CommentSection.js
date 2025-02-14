import React, { useState } from 'react';
import '../CommentSection/CommentSection.css'

const CommentSection = ({ comments = [], setComments }) => {
  const [newComment, setNewComment] = useState('');
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentContent, setEditCommentContent] = useState('');

  // Handle adding a new comment
  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      const newCommentObj = {
        id: Date.now(),  // Use timestamp as ID
        content: newComment,
        timestamp: new Date().toLocaleString(),
      };
      setComments([newCommentObj, ...comments]);
      setNewComment('');  // Clear input after adding
    }
  };

  // Handle deleting a comment
  const handleDeleteComment = (id) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  // Handle editing a comment
  const handleEditComment = (id) => {
    const commentToEdit = comments.find(comment => comment.id === id);
    setEditCommentId(id);
    setEditCommentContent(commentToEdit.content);  // Set the content of the comment to be edited
  };

  // Handle saving the edited comment
  const handleSaveEdit = () => {
    if (editCommentContent.trim() !== '') {
      setComments(comments.map(comment =>
        comment.id === editCommentId ? { ...comment, content: editCommentContent } : comment
      ));
      setEditCommentId(null);  // Reset the edit state
      setEditCommentContent('');  // Clear the edit input
    }
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>

      {/* Input for new comment */}
      <textarea
        className="comment-input"
        placeholder="Enter your comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      ></textarea>
      <button className="comment-submit-button" onClick={handleAddComment}>Add Comment</button>

      {/* List of comments */}
      <div className="comments-list">
        {comments.slice(0, 4).map((comment) => (
          <div className="comment" key={comment.id}>
            {editCommentId === comment.id ? (
              <>
                <textarea
                  className="comment-input"
                  value={editCommentContent}
                  onChange={(e) => setEditCommentContent(e.target.value)}
                ></textarea>
                <button className="comment-submit-button" onClick={handleSaveEdit}>Save Edit</button>
                <button className="comment-submit-button" onClick={() => setEditCommentId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <p>{comment.content}</p>
                <small>{comment.timestamp}</small>
                <button onClick={() => handleEditComment(comment.id)}>Edit</button>
                <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;