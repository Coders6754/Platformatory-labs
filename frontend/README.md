# Profile Management Frontend

This is the frontend for the Profile Management application which uses React, Auth0 for authentication, and Tailwind CSS for styling.

## Features

- User authentication via Auth0
- Profile management
- Responsive design with Tailwind CSS

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   VITE_API_URL=http://localhost:5000
   VITE_AUTH0_DOMAIN=your-auth0-domain
   VITE_AUTH0_CLIENT_ID=your-auth0-client-id
   VITE_AUTH0_AUDIENCE=http://localhost:5000
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173`.

## Project Structure

- `src/auth` - Auth0 related components
- `src/components` - Reusable UI components
- `src/pages` - Page components
- `src/App.jsx` - Main application component with routing
