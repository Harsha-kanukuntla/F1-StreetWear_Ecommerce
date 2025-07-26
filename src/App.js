// src/App.js
import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import WishlistPage from './pages/WishlistPage';
import ProfilePage from './pages/ProfilePage';
import FlashMessage from './components/FlashMessage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 F1 Lane, Racing City, 007',
    memberSince: 'July 2025',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateUserProfile = (updatedData) => {
    setUserProfile(updatedData);
    showFlashMessage('Profile updated successfully!', 'success');
  };

  const [flashMessage, setFlashMessage] = useState({ message: '', type: '', duration: 3000 });
  const flashMessageTimeoutRef = useRef(null);

  const showFlashMessage = (message, type = 'info', duration = 3000) => {
    if (flashMessageTimeoutRef.current) {
      clearTimeout(flashMessageTimeoutRef.current);
      flashMessageTimeoutRef.current = null;
    }
    setFlashMessage({ message, type, duration });
    flashMessageTimeoutRef.current = setTimeout(() => {
      setFlashMessage({ message: '', type: '', duration: 3000 });
      flashMessageTimeoutRef.current = null;
    }, duration);
  };

  const clearFlashMessage = () => {
    setFlashMessage({ message: '', type: '', duration: 3000 });
    if (flashMessageTimeoutRef.current) {
      clearTimeout(flashMessageTimeoutRef.current);
      flashMessageTimeoutRef.current = null;
    }
  };

  const handleAddToCart = (product, quantity) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id);
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        showFlashMessage(`${updatedItems[existingItemIndex].quantity} of ${product.name} in cart!`, 'success'); // Updated message
        return updatedItems;
      } else {
        showFlashMessage(`${quantity} of ${product.name} added to cart!`, 'success');
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const updateCartItemQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) => {
      const oldItem = prevItems.find(item => item.id === productId);
      if (!oldItem) {
        return prevItems; // Item not found, do nothing
      }

      if (newQuantity <= 0) {
        showFlashMessage(`${oldItem.name} removed from cart.`, 'info');
        return prevItems.filter((item) => item.id !== productId);
      }

      // If quantity actually changed
      if (oldItem.quantity !== newQuantity) {
        showFlashMessage(`${newQuantity} of ${oldItem.name} in cart!`, 'info'); // <--- MODIFIED LINE
      }
      
      return prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const handleAddToWishlist = (product) => {
    setWishlistItems((prevItems) => {
      if (!prevItems.some((item) => item.id === product.id)) {
        showFlashMessage(`${product.name} added to wishlist!`, 'success');
        return [...prevItems, product];
      } else {
        showFlashMessage(`${product.name} is already in your wishlist!`, 'info');
        return prevItems;
      }
    });
  };

  const handleRemoveFromWishlist = (productId) => {
    setWishlistItems((prevItems) => {
      const removedItem = prevItems.find(item => item.id === productId);
      if (removedItem) {
        showFlashMessage(`${removedItem.name} removed from wishlist.`, 'info');
      }
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  const handleForgotPasswordAttempt = (email) => {
    console.log(`Password reset requested for: ${email}`);
    showFlashMessage(`Password reset instructions sent to ${email} (simulated)!`, 'success');
  };

  const handleResetPassword = (otp, newPassword) => {
    console.log("Resetting password with OTP:", otp, "and new password:", newPassword);
    showFlashMessage("Your password has been reset successfully!", "success");
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="App flex flex-col min-h-screen bg-white text-gray-900">
        <Header
          cartItems={cartItems}
          wishlistItems={wishlistItems}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<HomePage showFlashMessage={showFlashMessage} onAddToWishlist={handleAddToWishlist} />} />
            <Route path="/products" element={<CategoryPage onAddToWishlist={handleAddToWishlist} showFlashMessage={showFlashMessage} />} />
            <Route path="/products/tees" element={<CategoryPage category="Tees" onAddToWishlist={handleAddToWishlist} showFlashMessage={showFlashMessage} />} />
            <Route path="/products/jackets" element={<CategoryPage category="Jackets" onAddToWishlist={handleAddToWishlist} showFlashMessage={showFlashMessage} />} />
            <Route path="/products/caps" element={<CategoryPage category="Caps" onAddToWishlist={handleAddToWishlist} showFlashMessage={showFlashMessage} />} />
            <Route path="/products/accessories" element={<CategoryPage category="Accessories" onAddToWishlist={handleAddToWishlist} showFlashMessage={showFlashMessage} />} />
            <Route path="/products/limited" element={<CategoryPage category="Limited" onAddToWishlist={handleAddToWishlist} showFlashMessage={showFlashMessage} />} />
            <Route path="/products/pants" element={<CategoryPage category="Pants" onAddToWishlist={handleAddToWishlist} showFlashMessage={showFlashMessage} />} />
            <Route
              path="/product/:productId"
              element={
                <ProductDetailPage
                  onAddToCart={handleAddToCart}
                  onAddToWishlist={handleAddToWishlist}
                  isLoggedIn={isLoggedIn}
                  showFlashMessage={showFlashMessage}
                />
              }
            />
            <Route
              path="/cart"
              element={<CartPage cartItems={cartItems} updateCartQuantity={updateCartItemQuantity} showFlashMessage={showFlashMessage} />}
            />
            <Route
              path="/login"
              element={<LoginPage setIsLoggedIn={setIsLoggedIn} showFlashMessage={showFlashMessage} />}
            />
            <Route
              path="/signup"
              element={<SignUpPage showFlashMessage={showFlashMessage} />}
            />
            <Route
              path="/forgot-password"
              element={
                <ForgotPasswordPage
                  onForgotPassword={handleForgotPasswordAttempt}
                  onResetPassword={handleResetPassword}
                  showFlashMessage={showFlashMessage}
                />
              }
            />
            <Route
              path="/my-favorites"
              element={<WishlistPage wishlistItems={wishlistItems} onRemoveFromWishlist={handleRemoveFromWishlist} onAddToCart={handleAddToCart} showFlashMessage={showFlashMessage} />}
            />
            <Route
              path="/profile"
              element={<ProfilePage userProfile={userProfile} updateUserProfile={updateUserProfile} showFlashMessage={showFlashMessage} />}
            />
            <Route path="*" element={<h2 className="text-center text-red-600 text-3xl mt-20">404 - Page Not Found</h2>} />
          </Routes>
        </main>
        <Footer />
        <FlashMessage
          message={flashMessage.message}
          type={flashMessage.type}
          duration={flashMessage.duration}
          onClose={clearFlashMessage}
        />
      </div>
    </Router>
  );
}

export default App;