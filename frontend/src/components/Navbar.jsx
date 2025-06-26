import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

const Navbar = () => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <nav>
      <div className="container">
        <Link to="/" className="nav-brand">Profile Management</Link>
        <div className="nav-links">
          {isAuthenticated ? (
            <>
              <Link to="/profile">My Profile</Link>
              <div className="user-info">
                {user?.picture && (
                  <img 
                    src={user.picture} 
                    alt={user?.name || 'User'}
                    className="user-avatar"
                  />
                )}
                <span>{user?.name}</span>
              </div>
              <LogoutButton />
            </>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 