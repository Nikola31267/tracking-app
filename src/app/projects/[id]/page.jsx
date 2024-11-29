"use client";

import React, { useEffect, useState, useRef } from "react";
import { axiosInstance } from "@/lib/axios";
import { useParams, useRouter } from "next/navigation";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import UserButton from "@/components/UserButton";
import { ChevronsUpDown, Plus } from "lucide-react";

import Image from "next/image";
import Loader from "@/components/layout/Loader";
const COLORS = {
  Chrome: "#4285F4",
  Firefox: "#FF7139",
  Safari: "#87CEEB",
  Edge: "#32a852",
};

const BROWSER_LOGOS = {
  Chrome:
    "https://upload.wikimedia.org/wikipedia/commons/8/87/Google_Chrome_icon_%282011%29.png",
  Firefox:
    "https://upload.wikimedia.org/wikipedia/commons/e/e7/Firefox_logo%2C_2019.png",
  Safari: "https://pngimg.com/d/safari_PNG6.png",
  Edge: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Microsoft_Edge_logo_%282019%29.png",
};

const PLATFORM_LOGOS = {
  Windows:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Windows_logo_-_2012.svg/1200px-Windows_logo_-_2012.svg.png",
  "Mac OS X":
    "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  Linux: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png",
  Android:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Android_logo_2019.svg/1200px-Android_logo_2019.svg.png",
  iOS: "https://upload.wikimedia.org/wikipedia/commons/c/ca/IOS_logo.svg",
  ChromeOS:
    "https://upload.wikimedia.org/wikipedia/commons/5/5c/Chrome_OS_logo.png",
  WindowsPhone:
    "https://upload.wikimedia.org/wikipedia/commons/e/ec/Windows_Phone_logo.png",
};

const ProjectPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [user, setUser] = useState(null);
  const [visits, setVisits] = useState([]);
  const [specificVisit, setSpecificVisit] = useState(null);
  const [error, setError] = useState(null);
  const [dailyVisits, setDailyVisits] = useState({});
  const [browserData, setBrowserData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("app");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchProjectAndVisits = async () => {
      try {
        const projectResponse = await axiosInstance.get(
          `/dashboard/projects/${id}`,
          {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );
        setProject(projectResponse.data);

        const userResponse = await axiosInstance.get(`/auth/user`, {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        setUser(userResponse.data);

        const visitsResponse = await axiosInstance.get(
          `/dashboard/projects/${id}/visits`,
          {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );
        const visitsData = visitsResponse.data;
        setVisits(visitsData);

        const visitsByDay = visitsData.reduce((acc, visit) => {
          const date = new Date(visit.timestamp).toLocaleDateString();
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});
        setDailyVisits(visitsByDay);

        const browserUsage = visitsData.reduce((acc, visit) => {
          acc[visit.browser] = (acc[visit.browser] || 0) + 1;
          return acc;
        }, {});
        setBrowserData(
          Object.entries(browserUsage).map(([key, value]) => ({ key, value }))
        );
      } catch (error) {
        console.error("Error fetching project or visits:", error);
        setError("Server error");
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get("/dashboard/projectsByUsers", {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Server error");
      }
    };

    fetchProjectAndVisits();
    fetchProjects();
  }, [id]);

  const fetchSpecificVisit = async (visitId) => {
    try {
      const response = await axiosInstance.get(
        `/dashboard/projects/${id}/visits/${visitId}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      setSpecificVisit(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching specific visit:", error);
      setError("Server error");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSpecificVisit(null);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    const currentTab = new URLSearchParams(window.location.search).get("tab");
    if (currentTab) {
      setActiveTab(currentTab);
    }
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    router.push(`/projects/${id}?tab=${tab}`);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!project || visits === null) {
    return <Loader />;
  }

  return (
    <div>
      <nav className="flex justify-between items-center p-4 text-white">
        <div className="flex items-center">
          <Breadcrumb className="px-2 py-1">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink className="text-lg" href="/dashboard">
                  {user?.fullName}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem ref={dropdownRef} className="relative">
                <BreadcrumbLink className="text-lg" asChild>
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center"
                  >
                    {project.projectName}
                    <ChevronsUpDown className="ml-2 h-4 w-4" />
                  </button>
                </BreadcrumbLink>
                {isDropdownOpen && (
                  <div
                    className="absolute bg-white shadow-md w-52 rounded-md z-10"
                    style={{ top: "100%", left: 0 }}
                  >
                    {projects.map((proj) => (
                      <div
                        key={proj._id}
                        className="px-4 py-2 hover:bg-gray-200 rounded-md cursor-pointer flex items-center gap-1"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          window.location.href = `/projects/${proj._id}`;
                        }}
                      >
                        <Image
                          src={proj.logo || "/logo-nobg.png"}
                          alt={proj.projectName}
                          width={25}
                          height={25}
                        />
                        {proj.projectName}
                      </div>
                    ))}
                    <hr className="border-t border-gray-200 my-2" />
                    <div
                      className="px-4 py-2 hover:bg-gray-200 rounded-md cursor-pointer flex items-center"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        window.location.href = `/new`;
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" /> New Project
                    </div>
                  </div>
                )}
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-lg cursor-default"></BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div>
          <UserButton />
        </div>
      </nav>
      <div className="flex gap-2 mb-4">
        <button
          className={`px-4 py-2 border-b-2 ${
            activeTab === "app"
              ? "border-purple-500 text-purple-500"
              : "border-transparent"
          }`}
          onClick={() => handleTabChange("app")}
        >
          App
        </button>
        <button
          className={`px-4 py-2 border-b-2 ${
            activeTab === "settings"
              ? "border-purple-500 text-purple-500"
              : "border-transparent"
          }`}
          onClick={() => handleTabChange("settings")}
        >
          Settings
        </button>
      </div>
      {activeTab === "app" && (
        <div className="flex gap-2">
          <Card className="w-1/2">
            <CardHeader>
              <CardTitle>All Visits: {visits.length}</CardTitle>
              <CardDescription>
                Number of visits per day for the last week
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ChartContainer
                config={{
                  visits: {
                    label: "Visits",
                    color: "#6b21a8",
                  },
                }}
                className="h-80"
              >
                <ResponsiveContainer width="95%" height="100%">
                  <BarChart
                    data={Object.entries(dailyVisits || {}).map(
                      ([date, count]) => ({
                        date,
                        count,
                      })
                    )}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis
                      dataKey="date"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="count"
                      fill="var(--color-visits)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="w-1/2">
            <CardHeader>
              <CardTitle>Browser Usage</CardTitle>
              <CardDescription>
                Distribution of visits by browser
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="95%" height={300}>
                <PieChart>
                  <Pie
                    data={browserData}
                    dataKey="value"
                    nameKey="key"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                  >
                    {browserData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[entry.key] || "#8884d8"}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-6 mt-4">
                {Object.entries(COLORS).map(([browser, color]) => (
                  <div key={browser} className="flex items-center mb-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: color }}
                    ></div>
                    <div className="flex items-center ml-2">
                      <Image
                        src={BROWSER_LOGOS[browser]}
                        alt={browser}
                        width={20}
                        height={20}
                      />
                      <span className="ml-2">{browser}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      {activeTab === "settings" && (
        <div>
          <h1>Settings</h1>
        </div>
      )}

      {activeTab === "app" && (
        <div className="container mx-auto py-10">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="min-w-full bg-white divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Device
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Browser
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Platform
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Referrer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {visits.map((visit, index) => (
                  <tr
                    key={visit._id || index}
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => fetchSpecificVisit(visit._id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {PLATFORM_LOGOS[visit.platform] && (
                        <Image
                          src={PLATFORM_LOGOS[visit.platform]}
                          alt={visit.platform}
                          width={20}
                          height={20}
                        />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {visit.ip}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {visit.device}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {visit.browser}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {visit.platform}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {visit.referrer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(visit.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isModalOpen && specificVisit && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeModal}
          ></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-10">
            <h2 className="text-xl font-bold mb-4">Specific Visit Details</h2>
            <p>
              <strong>IP Address:</strong> {specificVisit.ip}
            </p>
            <p>
              <strong>Device:</strong> {specificVisit.device}
            </p>
            <p>
              <strong>Browser:</strong> {specificVisit.browser}
            </p>
            <p>
              <strong>Platform:</strong> {specificVisit.platform}
            </p>
            <p>
              <strong>Referrer:</strong> {specificVisit.referrer}
            </p>
            <p>
              <strong>Timestamp:</strong>{" "}
              {new Date(specificVisit.timestamp).toLocaleString()}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
