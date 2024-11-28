"use client";

import React, { useState } from "react";

import { axiosInstance } from "@/lib/axios";

const New = () => {
  const [projectName, setProjectName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        "/create",
        { projectName },
        { headers: { "x-auth-token": localStorage.getItem("token") } }
      );
      setMessage(`Project created: ${response.data.projectName}`);
    } catch (error) {
      setMessage(`Error: ${error.response.data.message}`);
    }
  };

  return (
    <div>
      <h1>Create New Project</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Project Name"
          required
        />
        <button type="submit">Create Project</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default New;
