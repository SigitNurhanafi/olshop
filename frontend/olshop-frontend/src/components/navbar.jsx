import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../utils/storeZustand';
import { Redirect } from 'react-router-dom';

const Navbar = () => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const logout = useAuthStore((state) => state.logout);
  
    const handleLogout = () => {
      logout(); // Panggil fungsi logout dari store
      localStorage.removeItem('token'); // Hapus token dari local storage
      re
    };

    if (!isLoggedIn) {
        return <Redirect to="/login" />;
    }
  
    return (
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto">
          {isLoggedIn ? (
            <>
              <Link to="/home" className="text-white mr-4">Home</Link>
              <Link to="/profile" className="text-white mr-4">Profile</Link>
              <Link to="/product" className="text-white mr-4">Profile</Link>
              <button onClick={handleLogout} className="text-white">Logout</button>
            </>
          ) : (
            <Link to="/login" className="text-white">Login</Link>
          )}
        </div>
      </nav>
    );
  };
  
export default Navbar;
