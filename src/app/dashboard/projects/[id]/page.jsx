"use client";

import React, { useEffect, useState, useRef } from "react";
import { axiosInstance } from "@/lib/axios";
import { useParams, useRouter } from "next/navigation";
import UserButton from "@/components/UserButton";
import Loader from "@/components/layout/Loader";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

import VisitTable from "./components/VisitTable";
import Settings from "./components/Settings";
import CountryChart from "./components/CountryChart";
import PagesChart from "./components/PagesChart";
import BrowserChart from "./components/BrowserChart";
import WeeklyVisitChart from "./components/WeeklyVisitChart";
import Navigation from "@/components/Navigation";
import TabNavigation from "./components/TabNavigation";
import { Button } from "@/components/ui/button";
import FindSnippet from "@/components/FindSnippet";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import ReferrerChart from "./components/ReferrerChart";
import OsChart from "./components/OsChart";
import NoAccessDashboard from "@/components/NoAccessDashboard";

const ITEMS_PER_PAGE = 10;

const ProjectPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [user, setUser] = useState(null);
  const [visits, setVisits] = useState([]);
  const [specificVisit, setSpecificVisit] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("app");
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRef = useRef(null);
  const tableDropdownRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [visitToDelete, setVisitToDelete] = useState(null);
  const [selectedChart, setSelectedChart] = useState("browser");
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    if (
      !localStorage.getItem("pixeltrack-auth") ||
      localStorage.getItem("pixeltrack-auth") === null ||
      localStorage.getItem("pixeltrack-auth") === ""
    ) {
      router.push("/sign-in");
    } else {
      setLoadingAuth(false);
    }
  }, [router]);

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

  useEffect(() => {
    setLoadingAuth(true);
    if (user?.hasAccess === false) {
      router.push("/dashboard/pricing");
    }
    setLoadingAuth(false);
  }, [router, user]);

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

  const confirmDeleteVisit = (visitId) => {
    setVisitToDelete(visitId);
    setIsDialogOpen(true);
  };

  const handleDeleteVisit = async () => {
    if (!visitToDelete) return;
    try {
      await axiosInstance.delete(
        `/dashboard/projects/${id}/visits/${visitToDelete}/delete`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("pixeltrack-auth"),
          },
        }
      );
      setVisits((prevVisits) =>
        prevVisits.filter((visit) => visit._id !== visitToDelete)
      );
      setVisitToDelete(null);
      setIsDialogOpen(false);
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

  const handleChartChange = (value) => {
    setSelectedChart(value);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (loadingAuth) {
    return <Loader />;
  }

  if (project?.addedSnippet === false) {
    return (
      <div className="flex flex-col justify-center items-center bg-white">
        <div className="p-6 mt-20 relative">
          <FindSnippet
            projectName={project.projectName}
            projectId={id}
            apiKey={project.key}
            projectPage={true}
          />
        </div>
      </div>
    );
  }

  if (!project || visits === null) {
    return <Loader />;
  }
  return (
    <div className="p-4">
      <nav className="flex flex-col sm:flex-row justify-between items-center p-4 text-white">
        <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto">
          <Navigation
            dashboardPage={false}
            projectPage={true}
            projects={projects}
            user={user}
            toggleDropdown={toggleDropdown}
            dropdownRef={dropdownRef}
            project={project}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            activeTab={activeTab}
          />
        </div>
        <div className="mt-4 sm:mt-0">
          <UserButton />
        </div>
      </nav>

      <TabNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        id={id}
      />

      {activeTab === "app" && (
        <>
          <WeeklyVisitChart visits={visits} visitsData={visits} />

          <div className="flex flex-col sm:flex-row gap-2 mt-6">
            <PagesChart visitsData={visits} />
            <ReferrerChart visitsData={visits} />
          </div>

          <div className="flex justify-end mb-4 mt-6 mr-4">
            <div className="w-64">
              <Select
                value={selectedChart}
                onValueChange={handleChartChange}
                className="w-full"
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="browser">Browser</SelectItem>
                  <SelectItem value="os">OS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <CountryChart visitsData={visits} />
            {selectedChart === "browser" && (
              <BrowserChart visitsData={visits} />
            )}
            {selectedChart === "os" && <OsChart visitsData={visits} />}
          </div>

          <VisitTable
            paginatedVisits={paginatedVisits}
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            isModalOpen={isModalOpen}
            specificVisit={specificVisit}
            closeModal={closeModal}
            fetchSpecificVisit={fetchSpecificVisit}
            deleteVisit={confirmDeleteVisit}
            toggleTableDropdown={toggleTableDropdown}
            openDropdownId={openDropdownId}
            tableDropdownRef={tableDropdownRef}
          />
        </>
      )}
      {activeTab === "settings" && (
        <Settings project={project} setProject={setProject} id={id} />
      )}

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this record?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              record and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <Button variant="destructive" onClick={handleDeleteVisit}>
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProjectPage;
