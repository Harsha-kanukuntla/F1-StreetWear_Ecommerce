// src/pages/ProductDetailPage.js
import React, { useState, useEffect } from 'react'; // Removed useRef as it's no longer needed for this specific requirement
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import dummyProducts from '../data/products'; // Make sure this is imported
import ProductCard from '../components/ProductCard'; // Import ProductCard to display search results

function ProductDetailPage({ onAddToCart, onAddToWishlist, isLoggedIn, showFlashMessage }) {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    // State for search functionality within ProductDetailPage
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false); // To toggle between product detail and search results view

    // Effect to find and set the current product based on URL productId
    useEffect(() => {
        // Reset search when the product ID in the URL changes
        setSearchQuery('');
        setShowSearchResults(false);
        setQuantity(1); // Reset quantity when viewing a new product

        const foundProduct = dummyProducts.find(p => p.id === productId);
        setProduct(foundProduct);
    }, [productId]); // Re-run effect if productId changes

    // Effect to handle search logic
    useEffect(() => {
        if (searchQuery.trim() !== '') {
            const lowerCaseQuery = searchQuery.toLowerCase();
            const filtered = dummyProducts.filter(item =>
                item.name.toLowerCase().includes(lowerCaseQuery) ||
                item.description.toLowerCase().includes(lowerCaseQuery)
            );
            setSearchResults(filtered);
            setShowSearchResults(true); // Always show search results when there's a query
            
            // REMOVED: showFlashMessage(`No products found for "${searchQuery}".`, 'info', 3000);
            // The flash message for 'No products found' will no longer appear on this page.
        } else {
            setSearchResults([]);
            setShowSearchResults(false); // Hide search results when query is empty
        }
        // showFlashMessage is not in dependencies, because it's passed as a prop and stable.
        // We removed the condition that triggered the "No products found" flash message here.
    }, [searchQuery]); // Removed 'product' from dependencies as it's not directly needed for this part of search logic

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleAddToCartClick = () => {
        if (!isLoggedIn) {
            showFlashMessage('Please log in to add items to your cart.', 'error');
            navigate('/login');
            return;
        }
        if (product) {
            onAddToCart(product, quantity);
        }
    };

    const handleAddToWishlistClick = () => {
        if (!isLoggedIn) {
            showFlashMessage('Please log in to add items to your wishlist.', 'error');
            navigate('/login');
            return;
        }
        if (product) {
            onAddToWishlist(product);
        }
    };

    // Render logic based on whether search results should be shown or not
    if (showSearchResults) {
        return (
            <div className="container mx-auto p-8 bg-gray-900 text-gray-100 min-h-screen">
                <h2 className="text-4xl font-extrabold text-red-600 mb-8 text-center">
                    Search Results for "{searchQuery}"
                </h2>
                {/* Search Input for persistent search */}
                <div className="max-w-xl mx-auto mb-12">
                    <input
                        type="text"
                        placeholder="Search for products..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-red-500 text-lg shadow-md"
                    />
                </div>

                {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {searchResults.map((item) => ( // Use 'item' to avoid conflict with 'product' state
                            <ProductCard
                                key={item.id}
                                product={item}
                                onAddToWishlist={onAddToWishlist}
                                // ProductCard now handles its own navigation to detail page
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-xl text-gray-400">
                        No products match your search. Try a different term.
                    </p>
                )}
                <div className="mt-12 text-center">
                    <Button onClick={() => setSearchQuery('')} variant="secondary">
                        Clear Search
                    </Button>
                    <Button onClick={() => navigate('/products')} variant="secondary" className="ml-4">
                        Back to All Products
                    </Button>
                </div>
            </div>
        );
    }

    // --- Original Product Detail Page Rendering ---
    if (!product) {
        return (
            <div className="container mx-auto p-8 text-center text-gray-100 min-h-screen bg-gray-900">
                <h2 className="text-4xl font-extrabold text-red-600 mb-4">Product Details Not Found</h2>
                <p className="text-xl text-gray-300">The product you are looking for does not exist or has been removed.</p>
                <div className="mt-8">
                    <Button onClick={() => navigate('/')} variant="secondary" className="ml-4">
                        Back to Home
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-8 bg-gray-900 text-gray-100 min-h-screen">
            {/* Search Bar at the top of the detail view */}
            <div className="max-w-xl mx-auto mb-12">
                <input
                    type="text"
                    placeholder="Search for other products..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-red-500 text-lg shadow-md"
                />
            </div>

            {/* Product Detail Content */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-12">
                <div className="md:w-1/2 flex justify-center">
                    <img
                        src={product.imageUrl || 'https://i.etsystatic.com/38608671/r/il/0e2b36/5100447420/il_fullxfull.5100447420_dvph.jpg'}
                        alt={product.name}
                        className="w-full h-80 md:h-full object-cover rounded-lg shadow-lg"
                    />
                </div>

                <div className="md:w-1/2 bg-gray-800 p-8 rounded-lg shadow-xl space-y-6">
                    <h2 className="text-5xl font-extrabold text-red-600 mb-4">{product.name}</h2>
                    <p className="text-gray-300 text-lg leading-relaxed">{product.description}</p>
                    <div className="flex items-baseline space-x-4">
                        <p className="text-5xl font-bold text-red-500">${product.price.toFixed(2)}</p>
                        <p className="text-2xl text-gray-500 line-through">${(product.price * 1.2).toFixed(2)}</p>
                    </div>

                    <div className="flex items-center space-x-4 mt-6">
                        <label htmlFor="quantity" className="text-lg font-medium text-gray-300">Quantity:</label>
                        <input
                            type="number"
                            id="quantity"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-24 p-2 rounded-md bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:border-red-500"
                        />
                    </div>

                    <div className="flex space-x-4 mt-8">
                        <Button onClick={handleAddToCartClick} variant="primary">
                            Add to Cart
                        </Button>
                        <Button onClick={handleAddToWishlistClick} variant="secondary">
                            Add to Wishlist ❤️
                        </Button>
                    </div>
                </div>
            </div>

            <div className="mt-12 text-center">
                 {/* No button here now */}
            </div>
        </div>
    );
}

export default ProductDetailPage;