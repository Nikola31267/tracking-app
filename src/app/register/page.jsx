"use client";

import { useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Image from "next/image";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/register", {
        username,
        email,
        fullName,
        password,
      });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (err) {
      console.log(err);
      setError("Registration failed");
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;

    try {
      const response = await axiosInstance.post("/auth/google-signin", {
        token,
      });
      localStorage.setItem("token", response.data.token);
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
    <>
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
              />
            </div>
          </GoogleOAuthProvider>
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
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Register
          </button>

          <hr className="my-4" />
          <p className="text-md text-gray-500 flex gap-1 justify-center">
            Already have an account?{" "}
            <button
              className="text-blue-500"
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              Sign In
            </button>
          </p>
          <hr className=" border-gray-100" />
          <p className="text-md text-gray-500 flex gap-1 justify-center">
            Made with <span className="font-bold ">TurboVerify</span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
