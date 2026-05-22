import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import { Toaster } from 'react-hot-toast';

import Navbar from './components/Layout/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import OrdersPage from './pages/OrdersPage';

import AdminRoute from './components/Auth/AdminRoute';

import AdminDashboard from './pages/AdminDashboard';

import ProductManagement from './pages/ProductManagement';

import OrderManagement from './pages/OrderManagement';

import ProtectedRoute from './components/Auth/ProtectedRoute';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function App() {

  return (
    <BrowserRouter>

      <AuthProvider>

        <CartProvider>

          <Navbar />

          <Toaster />

          <Routes>

            <Route
              path='/'
              element={<Home />}
            />

            <Route
              path='/login'
              element={<Login />}
            />

            <Route
              path='/register'
              element={<Register />}
            />

            <Route
              path='/products/:id'
              element={<ProductDetailsPage />}
            />

            <Route
              path='/cart'
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />

            <Route
              path='/checkout'
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />

            <Route
              path='/orders'
              element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/admin'
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            <Route
              path='/admin/products'
              element={
                <AdminRoute>
                  <ProductManagement />
                </AdminRoute>
              }
            />

            <Route
              path='/admin/orders'
              element={
                <AdminRoute>
                  <OrderManagement />
                </AdminRoute>
              }
            />

          </Routes>

        </CartProvider>

      </AuthProvider>

    </BrowserRouter>
  );
}

export default App;