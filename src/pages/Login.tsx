import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useAuthStore } from '../store/authStore';
import { Phone } from 'lucide-react';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const user = await login(phoneNumber); // Get user data

      // Redirect based on user role
      if (user?.role === 'waiter') {
        navigate('/waiter-dashboard');
      } else if (user?.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (user?.role === 'superadmin') {
        navigate('/super-admin');
      } else {
        navigate('/'); // Default redirection
      }
    } catch (error: any) {
      setError(error.message || 'Invalid phone number. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-primary-100">
        <div className="flex justify-center mb-6">
          <div className="bg-primary-50 p-3 rounded-full">
            <Phone className="h-6 w-6 text-primary-700" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6 text-primary-900">
          Login with Phone
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-primary-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-2 border border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Continue'}
          </Button>
        </form>

        <p className="mt-4 text-sm text-primary-600 text-center">
          Enter your registered phone number to log in
        </p>
      </div>
    </div>
  );
};

export default Login;
