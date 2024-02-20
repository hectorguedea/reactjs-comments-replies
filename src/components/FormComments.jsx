import { useState } from 'react'

import '../App.css'

function FormComments({ initialComments = [], onAddComment, onAddReply, onRemoveReply, styles = {} }) {
  const [comment, setComment] = useState("");
  const [reply, setReply] = useState("");
  const [editedValue, setEditedValue] = useState("");
  const [replyIndex, setReplyIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState({ commentIndex: null, replyIndex: null });

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleChangeReply = (event) => {
    setReply(event.target.value);
  };

  const handleReply = (index) => {
    setReplyIndex(index);
  };

  const handleAddComment = (event) => {
    event.preventDefault();
    if (comment.trim() !== "") {
      onAddComment(comment);
      setComment("");
      setReplyIndex(null);
    }
  };

  const handleAddReply = (event) => {
    event.preventDefault();
    if (reply.trim() !== "" && replyIndex !== null) {
      onAddReply(replyIndex, reply);
      setReply("");
      setReplyIndex(null);
    }
  };

  const handleRemoveReply = (index, replyIndex) => {
    const shouldRemove = window.confirm("¿Estás seguro de que quieres borrar esta respuesta?");
    if (shouldRemove) {
      onRemoveReply(index, replyIndex);
    }
  };

  const handleDoubleClick = (index, respuestaIndex, respuesta) => {
    setEditingIndex({ commentIndex: index, replyIndex: respuestaIndex });
    setEditedValue(respuesta);
  };

  const handleEditChange = (event) => {
    setEditedValue(event.target.value);
  };

  const handleEditSave = (index, replyIndex) => {
    if (editedValue !== null) {
      onAddReply(index, editedValue);
      setEditingIndex({ commentIndex: null, replyIndex: null });
      setEditedValue("");
    }
  };

  return (
    <>
      <form className={styles.formComment} onSubmit={handleAddComment}>
        <textarea
          value={comment}
          onChange={handleChange}
          rows={4}
          cols={50}
        />
        <button type="submit">
          Agregar Comentario
        </button>
      </form>

      <div className={styles.commentList}>
        {initialComments.map((comentario, index) => (
          <div key={index} className={styles.commentCard}>
            {comentario.text}
            {replyIndex !== index && (
              <button onClick={() => handleReply(index)} className={styles.addReply}>
                Respuesta
              </button>
            )}
            {replyIndex === index && (
              <form className={styles.formComment} onSubmit={handleAddReply}>
                <textarea
                  value={reply}
                  onChange={handleChangeReply}
                  rows={4}
                  cols={50}
                />
                <button type="submit">
                  Agregar Respuesta
                </button>
              </form>
            )}

            {comentario.replies?.map((respuesta, respuestaIndex) => (
              <div key={respuestaIndex} className={styles.reply}>
                <span>{respuestaIndex + 1}</span>

                {editingIndex.commentIndex === index && editingIndex.replyIndex === respuestaIndex ? (
                  <div className={styles.editable}>
                    <textarea
                      value={editedValue}
                      onChange={handleEditChange}
                    />
                    <button onClick={() => handleEditSave(index, respuestaIndex)}>
                      Guardar
                    </button>
                  </div>
                ) : (
                  <>
                    <div onDoubleClick={() => handleDoubleClick(index, respuestaIndex, respuesta)}>
                      {respuesta}
                    </div>

                    <button
                      className={styles.minusReply}
                      onClick={() => handleRemoveReply(index, respuestaIndex)}
                    >
                      Borrar
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default FormComments;
