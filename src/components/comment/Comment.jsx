import { useState } from "react";
import axios from "axios";
import "./comment.css";

function Comment({ comments, id }) {
  const [text, setText] = useState("");
  const [replyText, setReplyText] = useState("")
  const token = window.localStorage.getItem("token");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleReply = async (id, commentId) => {
    setText('')
    setReplyText('')
    const values = {
        replyText
    }
    try {
        const response = await axios({
          method: "post",
          url: `${process.env.REACT_APP_URL}/comment/${id}/${commentId}/reply`,
          data: values,
          headers: {
            authorization: `${token}`,
          },
        });
        console.log(response);
      } catch (error) {
        console.log(error.response);
      }
  }

  const handleClick = async (id) => {
    setReplyText('')
    setText('');
    try {
        const response = await axios({
          method: "post",
          url: `${process.env.REACT_APP_URL}/comment/${id}`,
          data: {
            text
          },
          headers: {
            authorization: `${token}`,
          },
        });
        console.log(response);
      } catch (error) {
        console.log(error.response);
      }
  };
  return (
    <>
      <div className="comments">
        <h3 className="comments-title">Comments</h3>
        <div className="comment-form-title">Write comment</div>
        <textarea value={text} onChange={handleChange} />
        <button onClick={() => handleClick(id)}>Submit</button>
      </div>
      {comments &&
        comments.map((comment) => (
          <div key={comment._id} className="comment-card">
            <div className="comment-text">
              <small>{comment.user.firstName} {comment.user.lastName}</small>
              <div className="reply-name">
                <i> {comment.text} </i>
              </div>
            </div>
            <div style={{ marginLeft: "50px", marginTop: "30px"}}>
              {comment?.replies.length > 0 && comment.replies.map(reply => (
                <div key={reply._id} style={{ marginLeft: "50px", marginTop: "30px"}} className="reply-text">
                <small>{reply.user.firstName} {reply.user.lastName}</small>
                <div className="reply-name">
                  <i> {reply.text} </i>
                </div>
              </div>
              ))}
              <div>
                <input
                  className="reply-input"
                    onChange={(e) => setReplyText(e.target.value)}
                    value={replyText}
                  type="text"
                />
                <button className="reply-button" onClick={() => handleReply(id, comment._id)}>Reply</button>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default Comment;
