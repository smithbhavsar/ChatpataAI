import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Button } from './ui/button';
import { ChefHat, User, LogOut, QrCode, Menu as MenuIcon, Flame } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="glass-effect sticky top-0 z-50 border-b border-primary-100">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2" onClick={handleNavigation}>
            <div className="relative">
              <ChefHat className="h-8 w-8 text-spice-600" />
              <Flame className="h-4 w-4 text-curry-500 absolute -top-1 -right-1 animate-bounce-slow" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-spice-600 to-curry-500 bg-clip-text text-transparent">
              चटपटा AI
            </span>
          </Link>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <MenuIcon className="h-6 w-6 text-primary-700" />
          </button>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/scan">
              <Button variant="ghost" className="hover:bg-primary-100">
                <QrCode className="h-5 w-5 mr-2 text-spice-500" />
                Scan QR
              </Button>
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/restaurants">
                  <Button variant="ghost" className="hover:bg-primary-100">
                    Restaurants
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" className="hover:bg-primary-100">
                    <User className="h-5 w-5 text-curry-500" />
                  </Button>
                </Link>
                <Button variant="ghost" onClick={handleLogout} className="hover:bg-primary-100">
                  <LogOut className="h-5 w-5 text-spice-500" />
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button className="bg-gradient-to-r from-spice-600 to-curry-500 text-white hover:from-spice-700 hover:to-curry-600">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-primary-100">
            <Link to="/scan" className="block py-2" onClick={handleNavigation}>
              <Button variant="ghost" className="w-full justify-start hover:bg-primary-100">
                <QrCode className="h-5 w-5 mr-2 text-spice-500" />
                Scan QR
              </Button>
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/restaurants" className="block py-2" onClick={handleNavigation}>
                  <Button variant="ghost" className="w-full justify-start hover:bg-primary-100">
                    Restaurants
                  </Button>
                </Link>
                <Link to="/profile" className="block py-2" onClick={handleNavigation}>
                  <Button variant="ghost" className="w-full justify-start hover:bg-primary-100">
                    <User className="h-5 w-5 mr-2 text-curry-500" />
                    Profile
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full justify-start hover:bg-primary-100"
                >
                  <LogOut className="h-5 w-5 mr-2 text-spice-500" />
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login" className="block py-2" onClick={handleNavigation}>
                <Button className="w-full bg-gradient-to-r from-spice-600 to-curry-500 text-white hover:from-spice-700 hover:to-curry-600">
                  Login
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;