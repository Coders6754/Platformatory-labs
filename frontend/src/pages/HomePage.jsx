import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import LoginButton from '../components/LoginButton';

const HomePage = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="spinner">
        <div className="spinner-icon"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="home-hero">
        <h1 className="home-title">Welcome to Profile Management</h1>
        <p className="home-subtitle">
          Securely manage your personal information with our profile management system.
        </p>

        {isAuthenticated ? (
          <div className="home-cta">
            <Link to="/profile" className="btn btn-primary">
              View Your Profile
            </Link>
          </div>
        ) : (
          <div className="home-card">
            <h2>Get Started</h2>
            <p>
              Log in to access your profile information and make updates.
            </p>
            <div className="home-cta">
              <LoginButton />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage; 