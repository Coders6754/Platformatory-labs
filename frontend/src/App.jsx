import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import AuthProvider from './auth/AuthProvider';

// Layout
import Layout from './components/Layout';

// Pages
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './auth/ProtectedRoute';

const AppWithRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

const AppContent = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="spinner">
        <div className="spinner-icon"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppWithRouter;
