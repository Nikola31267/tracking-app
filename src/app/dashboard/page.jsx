"use client";

import UserButton from "@/components/UserButton";
import { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }
  }, []);
  return (
    <>
      <div className="w-fit">
        <UserButton />
      </div>
      <h1>Dashboard</h1>
    </>
  );
};

export default Dashboard;
