import React from 'react';
import Button from './Button';

function ProductCard({ product, setCurrentPage, setSelectedProduct }) {
  const handleClick = () => {
    setSelectedProduct(product);
    setCurrentPage('product_detail');
  };

  return (
    <div
      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-100 mb-2 truncate">
          {product.name}
        </h3>
        <p className="text-red-500 font-bold text-lg mb-3">${product.price.toFixed(2)}</p>
        <Button onClick={handleClick} className="w-full" variant="secondary">
          View Details
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;