"use client";

import React, { useState, useEffect } from "react";

import { axiosInstance } from "@/lib/axios";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import FindSnippet from "@/components/FindSnippet";
import { useRouter } from "next/navigation";
import Loader from "@/components/layout/Loader";
import { Button } from "@/components/ui/button";

const New = () => {
  const [projectName, setProjectName] = useState("");
  const [step, setStep] = useState(1);
  const [projectId, setProjectId] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post(
        "/create",
        { projectName },
        { headers: { "x-auth-token": localStorage.getItem("pixeltrack-auth") } }
      );
      setProjectId(response.data._id);
      setApiKey(response.data.key);
      setStep(2);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.error || "An unknown error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingAuth) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-white">
        {step === 1 && (
          <Link href="/dashboard" className="flex justify-self-start">
            <button className="bg-gray-100 hover:bg-gray-200 w-fit text-gray-700 p-2 mt-36 -ml-[9rem] sm:-ml-[22rem]  mb-8 rounded-lg font-semibold transition-colors duration-300 flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </button>
          </Link>
        )}
        {step === 1 && (
          <>
            <div className="flex flex-col items-center">
              <div className="flex space-x-2 mb-4 justify-center">
                <div
                  className={`w-3 h-3 rounded-full ${
                    step === 1 ? "bg-purple-500 animate-pulse" : "bg-gray-300"
                  }`}
                ></div>
                <div
                  className={`w-3 h-3 rounded-full ${
                    step === 2 ? "bg-purple-500 animate-pulse" : "bg-gray-300"
                  }`}
                ></div>
              </div>
            </div>
            <div className="bg-gray-200 w-full md:w-1/2 h-1/2 rounded-3xl mt-4">
              <h1 className="text-lg p-6 font-bold text-gray-700">
                Add new website
              </h1>
              <hr className="border-gray-300" />
              <form onSubmit={handleSubmit} className="p-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="projectName" className="text-gray-700">
                    Project Name
                  </label>
                  <div className="flex items-center">
                    <span className="p-[0.570rem] bg-gray-300 rounded-l-lg flex items-center">
                      https://
                    </span>
                    <input
                      type="text"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      placeholder="website.com"
                      className="p-2 rounded-r-lg border border-gray-300 flex-1 focus:outline-none"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-purple-500 hover:bg-purple-600 text-white p-2 mt-8 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Add website"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </>
        )}
        {step === 2 && (
          <div className="p-6 mt-20 relative">
            <div className="flex space-x-2 mb-4 justify-center">
              <div
                className={`w-3 h-3 rounded-full ${
                  step === 1 ? "bg-purple-500 animate-pulse" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`w-3 h-3 rounded-full ${
                  step === 2 ? "bg-purple-500 animate-pulse" : "bg-gray-300"
                }`}
              ></div>
            </div>

            <FindSnippet
              projectName={projectName}
              projectId={projectId}
              apiKey={apiKey}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default New;
