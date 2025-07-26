import React from 'react';
import Button from './Button';

function CartItem({ item, updateQuantity }) {
  return (
    <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-md mb-4">
      <div className="flex items-center space-x-4 flex-grow">
        <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
        <div>
          <h3 className="text-lg font-semibold text-gray-100">{item.name}</h3>
          <p className="text-red-500 font-bold">${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <Button
          variant="secondary"
          className="px-3 py-1 text-base"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
        >
          -
        </Button>
        <span className="text-xl font-bold w-8 text-center">{item.quantity}</span>
        <Button
          variant="secondary"
          className="px-3 py-1 text-base"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          +
        </Button>
      </div>
    </div>
  );
}

export default CartItem;