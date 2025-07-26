import React from 'react';

function Button({ children, onClick, variant = 'primary', className = '' }) {
  const baseClasses = 'px-6 py-3 rounded-lg font-semibold transition-all duration-200';
  let variantClasses = '';

  switch (variant) {
    case 'primary':
      variantClasses = 'bg-red-600 hover:bg-red-700 text-white shadow-lg';
      break;
    case 'secondary':
      variantClasses = 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600';
      break;
    case 'outline':
      variantClasses = 'bg-transparent border border-red-600 text-red-600 hover:bg-red-600 hover:text-white';
      break;
    case 'text':
      variantClasses = 'bg-transparent text-red-500 hover:text-red-600 p-0 px-2 py-1';
      break;
    default:
      variantClasses = 'bg-red-600 hover:bg-red-700 text-white shadow-lg';
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className} focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50`}
    >
      {children}
    </button>
  );
}

export default Button;