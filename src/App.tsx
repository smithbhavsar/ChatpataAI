import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import { useAuthStore } from './store/authStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// React Query Client for caching API data
const queryClient = new QueryClient();

// Lazy loading routes for faster initial load
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Profile = lazy(() => import('./pages/Profile'));
const QRScanner = lazy(() => import('./pages/QRScanner'));
const RestaurantMenu = lazy(() => import('./pages/RestaurantMenu'));
const Restaurants = lazy(() => import('./pages/Restaurants'));
const OrderHistory = lazy(() => import('./pages/OrderHistory'));
const WaiterDashboard = lazy(() => import('./pages/WaiterDashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const SuperAdminDashboard = lazy(() => import('./pages/SuperAdminDashboard'));

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

// 🔒 Protected Route Component
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-primary-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Suspense fallback={<div className="text-center text-gray-500">Loading...</div>}>
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
            </Suspense>
          </main>
          <Toaster position="top-right" />
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
