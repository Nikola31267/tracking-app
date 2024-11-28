"use client";

import React, { useState, useEffect, useRef } from "react";
import { axiosInstance } from "@/lib/axios";
import { X } from "lucide-react";
import Image from "next/image";

const Profile = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [editProfile, setEditProfile] = useState({
    username: "",
    email: "",
    fullName: "",
    profilePicture: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [accountTab, setAccountTab] = useState(true);
  const [securityEditing, setSecurityEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    fullName: "",
    profilePicture: null,
    socialConnected: [],
  });

  const modalRef = useRef(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await axiosInstance.get("/auth/user", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });

      setProfile(response.data);
      setEditProfile({
        username: response.data.username,
        email: response.data.email,
        fullName: response.data.fullName,
        profilePicture: response.data.profilePicture,
      });
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleProfileChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture") {
      const file = files[0];
      setEditProfile((prev) => ({ ...prev, profilePicture: file }));
      setProfilePicturePreview(URL.createObjectURL(file));
    } else {
      setEditProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const formData = new FormData();
      formData.append("username", editProfile.username);
      formData.append("email", editProfile.email);
      formData.append("fullName", editProfile.fullName);
      if (editProfile.profilePicture) {
        formData.append("profilePicture", editProfile.profilePicture);
      }

      const response = await axiosInstance.put(
        "/auth/updateProfile",
        formData,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProfile(response.data);
      setIsEditing(false);
    } catch (error) {
      setError(error.response?.data || error.message);
      console.error(
        "Failed to update profile:",
        error.response?.data || error.message
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleProfilePictureDelete = async () => {
    try {
      const response = await axiosInstance.put(
        "/auth/deleteProfilePicture",
        null,
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );

      if (response.status === 200) {
        setProfile((prev) => ({ ...prev, profilePicture: "" }));
      } else {
        console.error("Failed to delete profile picture", response.data);
      }
    } catch (error) {
      console.log(
        "Error deleting profile picture:",
        error.response?.data || error.message
      );
    }
  };

  const handleProfileDelete = async () => {
    console.log("Profile deleted");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-5xl h-auto overflow-hidden flex relative"
        style={{ width: "80%", height: "80%" }}
      >
        <div className="w-1/4 border-r border-gray-300 flex flex-col justify-between sticky top-0 no-scrollbar">
          <div>
            <button
              onClick={() => {
                setIsEditing(false);
                setSecurityEditing(false);
                setAccountTab(true);
              }}
              className={`block w-full text-left px-4 py-2 text-sm rounded-lg text-gray-700 transition-colors ${
                accountTab ? "bg-gray-200" : "hover:bg-gray-200"
              }`}
            >
              Account
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setSecurityEditing(true);
                setAccountTab(false);
              }}
              className={`block w-full text-left px-4 py-2 text-sm rounded-lg text-gray-700 transition-colors ${
                securityEditing ? "bg-gray-200" : "hover:bg-gray-200"
              }`}
            >
              Security
            </button>
          </div>
          <div className="px-4 py-2 text-sm text-gray-700">
            Created by <span className="font-bold">TurboVerify</span>
          </div>
        </div>
        <div className="w-3/4 p-6 overflow-y-auto no-scrollbar">
          {accountTab && (
            <>
              <div className="flex flex-col items-center mb-6">
                <div className="flex w-full items-center justify-between">
                  <div className="text-gray-700 text-lg font-semibold">
                    Profile
                  </div>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-gray-700 px-4 py-2 rounded-md bg-transparent border-none cursor-pointer transition-colors hover:bg-gray-100"
                    >
                      Edit profile
                    </button>
                  )}
                </div>
                <div className="relative mt-4">
                  {profile ? (
                    profilePicturePreview ? (
                      <Image
                        src={profilePicturePreview}
                        alt="Profile"
                        width={96}
                        height={96}
                        className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                      />
                    ) : profile?.profilePicture ? (
                      <Image
                        src={profile.profilePicture}
                        alt="Profile"
                        width={96}
                        height={96}
                        className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gray-300 text-white flex items-center justify-center rounded-full border-2 border-gray-300 text-4xl font-semibold cursor-default select-none">
                        {profile?.fullName
                          ? profile.fullName
                              .split(" ")
                              .map((name) => name[0])
                              .slice(0, 2)
                              .join("")
                          : ""}
                      </div>
                    )
                  ) : (
                    ""
                  )}
                  {isEditing && (
                    <input
                      type="file"
                      name="profilePicture"
                      onChange={handleProfileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  )}
                </div>
                {isEditing && (
                  <button
                    onClick={handleProfilePictureDelete}
                    className="text-red-500 font-semibold mt-6 rounded-md bg-transparent border-none cursor-pointer transition-colors hover:text-red-600"
                  >
                    Delete profile picture
                  </button>
                )}
              </div>
              <div className="mb-6">
                <div className="text-gray-700 text-lg mb-4 font-semibold">
                  User Information
                </div>
                {isEditing && error && (
                  <p className="text-red-500 mt-2 mb-2">
                    {typeof error === "object" ? error.message : error}
                  </p>
                )}
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={
                        isEditing ? editProfile.fullName : profile.fullName
                      }
                      onChange={handleProfileChange}
                      className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 ${
                        isEditing ? "bg-white" : "bg-transparent"
                      } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={
                        isEditing ? editProfile.username : profile.username
                      }
                      onChange={handleProfileChange}
                      className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 ${
                        isEditing ? "bg-white" : "bg-transparent"
                      } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={isEditing ? editProfile.email : profile.email}
                      onChange={handleProfileChange}
                      className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 ${
                        isEditing ? "bg-white" : "bg-transparent"
                      } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
              {!isEditing && (
                <div className="mb-6">
                  <div className="text-gray-700 text-lg mb-4 font-semibold">
                    Connected Accounts
                  </div>
                  <div className="flex flex-col">
                    {profile?.socialConnected?.length > 0 ? (
                      profile.socialConnected.map((account, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center gap-1"
                        >
                          <div className="flex items-center gap-2">
                            <Image
                              src={account.image}
                              alt={account.name}
                              width={32}
                              height={32}
                              className="w-8 h-8 rounded-full"
                            />
                            <span className="text-gray-700 capitalize flex items-center gap-2">
                              {account.name}
                            </span>
                          </div>
                          <button
                            onClick={() => handleRemoveAccount(account.name)}
                            className="text-red-500 font-medium px-4 py-2 rounded-md bg-transparent border-none cursor-pointer transition-colors hover:bg-red-100"
                          >
                            Remove
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-500 text-base">
                        No accounts connected
                      </div>
                    )}
                  </div>
                </div>
              )}
              {isEditing && (
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setError("");
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md border-none cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleProfileSave}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md border-none cursor-pointer flex items-center"
                    disabled={isSaving}
                  >
                    {isSaving && (
                      <svg
                        className="animate-spin h-5 w-5 mr-3 text-white"
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
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        ></path>
                      </svg>
                    )}
                    Save
                  </button>
                </div>
              )}
            </>
          )}
          {securityEditing && (
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-5">
                  <span className="text-gray-700 font-semibold">Password</span>
                  <span className="font-bold">••••••••</span>
                </div>
                <button
                  onClick={() => {
                    console.log("Reset password");
                  }}
                  disabled
                  className="text-blue-500 px-4 py-2 rounded-md bg-transparent border-none cursor-pointer transition-colors font-medium hover:bg-blue-100"
                >
                  Reset password
                </button>
              </div>
              <div className="flex justify-between items-center gap-4">
                <span className="text-gray-700 font-semibold">
                  Account Termination
                </span>
                <button
                  onClick={handleProfileDelete}
                  className="text-red-500 font-medium px-4 py-2 rounded-md bg-transparent border-none cursor-pointer transition-colors hover:bg-red-100"
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
