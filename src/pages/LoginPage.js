// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Button from '../components/Button';

function LoginPage({ setIsLoggedIn, showFlashMessage }) { // Removed setCurrentPage prop
  const navigate = useNavigate(); // Get the navigate function

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Basic email validation regex: requires @ and ends with .com or .org
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|org)$/i; // Case-insensitive for .com/.org

    if (!emailRegex.test(email)) {
      showFlashMessage('Please enter a valid email address ending with .com or .org', 'error');
      return; // Stop the login process
    }

    // In a real application, you would send this data to a backend for authentication.
    // For now, we'll simulate a successful login.
    console.log('Attempting login with:', { email, password });

    setIsLoggedIn(true); // Set login status to true
    showFlashMessage('Login successful!', 'success'); // Show success message
    navigate('/'); // Redirect to home page (or a dashboard) after login using navigate
  };

  return (
    <div className="container mx-auto p-8 min-h-screen flex items-center justify-center bg-white text-gray-900"> {/* Changed bg-gray to bg-white for consistency */}
      <div className="bg-gray-200 rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-4xl font-extrabold text-red-600 mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-red-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-1">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-red-500"
            />
          </div>
          <Button type="submit" variant="primary" className="w-full">
            Login
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-700">
            Don't have an account?{' '}
            <a
              href="#"
              onClick={() => navigate('/signup')} // Use navigate for Sign Up
              className="text-red-600 hover:underline font-semibold"
            >
              Sign Up
            </a>
          </p>
          <p className="mt-2">
            <a
              href="#"
              onClick={() => navigate('/forgot-password')} // Use navigate for Forgot Password
              className="text-gray-600 hover:underline text-sm"
            >
              Forgot Password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;