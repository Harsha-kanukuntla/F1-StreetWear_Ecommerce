// src/pages/HomePage.js
import React from 'react';
import Button from '../components/Button'; // Assuming you have a Button component
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Define the URL directly for the background image
const heroImageUrl = 'https://as2.ftcdn.net/v2/jpg/05/71/37/65/1000_F_571376505_rDJr9ib4H77d26YGZCpbGgBEeB34MDiX.jpg';

function HomePage() { // Removed setCurrentPage prop
  const navigate = useNavigate(); // Get the navigate function

  // Define the inline style for the hero section background
  const heroStyle = {
    backgroundImage: `url('${heroImageUrl}')`, // Use the URL directly here
    backgroundSize: 'cover',   // Covers the entire area of the element
    backgroundPosition: 'center', // Centers the image
    backgroundRepeat: 'no-repeat', // Prevents image repetition
    minHeight: '490px', // Added a minimum height to ensure the image is visible
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white', // Ensure text is visible over the background
    textShadow: '2px 2px 4px rgba(0,0,0,0.7)' // Add a subtle shadow for text readability
  };

  // Function for disabled categories (as per Header.js logic)
  const handleDisabledCategoryClick = (e, categoryName) => {
    e.preventDefault();
    console.log(`Category "${categoryName}" is not functional yet.`);
    // Optionally, you can show a flash message here
    // showFlashMessage(`Category "${categoryName}" is coming soon!`, 'info');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <section
        className="py-20 px-8 text-center"
        style={heroStyle} // APPLY THE STYLE HERE
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate-fadeInDown">
          Ignite Your Style.
        </h1>
        <p className="text-xl md:text-2xl mb-8 animate-fadeInUp">
          F1-Inspired Streetwear.
        </p>
        <Button onClick={() => navigate('/products')} variant="dark" className="animate-zoomIn">
          View All Products
        </Button>
      </section>

      {/* Shop by Category Section */}
      <section className="py-16 px-8 bg-gray-950 text-center">
        <h2 className="text-4xl font-extrabold text-red-600 mb-12 animate-fadeInLeft">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Tees Category Button */}
          <div
            className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:bg-red-700 group"
            onClick={() => navigate('/products/tees')} // Navigate to /products/tees
          >
            <span className="text-6xl mb-3 group-hover:animate-bounce">👕</span>
            <span className="text-xl font-semibold text-gray-100">Tees</span>
          </div>

          {/* Jackets Category Button */}
          <div
            className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:bg-red-700 group"
            onClick={(e) => handleDisabledCategoryClick(e, 'Jackets')} // Use the disabled handler
          >
            <span className="text-6xl mb-3 group-hover:animate-bounce">🧥</span>
            <span className="text-xl font-semibold text-gray-100">Jackets</span>
          </div>

          {/* Caps Category Button */}
          <div
            className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:bg-red-700 group"
            onClick={(e) => handleDisabledCategoryClick(e, 'Caps')} // Use the disabled handler
          >
            <span className="text-6xl mb-3 group-hover:animate-bounce">🧢</span>
            <span className="text-xl font-semibold text-gray-100">Caps</span>
          </div>

          {/* Accessories Category Button */}
          <div
            className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:bg-red-700 group"
            onClick={(e) => handleDisabledCategoryClick(e, 'Accessories')} // Use the disabled handler
          >
            <span className="text-6xl mb-3 group-hover:animate-bounce">⌚</span>
            <span className="text-xl font-semibold text-gray-100">Accessories</span>
          </div>

          {/* Limited Category Button */}
          <div
            className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:bg-red-700 group"
            onClick={(e) => handleDisabledCategoryClick(e, 'Limited')} // Use the disabled handler
          >
            <span className="text-6xl mb-3 group-hover:animate-bounce">⭐</span>
            <span className="text-xl font-semibold text-gray-100">Limited</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;