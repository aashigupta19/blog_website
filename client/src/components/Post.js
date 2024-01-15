import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Post() {
  let { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [updateBool, setUpdateBool] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    const URL = `http://localhost:4001/posts/id/${id}`;
    const resp = axios.get(URL).then((response) => {
      console.log("inside axios");
      console.log(response.data);
      setPost(response.data);
    });

    const URLCo = `http://localhost:4001/comments/id/${id}`;
    const resComments = axios.get(URLCo).then((response) => {
      console.log("inside axios");
      console.log(response.data);
      setComments(response.data);
      setUpdateBool(false); // downside of this is - a lot of server calls being made again and again!
    });

    console.log(resp);
    console.log("comments: ", resComments);
  }, [updateBool]);

  const addComment = (data) => {
    console.log("inside addComment", commentContent);
    console.log("Input data: ");

    const URL = "http://localhost:4001/comments";

    const resp = axios
      .post(
        URL,
        { commentBody: commentContent, PostId: id },
        {
          headers: {
            // accessToken: sessionStorage.getItem("accessToken"),
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        console.log("inside axios");
        console.log(response.data);
        console.log("yeye comment added");

        let rr = response.data;
        if (rr.error) {
          alert(rr.error);
          navigate("/login");
        } else {
          setUpdateBool(true);
          setCommentContent("");
        }
      });

    console.log(resp);
  };
  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{post.title}</div>
          <div className="content">{post.content}</div>
          <div className="author">{post.author}</div>
        </div>
      </div>
      ;
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="type your comments..."
            value={commentContent}
            onChange={(event) => {
              console.log(event.target.value);
              setCommentContent(event.target.value);
            }}
          ></input>
          <button type="submit" onClick={addComment}>
            Add
          </button>
        </div>
        <div className="listOfComments">
          {comments.map((comment) => {
            return (
              <div key={comment.id} className="comment">
                {comment.username}: {comment.commentBody}
              </div>
            );
          })}
        </div>
      </div>
      ;
    </div>
  );
}

export default Post;
