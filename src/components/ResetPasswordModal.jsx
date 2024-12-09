"use client";

import React, { useRef, useState, useEffect } from "react";
import { axiosInstance } from "@/lib/axios";

const ResetPasswordModal = ({ isOpen, onClose }) => {
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [message, setMessage] = useState("");

  const resetPasswordRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        resetPasswordRef.current &&
        !resetPasswordRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/reset-password", {
        email: resetPasswordEmail,
      });

      if (response.status === 200) {
        setMessage("A reset password link has been sent to your email.");
      } else {
        setMessage(response.data.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage(error.response.data.message);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div
        ref={resetPasswordRef}
        className="bg-white p-8 rounded-lg shadow-lg z-10 w-[30rem] mx-auto relative"
      >
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="reset-password-email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="reset-password-email"
              placeholder="Enter your email"
              value={resetPasswordEmail}
              onChange={(e) => setResetPasswordEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            />
          </div>
          {message && <p className="text-sm text-gray-500">{message}</p>}
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md"
              onClick={handleResetPassword}
            >
              Send email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
