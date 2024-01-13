import "./App.css";
import Post from "./components/Post";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Link to="/">Home</Link>
          <Link to="/createpost">Create A Post</Link>
        </div>
        <Routes>
          <Route path="/" exact element={<PostList />}></Route>
          <Route path="/createpost" exact element={<CreatePost />}></Route>
          <Route path="/post/:id" exact element={<Post />}></Route>
        </Routes>
      </Router>
      {/* <PostList posts={postList} /> */}
    </div>
  );
}

export default App;
