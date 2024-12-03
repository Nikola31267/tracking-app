"use client";

import { useEffect, useState, useRef } from "react";
import { Plus } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import UserButton from "@/components/UserButton";
import Loader from "@/components/layout/Loader";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [last24HoursVisits, setLast24HoursVisits] = useState("");
  const router = useRouter();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get("/auth/user", {
          headers: { "x-auth-token": localStorage.getItem("pixeltrack-auth") },
        });
        setUser(response.data);
      } catch (error) {
        setError("Error fetching user profile");
        console.error(error);
      } finally {
        setLoading(false);
        if (!localStorage.getItem("pixeltrack-auth")) {
          router.push("/");
        }
      }
    };

    fetchUserProfile();
    fetchProjects();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get("/dashboard/projects", {
        headers: { "x-auth-token": localStorage.getItem("pixeltrack-auth") },
      });
      setProjects(response.data.allProjects);
      setLast24HoursVisits(response.data.totalRecentVisits);
    } catch (error) {
      setError("Error fetching projects");
      console.error(error);
    }
  };
  if (loading) {
    return <Loader size="lg" color="blue" />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center border-b border-gray-200 mb-12">
        <div className="flex items-center">
          <Link href="/dashboard">
            <Image
              src="/logo-nobg.png"
              alt="Logo"
              className="h-12 w-12 mr-2"
              width={48}
              height={48}
            />
          </Link>
          <div className="relative" ref={dropdownRef}>
            <Breadcrumb className="px-2 py-1 ">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-lg cursor-default">
                    {user?.fullName
                      ? user.fullName
                      : user?.username || user?.email}
                  </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        <UserButton />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {last24HoursVisits && (
        <div className="flex items-center gap-1">
          <h2>Hello {user?.fullName}, you have </h2>
          <span className="text-lg font-semibold">{last24HoursVisits}</span>
          <h2>visits in the last 24 hours</h2>
        </div>
      )}

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        <li
          className="bg-white rounded-lg p-6 py-16 cursor-pointer  border-2 border-dotted border-gray-300 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300"
          onClick={() => router.push("/dashboard/new")}
        >
          <span className="text-lg font-medium text-gray-500 flex items-center gap-1">
            <Plus size={24} /> Create New Project
          </span>
        </li>
        {projects.map((project) => (
          <article
            key={project._id}
            className="group relative flex flex-col rounded-xl bg-white p-md cursor-pointer hover:shadow-md transition-shadow duration-300"
            onClick={() => router.push(`/dashboard/projects/${project._id}`)}
          >
            <div className="flex flex-1 flex-col justify-between rounded-lg border border-primary bg-surface-200 p-6 py-5">
              <div
                className={`absolute inset-x-16 top-0 h-1 rounded-b-full bg-${project.theme}-500`}
              ></div>

              <div className="flex items-center font-semibold gap-2 mb-8">
                <Image
                  src="/logo-nobg.png"
                  alt="Logo"
                  className="h-8 w-8"
                  width={32}
                  height={32}
                />
                <div className="truncate text-md text-secondary">
                  {project.projectName}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium">
                  <span className="line-clamp-3 outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:text-legacy-purple"></span>
                </h3>

                <div className="flex ml-4 gap-1 items-center">
                  <span className="font-semibold">{project.visit.length}</span>{" "}
                  visits
                </div>
              </div>
            </div>
          </article>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
