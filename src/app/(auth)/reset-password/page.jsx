"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axios";
import Loader from "@/components/layout/Loader";
import Image from "next/image";

function ResetPasswordPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loadingToken, setLoadingToken] = useState(true);
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  useEffect(() => {
    if (!token) {
      router.back();
    } else {
      setLoadingToken(false);
    }
  }, [router, token]);

  const resetPassword = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

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
        router.push("/sign-in");
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

  if (loadingToken) {
    return <Loader />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <form
        className="flex flex-col gap-4 p-10 rounded-lg shadow-xl bg-gray-50"
        onSubmit={resetPassword}
      >
        <Image
          src="/logo-nobg.png"
          alt="Project Logo"
          className="mb-3 w-14"
          width={56}
          height={56}
        />
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">Reset Password</h2>
          <p className="text-sm text-gray-500">
            enter the email connected to your account below
          </p>
        </div>
        {message && <p className="text-center text-red-500">{message}</p>}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`p-2 rounded-md border w-96 focus:outline-none focus:border-purple-500`}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`p-2 rounded-md border w-96 focus:outline-none focus:border-purple-500`}
            required
          />
        </div>
        <button
          type="submit"
          className={`bg-purple-500 hover:bg-purple-600 transition-colors duration-300 text-white p-2 rounded-md`}
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ResetPasswordPage;
