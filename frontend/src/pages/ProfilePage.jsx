import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ProfileForm from '../components/ProfileForm';
import { Navigate } from 'react-router-dom';

const ProfilePage = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="spinner">
        <div className="spinner-icon"></div>
      </div>
    );
  }

  // Redirect to home if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container">
      <h1 className="profile-title">Your Profile</h1>
      <ProfileForm />
    </div>
  );
};

export default ProfilePage; 