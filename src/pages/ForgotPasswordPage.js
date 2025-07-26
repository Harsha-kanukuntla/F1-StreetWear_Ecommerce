import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import InputField from '../components/InputField';
import Button from '../components/Button';

function ForgotPasswordPage({ onForgotPassword, onResetPassword }) { // Removed setCurrentPage
  const navigate = useNavigate(); // Get the navigate function

  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (email) {
      onForgotPassword(email);
      setOtpSent(true);
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    // Simulate OTP verification
    if (otp === '123456') { // Mock OTP
      alert('OTP Verified! You can now reset your password.');
      setOtpVerified(true);
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      onResetPassword(otp, newPassword);
      setEmail('');
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');
      setOtpSent(false);
      setOtpVerified(false);
      navigate('/login'); // Navigate to login page after successful reset
    } else {
      alert('Passwords do not match.');
    }
  };

  return (
    <div className="flex justify-center items-center py-8 min-h-[calc(100vh-160px)]">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Forgot Password</h2>

        {!otpSent ? (
          <form onSubmit={handleSendOtp}>
            <InputField
              id="email"
              type="email"
              label="Enter your email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" variant="primary" className="w-full mt-4">
              Send OTP via Email
            </Button>
          </form>
        ) : !otpVerified ? (
          <form onSubmit={handleVerifyOtp}>
            <p className="text-gray-300 text-center mb-4">An OTP has been sent to {email}.</p>
            <InputField
              id="otp"
              type="text"
              label="Enter OTP"
              placeholder="e.g., 123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button type="submit" variant="primary" className="w-full mt-4">
              Verify OTP
            </Button>
          </form>
        ) : (
          <form onSubmit={handleReset}>
            <p className="text-gray-300 text-center mb-4">OTP verified. Set your new password.</p>
            <InputField
              id="newPassword"
              type="password"
              label="New Password"
              placeholder="********"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <InputField
              id="confirmPassword"
              type="password"
              label="Confirm New Password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button type="submit" variant="primary" className="w-full mt-4">
              Reset Password
            </Button>
          </form>
        )}

        <p className="text-center text-gray-400 mt-6 text-sm">
          Remembered your password?{' '}
          <span
            className="text-red-500 hover:underline cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;