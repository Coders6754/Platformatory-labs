# Profile Management Application

A full-stack web application for user profile management with Auth0 authentication and Temporal.io workflows.

## Features

- User authentication with Auth0
- Profile management
- Temporal.io workflows for asynchronous data processing
- Integration with CrudCrud API

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- Temporal.io
- Auth0 for authentication

### Frontend
- React (with Vite)
- React Router
- Auth0 React SDK
- Tailwind CSS
- Axios

## Project Structure

- `backend/` - Express.js API with Temporal workflows
- `frontend/` - React frontend application

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Temporal server running locally

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/profile_app
   CRUD_CRUD_API=https://crudcrud.com/api/your-api-key
   AUTH0_CLIENT_ID=your-auth0-client-id
   AUTH0_DOMAIN=your-auth0-domain
   AUTH0_CLIENT_SECRET=your-auth0-client-secret
   BASE_URL=http://localhost:5000
   ```

4. Start the Temporal worker:
   ```bash
   npm run worker
   ```

5. In a new terminal, start the API server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   VITE_API_URL=http://localhost:5000
   VITE_AUTH0_DOMAIN=your-auth0-domain
   VITE_AUTH0_CLIENT_ID=your-auth0-client-id
   VITE_AUTH0_AUDIENCE=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173` and the backend API at `http://localhost:5000`. 
