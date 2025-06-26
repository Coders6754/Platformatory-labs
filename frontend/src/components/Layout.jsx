import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="app-layout">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <footer>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Profile Management App</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 