import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";


import Home from "./pages/Home";
import PostForm from "./components/PostForm";
import EditPost from "./components/EditPost";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Startup from "./pages/Startup";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import MyAccount from "./pages/MyAccount";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<PostForm />} />
        <Route path="/edit-post/:id" element={<EditPost />} />

        <Route path="/" element={<Startup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/account/:id" element={<MyAccount />} />
        <Route path="/account" element={<MyAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
