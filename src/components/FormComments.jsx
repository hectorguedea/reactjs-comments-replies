import { useState } from 'react'

import '../App.css'

function FormComments() {
  const [comment, setComment] = useState("");
  const [reply, setReply] = useState(""); 
  const [editedValue, setEditedValue] = useState(""); 
  const [replyIndex, setReplyIndex] = useState(null); 
  const [editingIndex, setEditingIndex] = useState({ commentIndex: null, replyIndex: null });


  const [commentsArray, setCommentsArray] = useState([]); 

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleChangeReply = (event) =>{
    setReply(event.target.value);
  }

  const handleReply = (index) =>{
   setReplyIndex(index);
  }

  const handleAddComment = () => {

    if (comment.trim() !== "") {
      setCommentsArray([...commentsArray, {text:comment, replies:[]}]);
      setComment("");
      setReplyIndex("");
    }
  };


  const handleAddReply = () =>{
    if (reply.trim() !== "" && replyIndex !== "") {
      commentsArray[replyIndex].replies.push(reply);
      setCommentsArray([...commentsArray]);
      setReply("");
      setReplyIndex("");
    }
  }

  const handleRemoveReply = (index, replyIndex) =>{
    const shouldRemove = window.confirm("¿Estás seguro de que quieres borrar esta respuesta?");
    if (shouldRemove) {
      commentsArray[index].replies.splice(replyIndex, 1);
      setCommentsArray([...commentsArray]);
    }
  }

  const handleDoubleClick = (index,respuestaIndex, respuesta) =>{
    setEditingIndex([index, respuestaIndex]);
    setEditedValue(respuesta);
  }

  const handleEditChange = (event) => {
    setEditedValue(event.target.value);
  };

  const handleEditSave = (index, replyIndex) =>{

    if (editedValue !== null) {
      commentsArray[index].replies[replyIndex] = editedValue; 
      setCommentsArray([...commentsArray]);
      setEditingIndex({ commentIndex: null, replyIndex: null });
      setEditedValue("");
    }
  }

  return (
    <>

    <div className='form-comment'>
      <textarea
          value={comment}
          onChange={handleChange}
          rows={4} 
          cols={50}
        />
        <button
        onClick={handleAddComment}
        >
          Agregar Comentario
        </button>
      </div>

      <div className="comment-list">
        {commentsArray.map((comentario, index) => (
          <div key={index} className="comment-card">
            {comentario.text}
             {replyIndex !== index && (<button onClick={() => handleReply(index)}  className='addReply'>Respuesta</button>)}
              {replyIndex === index && (

                  <div className='form-comment'>
                        <textarea
                          value={reply}
                          onChange={handleChangeReply}
                          rows={4} 
                          cols={50}
                        />
                         <button
                          onClick={handleAddReply}
                          >
                            Agregar Respuesta
                          </button>
                  </div> 
              )}

                {commentsArray[index].replies?.map((respuesta, respuestaIndex) => (
                    <div key={respuestaIndex} className='reply'>
                      <span>{respuestaIndex + 1}</span>


                          {editingIndex[0] === index &&  editingIndex[1] === respuestaIndex ? (
                            <div className='editable'>
                              <textarea
                                value={editedValue}
                                onChange={handleEditChange}
                              />
                              <button onClick={() => handleEditSave(index, respuestaIndex)}>Guardar</button>
                            </div>
                          ) : (
                            <>
                          <div onDoubleClick={() => handleDoubleClick(index, respuestaIndex, respuesta)}>
                                  { respuesta } 
                          </div>

                          <button
                          className='minus-reply'
                            onClick={() => handleRemoveReply(index, respuestaIndex) }
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
  )
}

export default FormComments;