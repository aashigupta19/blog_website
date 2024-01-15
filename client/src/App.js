import "./App.css";
import Post from "./components/Post";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { useState, useEffect } from "react";
import AuthContext from "./helper/AuthContext";
import axios from "axios";
function App() {
  let [loginStatus, setLoginStatus] = useState(false);
  let [userDetails, setUserDetails] = useState("");

  useEffect(() => {
    const validateURL = "http://localhost:4001/auth/validate";
    axios
      .get(validateURL, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        const rr = response.data;

        if (rr.error) {
          setLoginStatus(false);
        } else {
          setLoginStatus(true);
          setUserDetails(localStorage.getItem("loggedUser"));
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("loggedUser");

    setLoginStatus(false);
    setUserDetails("");

    alert("Logout success");
  };

  return (
    <div className="App">
      <AuthContext.Provider
        value={{ loginStatus, setLoginStatus, userDetails, setUserDetails }}
      >
        {/* prop drilling basically, we want to maintain a state which will take care of managing lgged in
         */}
        <Router>
          <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/createpost">Create A Post</Link>
            {
              //sessionStorage.getItem("accessToken") ? (
              loginStatus ? (
                <>
                  <Link to="/">Hey, {userDetails}!</Link>
                  <Link to="/" onClick={logout}>
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/signup">SignUp</Link>
                </>
              )
            }
          </div>
          <Routes>
            <Route path="/" exact element={<PostList />}></Route>
            <Route path="/createpost" exact element={<CreatePost />}></Route>
            <Route path="/post/:id" exact element={<Post />}></Route>
            <Route path="/login" exact element={<Login />}></Route>
            <Route path="/signup" exact element={<SignUp />}></Route>
          </Routes>
        </Router>
      </AuthContext.Provider>
      {/* <PostList posts={postList} /> */}
    </div>
  );
}

export default App;

// need to put conditional rendering here
// if user status - not logged in -> then display "login, registration tab"
//                - logged in     -> display profile pic on side of navbar

// why session storage is not a good approach
// easily anyone can set it via JS script as a fake
// if you close your window - session ends - session storage empties
// if we want something to persist longer, then advisable to use local storage
