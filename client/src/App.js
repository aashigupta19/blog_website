import "./App.css";
import Post from "./components/Post";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Link to="/">Home</Link>

          <Link to="/createpost">Create A Post</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Registration</Link>
        </div>
        <Routes>
          <Route path="/" exact element={<PostList />}></Route>
          <Route path="/createpost" exact element={<CreatePost />}></Route>
          <Route path="/post/:id" exact element={<Post />}></Route>
          <Route path="/login" exact element={<Login />}></Route>
          <Route path="/signup" exact element={<SignUp />}></Route>
        </Routes>
      </Router>
      {/* <PostList posts={postList} /> */}
    </div>
  );
}

export default App;
