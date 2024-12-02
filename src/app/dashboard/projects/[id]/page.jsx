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
  LabelList,
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
import {
  ChevronsUpDown,
  Loader2,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react";

import Image from "next/image";
import Loader from "@/components/layout/Loader";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

const ITEMS_PER_PAGE = 10;

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
  const [pageViewsData, setPageViewsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("app");
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRef = useRef(null);
  const tableDropdownRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isUpdating, setIsUpdating] = useState(false);

  // App routes

  useEffect(() => {
    const fetchProjectAndVisits = async () => {
      try {
        const projectResponse = await axiosInstance.get(
          `/dashboard/projects/${id}`,
          {
            headers: {
              "x-auth-token": localStorage.getItem("pixeltrack-auth"),
            },
          }
        );
        setProject(projectResponse.data);

        const userResponse = await axiosInstance.get(`/auth/user`, {
          headers: {
            "x-auth-token": localStorage.getItem("pixeltrack-auth"),
          },
        });
        setUser(userResponse.data);

        const visitsResponse = await axiosInstance.get(
          `/dashboard/projects/${id}/visits`,
          {
            headers: {
              "x-auth-token": localStorage.getItem("pixeltrack-auth"),
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

        const pageViews = visitsData.reduce((acc, visit) => {
          acc[visit.page] = (acc[visit.page] || 0) + 1;
          return acc;
        }, {});
        setPageViewsData(
          Object.entries(pageViews).map(([page, views]) => ({ page, views }))
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
            "x-auth-token": localStorage.getItem("pixeltrack-auth"),
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
            "x-auth-token": localStorage.getItem("pixeltrack-auth"),
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

  const toggleTableDropdown = (visitId) => {
    setOpenDropdownId((prevId) => (prevId === visitId ? null : visitId));
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }

    if (
      tableDropdownRef.current &&
      !tableDropdownRef.current.contains(event.target)
    ) {
      setOpenDropdownId(null);
    }
  };

  useEffect(() => {
    if (isDropdownOpen || openDropdownId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, openDropdownId]);

  useEffect(() => {
    const currentTab = new URLSearchParams(window.location.search).get("tab");
    const pageFromUrl = new URLSearchParams(window.location.search).get("page");
    if (currentTab) {
      setActiveTab(currentTab);
    }
    if (pageFromUrl) {
      setCurrentPage(Number(pageFromUrl));
    }
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    router.push(`/dashboard/projects/${id}?tab=${tab}`);
  };

  const deleteVisit = async (visitId) => {
    try {
      await axiosInstance.delete(
        `/dashboard/projects/${id}/visits/${visitId}/delete`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("pixeltrack-auth"),
          },
        }
      );
      setVisits((prevVisits) =>
        prevVisits.filter((visit) => visit._id !== visitId)
      );

      const updatedVisits = visits.filter((visit) => visit._id !== visitId);
      const updatedVisitsByDay = updatedVisits.reduce((acc, visit) => {
        const date = new Date(visit.timestamp).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});
      setDailyVisits(updatedVisitsByDay);

      const updatedBrowserUsage = updatedVisits.reduce((acc, visit) => {
        acc[visit.browser] = (acc[visit.browser] || 0) + 1;
        return acc;
      }, {});
      setBrowserData(
        Object.entries(updatedBrowserUsage).map(([key, value]) => ({
          key,
          value,
        }))
      );

      const updatedPageViews = updatedVisits.reduce((acc, visit) => {
        acc[visit.page] = (acc[visit.page] || 0) + 1;
        return acc;
      }, {});
      setPageViewsData(
        Object.entries(updatedPageViews).map(([page, views]) => ({
          page,
          views,
        }))
      );
    } catch (error) {
      console.error("Error deleting visit:", error);
      setError("Server error");
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    router.replace(
      `/dashboard/projects/${id}?tab=${activeTab}&page=${newPage}`,
      undefined,
      { shallow: true }
    );
  };

  const paginatedVisits = visits.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(visits.length / ITEMS_PER_PAGE);

  if (error) {
    return <div>{error}</div>;
  }

  if (!project || visits === null) {
    return <Loader />;
  }

  // Settings routes

  const updateProjectSettings = async (updatedData) => {
    setIsUpdating(true);
    const formData = new FormData();
    formData.append("projectName", updatedData.projectName);
    formData.append("goal", updatedData.goal);
    if (updatedData.logo) {
      formData.append("logo", updatedData.logo);
    }

    try {
      const response = await axiosInstance.put(`/settings/${id}`, formData, {
        headers: {
          "x-auth-token": localStorage.getItem("pixeltrack-auth"),
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data.message);
      setProject((prevProject) => ({ ...prevProject, ...updatedData }));
    } catch (error) {
      console.error("Error updating project settings:", error);
      setError("Server error");
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteProject = async () => {
    setIsUpdating(true);
    try {
      await axiosInstance.delete(`/settings/${id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("pixeltrack-auth"),
        },
      });
      router.push("/dashboard");
    } catch (error) {
      console.error("Error deleting project:", error);
      setError("Server error");
    } finally {
      setIsUpdating(false);
    }
  };

  const removeLogo = async () => {
    setIsUpdating(true);
    try {
      await axiosInstance.put(`/settings/${id}/removeLogo`);
      setProject((prevProject) => ({ ...prevProject, logo: null }));
    } catch (error) {
      console.error("Error deleting project:", error);
      setError("Server error");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="p-4">
      <nav className="flex flex-col sm:flex-row justify-between items-center p-4 text-white">
        <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto">
          <Breadcrumb className="px-2 py-1 w-full sm:w-auto">
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
                    className="absolute bg-white shadow-md w-full sm:w-52 rounded-md z-10"
                    style={{ top: "100%", left: 0 }}
                  >
                    {projects.map((proj) => (
                      <div
                        key={proj._id}
                        className="px-4 py-2 hover:bg-gray-200 rounded-md cursor-pointer flex items-center gap-1"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          router.push(`/dashboard/projects/${proj._id}`);
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
                        router.push(`/dashboard/new`);
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" /> New Project
                    </div>
                  </div>
                )}
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-lg cursor-default">
                  {activeTab === "app" ? "" : "Settings"}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="mt-4 sm:mt-0">
          <UserButton />
        </div>
      </nav>
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
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
        <>
          <div className="flex flex-col sm:flex-row gap-2">
            <Card className="w-full">
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
                  <ResponsiveContainer width="100%" height={320}>
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

            <Card className="w-full">
              <CardHeader>
                <CardTitle>Browser Usage</CardTitle>
                <CardDescription>
                  Distribution of visits by browser
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ResponsiveContainer width="100%" height={400}>
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
                          style={{ width: "auto", height: "auto" }}
                        />
                        <span className="ml-2">{browser}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="w-full mt-6">
            <CardHeader>
              <CardTitle>Page Views</CardTitle>
              <CardDescription>Number of views per page</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={pageViewsData}
                  layout="vertical"
                  margin={{ top: 10, right: 50, left: 10, bottom: 10 }}
                >
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="page"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "hsl(var(--muted-foreground))",
                      fontSize: 14,
                    }}
                    width={100}
                  />
                  <Bar
                    dataKey="views"
                    fill="hsl(var(--primary))"
                    radius={[0, 4, 4, 0]}
                    barSize={20}
                  >
                    <LabelList
                      dataKey="views"
                      position="right"
                      fill="hsl(var(--muted-foreground))"
                      fontSize={14}
                      formatter={(value) => value.toLocaleString()}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      )}
      {activeTab === "settings" && (
        <div className="container mx-auto py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left column */}
            <div className="w-full md:w-1/3 space-y-6">
              <div className="space-y-4 flex flex-col justify-center items-center">
                <p className="text-sm text-gray-500">
                  Upload a new logo for your project
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setProject({ ...project, logo: e.target.files[0] })
                  }
                  className="hidden"
                  id="logoInput"
                />
                <label
                  htmlFor="logoInput"
                  className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer"
                >
                  <Image
                    src={
                      project.logo instanceof File
                        ? URL.createObjectURL(project.logo)
                        : project.logo || "/logo-nobg.png"
                    }
                    alt="Project Logo"
                    className="h-12 w-12"
                    width={48}
                    height={48}
                  />
                </label>
                <h1 className="text-xl font-bold text-gray-800">
                  {project.projectName}
                </h1>
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={deleteProject}
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Delete Project"
                  )}
                </Button>
                <Button
                  variant="destructiveOutline"
                  className="w-full text-red-500 transition-colors duration-300"
                  onClick={removeLogo}
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Remove Logo"
                  )}
                </Button>
              </div>
            </div>

            {/* Right column */}
            <div className="w-full md:w-2/3 space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">General Settings</h3>
                <hr />
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const updatedData = {
                      projectName: e.target.projectName.value,
                      goal: e.target.goal.value,
                      logo: project.logo,
                    };
                    updateProjectSettings(updatedData);
                  }}
                >
                  <div className="space-y-1 mb-4">
                    <Label htmlFor="projectName" className="text-md">
                      Project Name
                    </Label>
                    <Input
                      id="projectName"
                      placeholder="Enter new project name"
                      defaultValue={project.projectName}
                      className="w-full p-2 border rounded-lg focus-visible:ring-purple-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="goal" className="text-md">
                      Goal
                    </Label>
                    <Input
                      id="goal"
                      placeholder="Enter project goal"
                      defaultValue={project.goal}
                      className="w-full p-2 border rounded-lg focus-visible:ring-purple-500"
                    />
                  </div>
                  <Button
                    variant="purpleOutline"
                    className="w-full transition duration-300 mt-4 hover:bg-purple-500 hover:text-neutral-50"
                    type="submit"
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Update"
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
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
                    Page
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedVisits.map((visit, index) => (
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
                      {visit?.ip}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {visit?.device}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {visit?.browser}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {visit?.platform}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {visit?.referrer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {visit?.page || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(visit?.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <MoreHorizontal
                        className="h-5 w-5 text-gray-500 hover:text-gray-900 cursor-pointer transition-colors duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTableDropdown(visit._id);
                        }}
                      />
                      {openDropdownId === visit._id && (
                        <div
                          className="absolute bg-white shadow-md rounded-md -ml-2 z-10"
                          ref={tableDropdownRef}
                        >
                          <div
                            className="flex items-center gap-1 px-4 py-2 text-sm text-red-500 hover:bg-red-100 hover:text-red-600 rounded-md cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteVisit(visit._id);
                            }}
                          >
                            <Trash className="h-4 w-4" />
                            Delete Record
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center items-center mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className={`cursor-pointer ${
                      currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() =>
                      currentPage > 1 && handlePageChange(currentPage - 1)
                    }
                    disabled={currentPage === 1}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      className={`cursor-pointer ${
                        currentPage === index + 1 ? "" : ""
                      }`}
                      isActive={currentPage === index + 1}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    className={`cursor-pointer ${
                      currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() =>
                      currentPage < totalPages &&
                      handlePageChange(currentPage + 1)
                    }
                    disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
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
              <strong>Page:</strong> {specificVisit.page || "N/A"}
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
