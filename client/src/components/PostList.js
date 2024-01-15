import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom";  no longer used
import { useNavigate } from "react-router-dom";
function PostList({ posts }) {
  //   let postsList = posts;

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const URL = "http://localhost:4001/posts";
    const resp = axios.get(URL).then((response) => {
      console.log("inside axios");
      console.log(response.data);
      setPostList(response.data);
    });

    console.log(resp);
  }, []);

  //   let history = useHistory();
  let history = useNavigate();
  return (
    <div className="postList">
      {postList.map((post) => {
        return (
          <div
            key={post.id}
            className="post"
            onClick={() => {
              history(`/post/${post.id}`);
            }}
          >
            <div className="title">{post.title}</div>
            <div className="content">{post.content}</div>
            <div className="author">{post.author}</div>
          </div>
        );
      })}
    </div>
  );
}

export default PostList;

// Replace useHistory with useNavigate then

// const navigate = useNavigate();
// and then replace history.push('/path') with navigate('/path')

// Change history.replace('/path') with navigate('/path', { replace: true })

// Want to use state in push/navigate do navigate('/path', { state: { name:'Xyz' }})
