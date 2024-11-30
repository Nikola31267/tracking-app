"use client";

import { useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [signingIn, setSigningIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setSigningIn(true);
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("pixeltrack-auth", token);
      window.location.href = "/";
    } catch (error) {
      setError("Invalid credentials");
      console.error("Error logging in:", error);
    } finally {
      setSigningIn(false);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;

    try {
      const response = await axiosInstance.post("/auth/google-signin", {
        token,
      });
      localStorage.setItem("pixeltrack-auth", response.data.token);
      window.location.href = "/";
    } catch (error) {
      console.error(
        "Google login failed:",
        error.response ? error.response.data : error.message
      );
    }
  };
  const handleGoogleLoginFailure = () => {
    setError("Google login failed");
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <form
        className="flex flex-col gap-4 p-10 rounded-lg shadow-xl bg-gray-50"
        onSubmit={handleLogin}
      >
        <Image
          src="/logo-nobg.png"
          alt="Project Logo"
          className=" w-14"
          width={56}
          height={56}
        />

        <div className="flex flex-col gap-1 mb-4">
          <h2 className="text-xl font-semibold">Sign In</h2>
          <p className="text-sm text-gray-500">to continue to PixelTrack</p>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        <GoogleOAuthProvider clientId="130701496125-gqtj78hm9ub2s5jkmki0ur6mtnah06ma.apps.googleusercontent.com">
          <div>
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFailure}
            />
          </div>
        </GoogleOAuthProvider>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded-md border w-96 border-gray-300"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded-md border w-96 border-gray-300"
          required
        />
        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-md"
          disabled={signingIn}
        >
          {signingIn ? (
            <svg
              className="animate-spin h-5 w-5 text-white mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            "Continue"
          )}
        </button>

        <hr className="my-4" />
        <p className="text-md text-gray-500 flex gap-1 justify-center">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-purple-500 hover:underline">
            Sign Up
          </Link>
        </p>
        <hr className=" border-gray-100" />
        <p className="text-md text-gray-500 flex gap-1 justify-center">
          Made with <span className="font-bold ">TurboVerify</span>
        </p>
      </form>
    </div>
  );
}
