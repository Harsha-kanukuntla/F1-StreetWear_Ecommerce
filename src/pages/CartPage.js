import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import CartItem from '../components/CartItem';
import Button from '../components/Button';

function CartPage({ cartItems, updateCartQuantity }) {
  const navigate = useNavigate(); 
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-page bg-gray-900 min-h-[calc(100vh-160px)] flex flex-col items-center py-8">
      <h2 className="text-4xl font-extrabold text-red-600 mb-8 tracking-wide">Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-400 text-xl">
          <p>Your cart is empty. Time to hit the track (and shop)!</p>
          <Button onClick={() => navigate('/products/tees')} variant="primary" className="mt-6"> 
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="w-full max-w-2xl">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} updateQuantity={updateCartQuantity} />
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-gray-700 flex justify-between items-center text-2xl font-bold">
            <span className="text-gray-300">Subtotal:</span>
            <span className="text-red-500">${subtotal.toFixed(2)}</span>
          </div>

          <div className="mt-8 text-center">
            <Button variant="primary" className="w-full md:w-auto px-10 py-4 text-xl">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;