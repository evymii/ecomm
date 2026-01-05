# E-commerce Project Setup Guide

This guide will help your teammates set up and run both the frontend and backend of the e-commerce application.

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cloud option)
- **Git** - [Download here](https://git-scm.com/)

## Project Structure

```
eco/
├── backend/          # Express.js + TypeScript backend
├── frontend/         # Next.js + TypeScript frontend
└── README.md         # This file
```

## Backend Setup

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/eco
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/eco

# JWT Configuration
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRE=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

**Important**:

- Replace `your-secret-key-change-in-production` with a strong, random secret key
- Update `MONGODB_URI` with your MongoDB connection string
- For production, use environment variables or a secure secrets manager

### 4. Start MongoDB

**Option A: Local MongoDB**

```bash
# macOS (using Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
# Start MongoDB service from Services panel
```

**Option B: MongoDB Atlas (Cloud)**

- Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a free cluster
- Get your connection string
- Update `MONGODB_URI` in `.env`

### 5. Run Backend

**Development mode (with hot reload):**

```bash
npm run dev
```

**Production mode:**

```bash
npm run build
npm start
```

The backend server will start on `http://localhost:5000`

### 6. Verify Backend is Running

Open your browser or use curl:

```bash
curl http://localhost:5000/health
```

You should see:

```json
{ "status": "ok", "message": "Server is running" }
```

## Frontend Setup

### 1. Navigate to Frontend Directory

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration (Optional)

If the frontend needs to connect to a different backend URL, create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Run Frontend

**Development mode:**

```bash
npm run dev
```

**Production mode:**

```bash
npm run build
npm start
```

The frontend will start on `http://localhost:3000`

### 5. Access the Application

Open your browser and navigate to:

- **Frontend**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **Backend API**: http://localhost:5000/api

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### User Routes (requires authentication)

- `GET /api/user/profile` - Get user profile
- `GET /api/user/orders` - Get user orders
- `GET /api/user/cart` - Get user cart

### Admin Routes (requires admin role)

- `GET /api/admin/dashboard` - Admin dashboard
- `GET /api/admin/users` - Get all users
- `GET /api/admin/products` - Products management
- `GET /api/admin/orders` - Orders management

## Testing the Setup

### 1. Test Backend Health

```bash
curl http://localhost:5000/health
```

### 2. Test User Registration

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 3. Test User Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## Common Issues & Solutions

### MongoDB Connection Error

- **Issue**: `Database connection error`
- **Solution**:
  - Ensure MongoDB is running locally, or
  - Check your MongoDB Atlas connection string
  - Verify network access in MongoDB Atlas if using cloud

### Port Already in Use

- **Issue**: `EADDRINUSE: address already in use`
- **Solution**:
  - Change the `PORT` in `.env` file, or
  - Kill the process using the port:

    ```bash
    # Find process
    lsof -i :5000  # for backend
    lsof -i :3000  # for frontend

    # Kill process
    kill -9 <PID>
    ```

### Module Not Found Errors

- **Issue**: `Cannot find module`
- **Solution**:
  ```bash
  # Delete node_modules and reinstall
  rm -rf node_modules package-lock.json
  npm install
  ```

### TypeScript Compilation Errors

- **Issue**: Type errors during build
- **Solution**:
  ```bash
  # Clean and rebuild
  cd backend
  rm -rf dist
  npm run build
  ```

## Development Workflow

1. **Start MongoDB** (if using local)
2. **Start Backend**: `cd backend && npm run dev`
3. **Start Frontend**: `cd frontend && npm run dev` (in a new terminal)
4. **Make changes** - Both servers have hot reload enabled
5. **Test changes** in browser at http://localhost:3000

## Environment Variables Summary

### Backend (.env)

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRE` - JWT token expiration (default: 7d)
- `CORS_ORIGIN` - Allowed CORS origin (default: http://localhost:3000)

### Frontend (.env.local) - Optional

- `NEXT_PUBLIC_API_URL` - Backend API URL

## Additional Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)

## Getting Help

If you encounter issues:

1. Check the error messages in the terminal
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Check that MongoDB is running and accessible
5. Review the Common Issues section above

---

**Happy Coding! 🚀**
