# Full Stack E-Commerce Application

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- bcrypt

---

# Features

## User Features
- User Registration/Login
- JWT Authentication
- Product Listing
- Product Search
- Category Filter
- Price Sorting
- Product Details
- Cart Management
- Checkout
- Order History
- Order Details

## Admin Features
- Add Product
- Edit Product
- Delete Product
- View All Users
- View All Orders
- Update Order Status

---

# Project Structure

```bash
frontend/
backend/
```

---

# Environment Variables

## Backend

Create `.env` inside backend:

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
NODE_ENV=development
```

## Frontend

Create `.env` inside frontend:

```env
VITE_API_URL=http://localhost:5000/api
```

---

# Installation

## Backend

```bash
cd backend
npm install
npm start
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# Deployment

## Frontend
Deployed on Vercel

## Backend
Deployed on Render

## Database
MongoDB Atlas

---

# API Endpoints

## Auth
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/profile

## Products
- GET /api/products
- GET /api/products/:id
- POST /api/products
- PUT /api/products/:id
- DELETE /api/products/:id

## Cart
- GET /api/cart
- POST /api/cart
- PUT /api/cart/:productId
- DELETE /api/cart/:productId

## Orders
- POST /api/orders
- GET /api/orders
- GET /api/orders/:orderId

---

# Live Links
https://ecommerce-fullstack-app-omega.vercel.app/
