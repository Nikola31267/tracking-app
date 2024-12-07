"use client";

import { useState, useRef, useEffect } from "react";
import { axiosInstance } from "@/lib/axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [signingIn, setSigningIn] = useState(false);
  const [showPasswordless, setShowPasswordless] = useState(false);
  const [passwordlessEmail, setPasswordlessEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [sendingMagicLink, setSendingMagicLink] = useState(false);
  const modalRef = useRef(null);
  const resetPasswordRef = useRef(null);

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

  const handlePasswordlessLogin = async (e) => {
    e.preventDefault();
    setSendingMagicLink(true);
    try {
      const response = await axiosInstance.post("/auth/magic-link", {
        email: passwordlessEmail,
      });

      const data = await response.data;

      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.response.data.message);
    } finally {
      setSendingMagicLink(false);
    }
  };

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

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowPasswordless(false);
    }
    if (
      resetPasswordRef.current &&
      !resetPasswordRef.current.contains(event.target)
    ) {
      setShowResetPassword(false);
    }
  };

  useEffect(() => {
    if (showPasswordless || showResetPassword) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPasswordless, showResetPassword]);

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
        <button
          className="text-purple-500 hover:text-purple-600 transition-colors duration-300 font-semibold"
          onClick={(e) => {
            e.preventDefault();
            setShowPasswordless(true);
          }}
        >
          Passwordless Sign In
        </button>
        <hr className="my-1" />
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
        <p className="text-sm text-gray-500">
          Forgot your password?{" "}
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowResetPassword(true);
            }}
            className="text-purple-500 hover:underline"
          >
            Reset Password
          </button>
        </p>
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
      {showPasswordless && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div
            ref={modalRef}
            className="bg-white p-8 rounded-lg shadow-lg z-10 w-[30rem] mx-auto relative"
          >
            <h2 className="text-2xl font-bold mb-4">Passwordless Sign In</h2>
            <p className="text-sm text-gray-500 mb-4">
              An email containing a verification token will be sent to you the
              token expires in 15 minutes.
            </p>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="passwordless-email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="passwordless-email"
                  placeholder="Enter your email"
                  value={passwordlessEmail}
                  onChange={(e) => setPasswordlessEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>
              {message && <p className="text-sm text-gray-500">{message}</p>}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md"
                  onClick={handlePasswordlessLogin}
                  disabled={sendingMagicLink}
                >
                  {sendingMagicLink ? (
                    <Loader2 className="animate-spin h-5 w-5 text-white mx-auto" />
                  ) : (
                    "Send Link"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showResetPassword && (
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
      )}
    </div>
  );
}
