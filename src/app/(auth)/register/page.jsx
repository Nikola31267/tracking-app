"use client";

import { useState, useEffect, useRef } from "react";
import { axiosInstance } from "@/lib/axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import Link from "next/link";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [registering, setRegistering] = useState(false);
  const [showPasswordless, setShowPasswordless] = useState(false);
  const [passwordlessEmail, setPasswordlessEmail] = useState("");
  const [message, setMessage] = useState("");
  const modalRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegistering(true);
    try {
      const res = await axiosInstance.post("/auth/register", {
        username,
        email,
        fullName,
        password,
      });
      localStorage.setItem("pixeltrack-auth", res.data.token);
      window.location.href = "/";
    } catch (err) {
      console.log(err);
      setError("Registration failed");
    } finally {
      setRegistering(false);
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

  const handlePasswordlessRegister = async (e) => {
    e.preventDefault();
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
    }
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowPasswordless(false);
    }
  };

  useEffect(() => {
    if (showPasswordless) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPasswordless]);

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <form
        className="flex flex-col gap-4 p-10 rounded-lg shadow-xl bg-gray-50"
        onSubmit={handleSubmit}
      >
        <Image
          src="/logo-nobg.png"
          alt="Project Logo"
          className="w-14"
          width={56}
          height={56}
        />

        <div className="flex flex-col gap-1 mb-4">
          <h2 className="text-xl font-semibold">Sign Up</h2>
          <p className="text-sm text-gray-500">to continue to PixelTrack</p>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <GoogleOAuthProvider clientId="130701496125-gqtj78hm9ub2s5jkmki0ur6mtnah06ma.apps.googleusercontent.com">
          <div>
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFailure}
              className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm rounded-lg text-gray-700 transition-colors hover:bg-gray-100"
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
          Passwordless Sign Up
        </button>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 rounded-md border w-96 border-gray-300"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded-md border w-96 border-gray-300"
          required
        />
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
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
          disabled={registering}
        >
          {registering ? (
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
          Already have an account?{" "}
          <Link href="/login" className="text-purple-500 hover:underline">
            Sign In
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
            <h2 className="text-2xl font-bold mb-4">Passwordless Sign Up</h2>
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
                  onClick={handlePasswordlessRegister}
                >
                  Send Magic Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
