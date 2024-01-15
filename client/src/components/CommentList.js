import React from "react";
import { useContext } from "react";
import AuthContext from "../helper/AuthContext";
import axios from "axios";
// function
function CommentList({ commentList, updateList }) {
  let { userDetails } = useContext(AuthContext);
  const deleteComment = (id) => {
    console.log("inside delete comment");
    console.log("id", id);
    const URL = `http://localhost:4001/comments/${id}`;

    const resp = axios
      .delete(URL, {
        headers: {
          // accessToken: sessionStorage.getItem("accessToken"),
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log("inside axios");
        console.log(response.data);
        const rr = response.data;

        if (rr.error) {
          alert(rr.error);
        } else if (rr.success) {
          console.log("yeye comment deleted");
          alert(rr.success);
          updateList(true);
        }
      });

    console.log(resp);
  };

  // we need to delete that corresponding comment

  return (
    <div className="listOfComments">
      {commentList.map((comment) => {
        return (
          <div key={comment.id} className="comment">
            <div>
              {comment.username}: {comment.commentBody}{" "}
            </div>
            {userDetails && userDetails === comment.username ? (
              <button
                onClick={() => {
                  deleteComment(comment.id);
                }}
              >
                Delete
              </button>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CommentList;
