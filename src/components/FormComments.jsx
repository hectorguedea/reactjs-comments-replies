import { useState } from 'react'

import '../App.css'

function FormComments() {
  const [comment, setComment] = useState("");
  const [reply, setReply] = useState(""); 
  const [replyIndex, setReplyIndex] = useState(""); 

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
    if (reply.trim() !== "") {
      commentsArray[replyIndex].replies.push(reply);
      setCommentsArray([...commentsArray]);
      setReply("");
      setReplyIndex("");
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
                       { respuesta } 
                    </div>
                ))}

          </div>
        ))}
      </div>

    </>
  )
}

export default FormComments;