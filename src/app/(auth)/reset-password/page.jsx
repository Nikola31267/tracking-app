"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axios";
import Loader from "@/components/layout/Loader";

function ResetPasswordPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPassword = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token) {
      setMessage("Invalid or missing token.");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post("/auth/verify-reset-password", {
        token,
        password,
      });

      const data = response.data;

      if (response.status === 200) {
        setMessage(data.message);
        router.push("/login");
      } else {
        setMessage(data.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error verifying reset password:", error);
      setMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-5">
      <h1 className="text-xl font-bold mb-4">Reset Password</h1>
      <input
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
      />
      <input
        type="password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
      />
      <button
        onClick={resetPassword}
        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md"
      >
        Reset Password
      </button>
      {loading ? (
        <div className="text-gray-600">
          <Loader />
        </div>
      ) : (
        <p className="text-gray-800">{message}</p>
      )}
    </div>
  );
}

export default ResetPasswordPage;
