import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PostForm from "./components/hashan/PostForm";
import EditPost from "./components/hashan/EditPost";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Startup from "./pages/Startup";
import Profile from "./pages/Profile";
import MyAccount from "./pages/MyAccount";
import PostDetail from "./pages/PostDetail";
import MainLayout from "./components/hashan/MainLayout";
import LearningPlanPage from "./pages/LearningPlanPage";
import ProgressPage from "./pages/ProgressPage";
import NotificationsPage from "./pages/NotificationsPage";
import SavedPosts from "./pages/SavedPosts";

import OAuth2Success from "./pages/OAuth2Success";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Public Routes */}
          <Route path="/" element={<Startup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Protected Routes with Layout */}
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<PostForm />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/account" element={<MyAccount />} />
          <Route path="/account/:id" element={<MyAccount />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/learning-plans" element={<LearningPlanPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/saved" element={<SavedPosts />} />
          
          <Route path="/oauth2-success" element={<OAuth2Success />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
