import { useState } from 'react'
import FormComments from './components/FormComments'

import './App.css'

const styles = {
  formComment: 'form-comment',
  commentList: 'comment-list',
  commentCard: 'comment-card',
  addReply: 'addReply',
  reply: 'reply',
  editable: 'editable',
  minusReply: 'minus-reply',
};


function App() {
  
// Initial data from the simulated database
  const initialCommentsFromDatabase = [
    { text: 'Comentario 1', replies: ['Respuesta 1', 'Respuesta 2'] },
    { text: 'Comentario 2', replies: ['Respuesta 3'] }
  ];

  // State to store the current comments
  const [comments, setComments] = useState(initialCommentsFromDatabase);

  // Function to add a new comment
  
  const handleAddComment = (newCommentText) => {
    const newComment = { text: newCommentText, replies: [] };
    setComments((prevComments) => [...prevComments, newComment]);
  };

  // Function to add a reply to an existing comment

  const handleAddReply = (commentIndex, replyText) => {
    setComments((prevComments) => {
      const updatedComments = [...prevComments];
      updatedComments[commentIndex].replies.push(replyText);
      return updatedComments;
    });
  };

// Function to delete a reply from a comment
const handleRemoveReply = (commentIndex, replyIndex) => {
    setComments((prevComments) => {
      const updatedComments = [...prevComments];
      updatedComments[commentIndex].replies.splice(replyIndex, 1);
      return updatedComments;
    });
  };

  return (
    <div className="app-container">
      <h1>Comentarios</h1>
      {/* Rendering of the FormComments component with the appropriate props */}
      <FormComments
        initialComments={comments}
        onAddComment={handleAddComment}
        onAddReply={handleAddReply}
        onRemoveReply={handleRemoveReply}
        styles={styles}
      />
    </div>
  );
}


export default App;
