# API Documentation - E-Commerce Backend

Base URL:

```bash
http://localhost:5000/api
```

Production Base URL:

```bash
https://YOUR_RENDER_BACKEND_URL/api
```

---

# Authentication APIs

---

## Register User

### Endpoint

```http
POST /auth/register
```

### Request Body

```json
{
  "name": "Rishabh",
  "email": "rishabh@gmail.com",
  "password": "Password@123",
  "confirmPassword": "Password@123"
}
```

### Success Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token",
  "user": {
    "_id": "123456",
    "name": "Rishabh",
    "email": "rishabh@gmail.com",
    "role": "user"
  }
}
```

---

## Login User

### Endpoint

```http
POST /auth/login
```

### Request Body

```json
{
  "email": "admin@gmail.com",
  "password": "admin123"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token",
  "user": {
    "_id": "123456",
    "name": "Admin",
    "email": "admin@gmail.com",
    "role": "admin"
  }
}
```

---

## Get User Profile

### Endpoint

```http
GET /auth/profile
```

### Headers

```bash
Authorization: Bearer TOKEN
```

### Success Response

```json
{
  "success": true,
  "user": {
    "_id": "123456",
    "name": "Rishabh",
    "email": "rishabh@gmail.com",
    "role": "user"
  }
}
```

---

# Product APIs

---

## Get All Products

### Endpoint

```http
GET /products
```

### Query Parameters

| Parameter | Description |
|---|---|
| search | Search by product name |
| category | Filter by category |
| sort | asc / desc |
| page | Pagination page |
| limit | Items per page |

### Example

```http
GET /products?search=iphone&category=Electronics&sort=asc&page=1&limit=6
```

### Success Response

```json
{
  "success": true,
  "products": [],
  "totalProducts": 15,
  "totalPages": 3
}
```

---

## Get Product By ID

### Endpoint

```http
GET /products/:id
```

### Success Response

```json
{
  "success": true,
  "product": {}
}
```

---

## Create Product (Admin)

### Endpoint

```http
POST /products
```

### Headers

```bash
Authorization: Bearer TOKEN
```

### Request Body

```json
{
  "name": "iPhone 15",
  "description": "Latest Apple smartphone",
  "price": 120000,
  "category": "Electronics",
  "images": [
    "https://image-url.com/image1.jpg",
    "https://image-url.com/image2.jpg"
  ],
  "stock": 10
}
```

### Success Response

```json
{
  "success": true,
  "message": "Product created successfully",
  "product": {}
}
```

---

## Update Product (Admin)

### Endpoint

```http
PUT /products/:id
```

### Headers

```bash
Authorization: Bearer TOKEN
```

### Success Response

```json
{
  "success": true,
  "message": "Product updated successfully",
  "product": {}
}
```

---

## Delete Product (Admin)

### Endpoint

```http
DELETE /products/:id
```

### Headers

```bash
Authorization: Bearer TOKEN
```

### Success Response

```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

# Cart APIs

---

## Get Cart

### Endpoint

```http
GET /cart
```

### Headers

```bash
Authorization: Bearer TOKEN
```

### Success Response

```json
{
  "success": true,
  "cart": {
    "items": []
  }
}
```

---

## Add To Cart

### Endpoint

```http
POST /cart
```

### Headers

```bash
Authorization: Bearer TOKEN
```

### Request Body

```json
{
  "productId": "123456",
  "quantity": 2
}
```

### Success Response

```json
{
  "success": true,
  "message": "Product added to cart",
  "cart": {}
}
```

---

## Update Cart Quantity

### Endpoint

```http
PUT /cart/:productId
```

### Request Body

```json
{
  "quantity": 3
}
```

### Success Response

```json
{
  "success": true,
  "message": "Cart updated",
  "cart": {}
}
```

---

## Remove Cart Item

### Endpoint

```http
DELETE /cart/:productId
```

### Success Response

```json
{
  "success": true,
  "message": "Item removed from cart"
}
```

---

# Order APIs

---

## Create Order

### Endpoint

```http
POST /orders
```

### Headers

```bash
Authorization: Bearer TOKEN
```

### Request Body

```json
{
  "fullName": "Rishabh Nigam",
  "address": "Bangalore, India",
  "phone": "9876543210"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Order placed successfully",
  "order": {}
}
```

---

## Get User Orders

### Endpoint

```http
GET /orders
```

### Headers

```bash
Authorization: Bearer TOKEN
```

### Success Response

```json
{
  "success": true,
  "orders": []
}
```

---

## Get Order Details

### Endpoint

```http
GET /orders/:orderId
```

### Headers

```bash
Authorization: Bearer TOKEN
```

### Success Response

```json
{
  "success": true,
  "order": {}
}
```

---

# Admin APIs

---

## Get All Users

### Endpoint

```http
GET /admin/users
```

### Headers

```bash
Authorization: Bearer TOKEN
```

### Access

Admin Only

### Success Response

```json
{
  "success": true,
  "users": []
}
```

---

## Get All Orders

### Endpoint

```http
GET /admin/orders
```

### Headers

```bash
Authorization: Bearer TOKEN
```

### Access

Admin Only

### Success Response

```json
{
  "success": true,
  "orders": []
}
```

---

## Update Order Status

### Endpoint

```http
PUT /admin/orders/:orderId/status
```

### Headers

```bash
Authorization: Bearer TOKEN
```

### Request Body

```json
{
  "status": "shipped"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Order status updated",
  "order": {}
}
```

---

# Authentication Notes

Protected routes require JWT token.

Pass token in headers:

```bash
Authorization: Bearer YOUR_TOKEN
```

---

# Admin Credentials

```bash
Email: rish@gmail.com
Password: 123456
```

---

# Technologies Used

- React.js
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Tailwind CSS
- Axios
- Mongoose
- bcrypt
