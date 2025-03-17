import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import QRScanner from './pages/QRScanner';
import RestaurantMenu from './pages/RestaurantMenu';
import Restaurants from './pages/Restaurants';
import OrderHistory from './pages/OrderHistory';
import WaiterDashboard from './pages/WaiterDashboard';
import AdminDashboard from './pages/AdminDashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import { useAuthStore } from './store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
}

function App() {
  const { user } = useAuthStore();

  return (
    <Router>
      <div className="min-h-screen bg-primary-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/scan" element={<QRScanner />} />
            <Route path="/restaurant/:restaurantId" element={<RestaurantMenu />} />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute allowedRoles={['user', 'waiter', 'admin', 'superadmin']}>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/orders" 
              element={
                <ProtectedRoute allowedRoles={['user', 'waiter', 'admin', 'superadmin']}>
                  <OrderHistory />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/waiter-dashboard" 
              element={
                <ProtectedRoute allowedRoles={['waiter', 'admin']}>
                  <WaiterDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin-dashboard" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/super-admin" 
              element={
                <ProtectedRoute allowedRoles={['superadmin']}>
                  <SuperAdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;