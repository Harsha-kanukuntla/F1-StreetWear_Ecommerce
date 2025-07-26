import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Button from '../components/Button';

function WishlistPage({ wishlistItems, onRemoveFromWishlist, onAddToCart }) { // Removed setCurrentPage prop
  const navigate = useNavigate(); // Get the navigate function

  return (
    <div className="container mx-auto p-8 bg-gray-900 min-h-screen text-gray-100"> {/* Added bg and text for dark theme */}
      <h2 className="text-4xl font-extrabold text-red-600 mb-8 text-center">Your Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <div className="text-center text-gray-400 text-xl py-10">
          Your wishlist is empty. Start adding some favorite items!
          <div className="mt-6">
            <Button onClick={() => navigate('/products')} variant="primary"> {/* Use navigate to go to products page */}
              Browse Products
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
              <img src={item.imageUrl} alt={item.name} className="w-48 h-48 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-bold text-gray-100 mb-2">{item.name}</h3>
              <p className="text-red-500 text-lg font-semibold mb-4">${item.price.toFixed(2)}</p>
              <div className="flex space-x-4">
                <Button onClick={() => onAddToCart(item, 1)} variant="primary">
                  Add to Cart
                </Button>
                <Button onClick={() => onRemoveFromWishlist(item.id)} variant="secondary">
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WishlistPage;