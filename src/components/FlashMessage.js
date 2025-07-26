// src/components/FlashMessage.js
import React, { useEffect, useState } from 'react';

function FlashMessage({ message, type, duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    ///////////// Only show if there's a message
    if (message) {
      setIsVisible(true);
      // Set a timer to hide the message automatically
      const timer = setTimeout(() => {
        setIsVisible(false);
        //---- Call the parent's onClose function to clear the message from App.js state--------
        if (onClose) {
          onClose();
        }
      }, duration);

      //====== Cleanup function: Clear the timer if the component unmounts
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [message, duration, onClose]); 

  const handleCloseClick = () => {
    setIsVisible(false); 
    if (onClose) {
      onClose();
    }
  };

  if (!isVisible || !message) {
    return null;
  }

  let bgColor = 'bg-blue-500'; 
  let textColor = 'text-white';
  switch (type) {
    case 'success':
      bgColor = 'bg-green-500';
      break;
    case 'error':
      bgColor = 'bg-red-500';
      break;
    case 'warning':
      bgColor = 'bg-yellow-500';
      textColor = 'text-gray-900'; 
      break;
    case 'info':
    default:
      bgColor = 'bg-blue-500';
      break;
  }

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-xl z-[1000] flex items-center justify-between space-x-4
      ${bgColor} ${textColor} transform transition-transform duration-300 ease-out ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
      role="alert"
    >
      <p className="font-medium">{message}</p>
      <button
        onClick={handleCloseClick}
        className={`ml-4 text-xl font-bold leading-none ${textColor === 'text-white' ? 'hover:text-gray-200' : 'hover:text-gray-700'}`}
        aria-label="Close"
      >
        &times; {/* HTML entity for a multiplication sign (X) */}
      </button>
    </div>
  );
}

export default FlashMessage;