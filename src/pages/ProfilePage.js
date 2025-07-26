// src/pages/ProfilePage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Button from '../components/Button'; // Assuming you have a Button component

function ProfilePage({ userProfile, updateUserProfile }) { // Removed setCurrentPage prop
  const navigate = useNavigate(); // Get the navigate function

  // State to manage whether the profile is in editing mode
  const [isEditing, setIsEditing] = useState(false);
  // State to hold temporary form data during editing
  const [formData, setFormData] = useState(userProfile);

  // Handle input changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle saving changes
  const handleSave = () => {
    updateUserProfile(formData); // Call the function from App.js to update the main state
    setIsEditing(false); // Exit editing mode
  };

  // Handle canceling changes
  const handleCancel = () => {
    setFormData(userProfile); // Revert form data to the original userProfile
    setIsEditing(false); // Exit editing mode
  };

  return (
    <div className="container mx-auto p-8 bg-gray-900 text-gray-100 min-h-screen">
      <h2 className="text-4xl font-extrabold text-red-600 mb-8 text-center">Your Profile</h2>

      <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-lg mx-auto">
        {isEditing ? (
          // Editing Form View
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-300 mb-1">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-300 mb-1">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-lg font-medium text-gray-300 mb-1">
                Address:
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:border-red-500"
              ></textarea>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <Button onClick={handleSave} variant="primary" type="button">
                Save Changes
              </Button>
              <Button onClick={handleCancel} variant="secondary" type="button">
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          // Display View
          <div className="space-y-4">
            <p className="text-lg">
              <span className="font-semibold text-gray-300">Name:</span> {userProfile.name}
            </p>
            <p className="text-lg">
              <span className="font-semibold text-gray-300">Email:</span> {userProfile.email}
            </p>
            <p className="text-lg">
              <span className="font-semibold text-gray-300">Address:</span> {userProfile.address}
            </p>
            <p className="text-lg">
              <span className="font-semibold text-gray-300">Member Since:</span> {userProfile.memberSince}
            </p>
            <div className="mt-6 text-center">
              <Button onClick={() => setIsEditing(true)} variant="primary">
                Edit Profile
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <Button onClick={() => navigate('/')} variant="secondary"> {/* Use navigate to go to home */}
          Back to Home
        </Button>
      </div>
    </div>
  );
}

export default ProfilePage;