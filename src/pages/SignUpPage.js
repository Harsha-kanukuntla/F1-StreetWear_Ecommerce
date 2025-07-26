// src/pages/SignUpPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Button from '../components/Button';

function SignUpPage({ showFlashMessage }) { // Removed setCurrentPage prop
  const navigate = useNavigate(); // Get the navigate function

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();

    // Basic email validation regex: requires @ and ends with .com or .org
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|org)$/i; // Case-insensitive for .com/.org

    if (!emailRegex.test(email)) {
      showFlashMessage('Please enter a valid email address ending with .com or .org', 'error');
      return;
    }

    if (password !== confirmPassword) {
      showFlashMessage('Passwords do not match!', 'error');
      return;
    }
    if (password.length < 6) { // Example: minimum password length
      showFlashMessage('Password must be at least 6 characters long.', 'error');
      return;
    }

    // In a real application, you would send this data to a backend for user registration.
    console.log('Attempting sign up with:', { name, email, password });

    showFlashMessage('Account created successfully! Please log in.', 'success');
    navigate('/login'); // Redirect to login page after successful signup using navigate
  };

  return (
    <div className="container mx-auto p-8 min-h-screen flex items-center justify-center bg-white text-gray-900">
      <div className="bg-gray-200 rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-4xl font-extrabold text-red-600 mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-1">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-red-500"
            />
          </div>
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
          <div>
            <label htmlFor="confirmPassword" className="block text-lg font-medium text-gray-700 mb-1">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-red-500"
            />
          </div>
          <Button type="submit" variant="primary" className="w-full">
            Sign Up
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-700">
            Already have an account?{' '}
            <a
              href="#"
              onClick={() => navigate('/login')} // Use navigate for Login
              className="text-red-600 hover:underline font-semibold"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;