import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom'; 
import dummyProducts from '../data/products'; 

function CategoryPage({ onAddToWishlist, category }) {
  const navigate = useNavigate();
///////////////////////////////////////
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allCategoryProducts, setAllCategoryProducts] = useState([]); /////////====for purpas
  useEffect(() => {
    let productsForCurrentCategory = dummyProducts;
    if (category) {
      productsForCurrentCategory = dummyProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    setAllCategoryProducts(productsForCurrentCategory); // Save the full list for the current category
    // Reset filtered products and search query when category changes
    setFilteredProducts(productsForCurrentCategory);
    setSearchQuery('');
  }, [category]);

  useEffect(() => {
    // Filter products based on search query whenever searchQuery or allCategoryProducts changes
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const results = allCategoryProducts.filter(product =>
        product.name.toLowerCase().includes(lowerCaseQuery) ||
        product.description.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts(allCategoryProducts); // If search query is empty, show all products for the current category
    }
  }, [searchQuery, allCategoryProducts]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container mx-auto p-8 bg-white text-gray-900 min-h-screen">
      <h2 className="text-4xl font-extrabold text-red-600 mb-8 text-center">
        {category ? `${category} Collection` : 'All Products'}
      </h2>

      {/* Search Input */}
      <div className="mb-8 max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search products by name or description..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:border-red-500 text-gray-900 bg-white shadow-sm"
        />
      </div>

      {/* Conditional Messages based on search results */}
      {searchQuery && filteredProducts.length === 0 ? (
        <p className="text-center text-2xl text-red-600 font-semibold my-12">
          No products found matching "{searchQuery}". Please try a different search term.
        </p>
      ) : filteredProducts.length > 0 ? (
        // Case 2: Products found (either all or filtered by search)
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-gray-100 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <img
                // *** THE ONLY CHANGE IS HERE ***
                src={product.imageUrl || 'https://via.placeholder.com/400x400?text=No+Image'} // Use product.imageUrl, with a fallback
                // ******************************
                alt={product.name}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => {
                  // Navigate to product detail page using its ID
                  navigate(`/product/${product.id}`);
                }}
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-3">{product.description.substring(0, 100)}...</p> {/* Truncate description for card */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-red-600">${product.price.toFixed(2)}</span>
                  <span className="text-lg text-gray-500 line-through">${(product.price * 1.2).toFixed(2)}</span> {/* Example discounted price */}
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => {
                      // Navigate to product detail page using its ID
                      navigate(`/product/${product.id}`);
                    }}
                    variant="dark"
                    className="flex-1"
                  >
                    View Details
                  </Button>
                  <button
                    onClick={() => onAddToWishlist(product)}
                    className="p-2 bg-gray-300 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition duration-300"
                    title="Add to Wishlist"
                  >
                    ❤️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Case 3: No products in the category initially (and no active search results to show)
        <p className="text-center text-xl text-gray-600 my-12">
          There are currently no products available in this category.
        </p>
      )}

      <div className="mt-12 text-center">
        <Button onClick={() => navigate('/')} variant="secondary">
          Back to Home
        </Button>
      </div>
    </div>
  );
}

export default CategoryPage;