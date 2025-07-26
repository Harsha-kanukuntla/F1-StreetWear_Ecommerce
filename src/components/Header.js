// src/components/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Accept isLoggedIn and setIsLoggedIn as props (currentPage and setCurrentPage are removed)
function Header({ cartItems, wishlistItems, isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate(); // Get the navigate function

  const handleLogout = () => {
    setIsLoggedIn(false); // Set login status to false
    navigate('/'); // Redirect to home page after logout using navigate
    // In a real app, you'd also clear tokens/session from localStorage/cookies here
  };

  // A function to handle clicks on disabled navigation links
  const handleDisabledClick = (e, categoryName) => {
    e.preventDefault(); // Prevent the default link behavior (e.g., changing URL hash)
    console.log(`Category "${categoryName}" is not functional yet.`);
    // Optionally, you could add a flash message here if showFlashMessage was passed as a prop
    // showFlashMessage(`Category "${categoryName}" is coming soon!`, "info");
  };

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md fixed w-full top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
       
        <div className="text-2xl font-bold text-red-600 cursor-pointer" onClick={() => navigate('/')}>
          F1 STREETWEAR 
        </div>

        

        
        <div className="flex items-center space-x-6 text-lg">
          
          {isLoggedIn ? (
            <a
              href="#"
              onClick={handleLogout}
              className="hover:text-red-500 transition duration-300"
            >
              Logout
            </a>
          ) : (
            <a
              href="#"
              onClick={() => navigate('/login')} 
              className="hover:text-red-500 transition duration-300"
            >
              Login
            </a>
          )}

          <a
            href="#"
            onClick={() => navigate('/cart')} 
            className="flex items-center hover:text-red-500 transition duration-300"
          >
            Cart (<span className="text-red-500 font-bold ml-1">{cartItems.length}</span>)
          </a>
          <a
            href="#"
            onClick={() => navigate('/my-favorites')} 
            className="flex items-center hover:text-red-500 transition duration-300"
            title="Wishlist"
          >
            ❤️ (<span className="text-red-500 font-bold ml-1">{wishlistItems.length}</span>)
          </a>
          {isLoggedIn && ( 
            <a
              href="#"
              onClick={() => navigate('/profile')} 
              className="flex items-center hover:text-red-500 transition duration-300"
              title="Profile"
            >
              👤
            </a>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;