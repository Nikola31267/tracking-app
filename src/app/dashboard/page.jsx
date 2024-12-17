"use client";

import { useEffect, useState, useRef } from "react";
import { BarChart, Plus, Sparkles, XIcon, Zap } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import UserButton from "@/components/UserButton";
import Loader from "@/components/layout/Loader";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [error, setError] = useState("");
  const [last24HoursVisits, setLast24HoursVisits] = useState("");
  const [freeTrialStartedModal, setFreeTrialStartedModal] = useState(false);
  const router = useRouter();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const checkAuthAndAccess = async () => {
      if (!localStorage.getItem("pixeltrack-auth")) {
        router.push("/sign-in");
        return;
      }

      try {
        const response = await axiosInstance.get("/auth/user", {
          headers: { "x-auth-token": localStorage.getItem("pixeltrack-auth") },
        });
        setUser(response.data);

        if (!response.data.hasAccess) {
          router.push("/dashboard/pricing");
        } else {
          setLoadingAuth(false);
        }
      } catch (error) {
        setError("Failed to fetch user data");
        router.push("/sign-in");
      }
    };

    checkAuthAndAccess();
  }, [router]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get("/dashboard/projects", {
          headers: { "x-auth-token": localStorage.getItem("pixeltrack-auth") },
        });
        const fetchedProjects = response.data.allProjects;
        setProjects(fetchedProjects);
        setLast24HoursVisits(response.data.totalRecentVisits);
        if (fetchedProjects.length === 0) {
          router.push("/dashboard/new");
        }
      } catch (error) {
        setError("Error fetching projects");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (!loadingAuth) {
      fetchProjects();
    }
  }, [router, loadingAuth]);

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

  if (loadingAuth) {
    return <Loader />;
  }

  if (loading) {
    return <Loader />;
  }

  const handleFreeTrialStartedModalClick = async () => {
    setFreeTrialStartedModal(false);
    await axiosInstance.put("/auth/removeNewUser", { userId: user._id });
  };

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
            <Navigation dashboardPage={true} user={user} />
          </div>
        </div>
        <UserButton />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {last24HoursVisits !== 0 && (
        <div className="flex items-center gap-1">
          <h2>Hello {user?.fullName}, you have </h2>
          <span className="text-lg font-semibold">{last24HoursVisits}</span>
          <h2>visits in the last 24 hours</h2>
        </div>
      )}

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        <li
          className="bg-white rounded-2xl p-6 py-16 cursor-pointer border-2 border-dotted border-gray-300 hover:border-gray-500 flex justify-center items-center shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => router.push("/dashboard/new")}
        >
          <span className="text-lg font-medium text-gray-500 flex items-center gap-1">
            <Plus size={24} /> Create New Project
          </span>
        </li>
        {projects.map((project) => (
          <article
            key={project._id}
            className="group relative flex flex-col rounded-2xl bg-white p-md cursor-pointer hover:shadow-md transition-shadow duration-300"
            onClick={() => router.push(`/dashboard/projects/${project._id}`)}
          >
            <div className="flex flex-1 flex-col justify-between rounded-lg border border-primary bg-surface-200 p-6 py-5">
              <div
                className={`absolute inset-x-16 top-0 h-1 rounded-b-full bg-purple-500`}
              ></div>

              <div className="flex items-center font-semibold gap-2 mb-8">
                <Image
                  src={project?.logo || "/logo-nobg.png"}
                  alt="Logo"
                  className="h-8 w-8"
                  width={32}
                  height={32}
                />
                <div className="truncate text-md text-secondary">
                  {project?.projectName}
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
        {freeTrialStartedModal && (
          <Dialog
            open={freeTrialStartedModal}
            onOpenChange={setFreeTrialStartedModal}
          >
            <DialogContent className="sm:max-w-[425px] bg-white p-0 overflow-hidden">
              <div className="absolute top-2 right-2">
                <Button
                  variant="ghost"
                  className="hover:bg-purple-400 group"
                  size="icon"
                  onClick={() => setFreeTrialStartedModal(false)}
                >
                  <XIcon className="h-4 w-4 text-white group-hover:text-purple-100" />
                </Button>
              </div>
              <div className="bg-purple-500 p-6 flex items-center justify-center">
                <Sparkles className="w-16 h-16 text-white" />
              </div>
              <div className="p-6">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-center text-gray-900">
                    Your 7-Day Free Trial of Pixel Track Has Begun!
                  </DialogTitle>
                  <DialogDescription className="text-center text-gray-600 mt-2">
                    Welcome to Pixel Track! For the next 7 days, you&apos;ll
                    have full access to all features designed to supercharge
                    your website tracking and optimize user engagement. No
                    credit card required — just insights, performance, and
                    growth.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex items-center gap-4 bg-purple-50 p-3 rounded-lg">
                    <BarChart className="w-6 h-6 text-purple-500 flex-shrink-0" />
                    <p className="text-sm font-medium text-gray-700">
                      Powerful Insights Dashboard
                    </p>
                  </div>
                  <div className="flex items-center gap-4 bg-purple-50 p-3 rounded-lg">
                    <Zap className="w-6 h-6 text-purple-500 flex-shrink-0" />
                    <p className="text-sm font-medium text-gray-700">
                      Effortless Integration
                    </p>
                  </div>
                </div>
                <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between mt-6">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-purple-500 text-purple-500 hover:bg-purple-50"
                    onClick={handleFreeTrialStartedModalClick}
                  >
                    Maybe Later
                  </Button>
                  <Button
                    className="w-full sm:w-auto bg-purple-500 text-white hover:bg-purple-600"
                    onClick={handleFreeTrialStartedModalClick}
                  >
                    Start My Trial
                  </Button>
                </DialogFooter>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
