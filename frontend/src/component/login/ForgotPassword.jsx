import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Step 1: Send email for OTP
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const response = await axios.put(
        "http://localhost:8000/api/user/forgot-password",
        { email }
      );
      setMessage(response.data.message || "Check your email for OTP.");
      setStep("otp");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP. Try again.");
    }
  };

  // Step 2: Verify OTP
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/verify-otp",
        { email, otp }
      );
      setMessage(
        response.data.message || "OTP verified. You can reset your password."
      );
      setStep("reset");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Try again.");
    }
  };

  // Step 3: Reset Password
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const response = await axios.put(
        "http://localhost:8000/api/user/reset-password",
        { email, newPassword, confirmPassword }
      );
      setMessage(response.data.message || "Password reset successful!");
      setStep("done");
      setTimeout(() => navigate("/Login"), 2000); // Redirect after 2 seconds
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to reset password. Try again."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        {message && <div className="text-green-600 mb-4">{message}</div>}
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {step === "email" && (
          <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border rounded px-4 py-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded py-2 hover:bg-blue-600"
            >
              Send OTP
            </button>
          </form>
        )}
        {step === "otp" && (
          <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="border rounded px-4 py-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded py-2 hover:bg-blue-600"
            >
              Verify OTP
            </button>
          </form>
        )}
        {step === "reset" && (
          <form onSubmit={handleResetSubmit} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="border rounded px-4 py-2"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="border rounded px-4 py-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded py-2 hover:bg-blue-600"
            >
              Reset Password
            </button>
          </form>
        )}
        {step === "done" && (
          <div className="text-green-600 text-center">
            Password reset successful! You can now log in.
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
