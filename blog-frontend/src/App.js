import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import CreatePost from './components/CreatePost';
import AdminPanel from './components/AdminPanel';
import Auth from './components/Auth';

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
  };

  if (!isAuth) return <Auth onAuth={() => setIsAuth(true)} />;

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/create">New Post</Link> | <Link to="/admin">Admin</Link> | <button onClick={logout}>Logout</button>
      </nav>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
