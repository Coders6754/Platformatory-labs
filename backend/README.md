# Profile Management Backend

This is the backend for the Profile Management application which uses Express, MongoDB, Auth0 for authentication, and Temporal for workflow management.

## Features

- User authentication via Auth0
- Profile management API
- Temporal workflows for asynchronous updates
- Integration with Crudcrud API

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/profile_app
   CRUD_CRUD_API=https://crudcrud.com/api/your-api-key
   AUTH0_CLIENT_ID=your-auth0-client-id
   AUTH0_DOMAIN=your-auth0-domain
   AUTH0_CLIENT_SECRET=your-auth0-client-secret
   BASE_URL=http://localhost:5000
   ```

3. Make sure Temporal is running:
   - Follow instructions at https://learn.temporal.io/getting_started/typescript/dev_environment/ to set up Temporal locally.

## Running the Application

1. Start the Temporal worker:
   ```bash
   npm run worker
   ```

2. In a new terminal, start the API server:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000`.

## API Endpoints

- `GET /api/auth/user` - Get current authenticated user
- `GET /api/auth/login` - Login with Auth0
- `GET /api/auth/logout` - Logout
- `GET /api/users/profile` - Get user profile (requires authentication)
- `PUT /api/users/profile` - Update user profile (requires authentication)
- `GET /api/users/workflow/:workflowId` - Check workflow status (requires authentication) 