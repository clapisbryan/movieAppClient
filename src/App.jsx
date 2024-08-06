
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar/AppNavbar';
import Login from './pages/Login/Login';
import Movie from './pages/Movie/Movie';
import NoMatch from './pages/NoMatch/NoMatch';
import Profile from './components/Profile/Profile';
import Register from './pages/Register/Register';
import { useEffect, useState } from 'react';

function App() {
  const token = localStorage.getItem('token');
  const [isToken, setIsToken] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setIsToken(false);
  }

  useEffect(() => {
    if (token?.length !== 0 && token?.length !== undefined) {
      setIsToken(true);
    } else {
      setIsToken(false);
    }
    
  }, [token])

  return (
    <>
      <AppNavbar isToken={isToken} handleLogout={handleLogout} />
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/movies" element={<Movie />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
