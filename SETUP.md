# Quick Setup Guide

## Step-by-Step Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd eco
```

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/eco
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
EOF

# Start MongoDB (if using local)
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod

# Start backend server
npm run dev
```

### 3. Frontend Setup (in a new terminal)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start frontend server
npm run dev
```

### 4. Access the Application

- Frontend: http://localhost:3000
- Admin Panel: http://localhost:3000/admin
- Backend API: http://localhost:5000/api
- Health Check: http://localhost:5000/health

## Environment Variables

### Backend (.env)
Create `backend/.env` with:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/eco
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local) - Optional
Create `frontend/.env.local` if needed:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Troubleshooting

- **MongoDB not connecting**: Make sure MongoDB is running or use MongoDB Atlas
- **Port in use**: Change PORT in .env or kill the process using the port
- **Module errors**: Delete `node_modules` and run `npm install` again

For detailed information, see [README.md](./README.md)

