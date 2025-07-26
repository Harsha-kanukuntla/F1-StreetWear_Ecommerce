#  - F1 Streetwear E-commerce

## Project Overview

F1 Streetwear E-commerce is a modern, responsive single-page application (SPA) built with React.js, designed as an e-commerce platform for F1-inspired streetwear. This application allows users to browse products by category, search for specific items, view product details, manage a shopping cart, maintain a wishlist, and handle user authentication (login/signup) and profile management.

The application focuses on a sleek user experience with dynamic content loading, client-side routing, and interactive UI elements.

## Features

* *Homepage:*
    * Dynamic hero section with a captivating background image and call-to-action (see image_6e0c79.png).
    * "Shop by Category" section with visually appealing category buttons (see image_9610a2.jpg).
    * Integrated global search bar for finding products across the entire catalog (see image_6e2af9.png).
    * Conditional rendering of search results or main homepage content based on search query.
* *Product Listing (Category Pages):*
    * View products filtered by specific categories (e.g., Tees, Jackets, Caps).
    * "Shop All Products" page displaying the entire product catalog.
    * Category-specific search bar to filter products within the current category.
    * Displays individual product cards with images, names, descriptions, and prices (see image_9610a2.jpg).
    * Uses unique image URLs for each product from dummyProducts.js.
* *Product Detail Page:*
    * Detailed view for individual products, showing full description, price, and quantity selector (see image_6da35f.png).
    * Option to add products to the cart with a specified quantity (see image_6da35f.png).
    * Ability to add products to a wishlist (see image_6da35f.png).
    * Navigation back to the product listing or home page.
* *Shopping Cart:*
    * Add items to cart from product detail or listing pages.
    * View all items in the cart with their respective quantities and total price.
    * Adjust product quantities directly in the cart.
    * Remove items from the cart.
    * Flash messages for successful additions, quantity updates, and removals (e.g., "10 of Racing Tee - Redline in cart!").
* *Wishlist (My Favorites):*
    * Add products to a personal wishlist.
    * View all favorited products.
    * Remove items from the wishlist.
    * Option to move items from wishlist to cart.
* *User Authentication:*
    * *Login Page:* User login functionality (simulated).
    * *Sign Up Page:* New user registration (simulated).
    * *Forgot Password Page:* Simulated password reset flow with OTP and new password entry.
* *User Profile:*
    * View and update user personal information (name, email, address).
* *Global Flash Messages:*
    * Provides non-intrusive notifications for user actions (e.g., "Product added to cart!", "Profile updated!") (see image_6e2af9.png).
* *Responsive Design:*
    * Tailwind CSS for a mobile-first, responsive layout.
* *Client-Side Routing:*
    * Uses react-router-dom for seamless navigation between pages without full page reloads.
    * Includes ScrollToTop component to ensure new pages always load at the top, improving user experience.

## Technologies Used

* *React.js:* Frontend JavaScript library for building user interfaces.
* *React Router DOM:* For client-side routing and navigation.
* *Tailwind CSS:* A utility-first CSS framework for rapid UI development.
* *JavaScript (ES6+):* Core language for application logic.

## Setup and Installation

To get the project up and running on your local machine, follow these steps:

1.  *Clone the repository:*
    bash
    git clone <repository-url>
    cd apex-threads
    

2.  *Install dependencies:*
    This project requires the following key packages: react, react-dom, react-router-dom, and tailwindcss.
    You can install all necessary dependencies listed in package.json using:
    bash
    npm install
    # or
    yarn install
    

3.  *Run the development server:*
    bash
    npm start
    # or
    yarn start
    
