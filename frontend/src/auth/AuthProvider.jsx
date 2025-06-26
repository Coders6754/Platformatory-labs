import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  
  // Use default values for development if environment variables are not set
  const domain = import.meta.env.VITE_AUTH0_DOMAIN || 'dev-example.us.auth0.com';
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID || 'your-client-id';
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE || 'http://localhost:5000/api';
  const redirectUri = window.location.origin;

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: audience,
        scope: 'openid profile email'
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider; 