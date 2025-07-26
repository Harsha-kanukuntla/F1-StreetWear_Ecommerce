import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-6 text-center mt-auto">
      <div className="container mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} F1 StreetWear. All rights reserved.</p>
        <p className="text-sm mt-2">Inspired by the speed and style of Formula 1.</p>
      </div>
    </footer>
  );
}

export default Footer;