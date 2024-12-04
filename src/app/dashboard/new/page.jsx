"use client";

import React, { useState } from "react";

import { axiosInstance } from "@/lib/axios";
import { ArrowLeft, ArrowRight, Files } from "lucide-react";
import Link from "next/link";

const New = () => {
  const [projectName, setProjectName] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [step, setStep] = useState(1);
  const [projectId, setProjectId] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        "/create",
        { projectName },
        { headers: { "x-auth-token": localStorage.getItem("pixeltrack-auth") } }
      );
      setProjectId(response.data._id);
      setCodeSnippet(
        `<script src="http://localhost:3000/js/tracker.js" \n` +
          `        data-api-key="${response.data.apiKey}" async></script>`
      );
      setStep(2);
    } catch (error) {
      console.error(error);
    }
  };

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
                  <button
                    type="submit"
                    className="bg-purple-500 hover:bg-purple-600 text-white p-2 mt-8 rounded-lg font-semibold transition-colors duration-300"
                  >
                    Add website
                  </button>
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
            <div className="bg-gray-100 p-4 rounded-lg">
              <h1 className="text-lg font-bold text-gray-700">
                Installation Script
              </h1>
              <p className="text-gray-700">
                Paste the following code into the <code>&lt;head&gt;</code> tag.
              </p>
              <hr className="border-gray-300 my-4" />
              <div className="flex justify-between items-center space-x-4">
                <Link href={`/dashboard/projects/${projectId}`}>
                  <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 w-fit text-gray-700 p-2 rounded-lg font-semibold transition-colors duration-300">
                    Go to project <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <button
                  onClick={() => navigator.clipboard.writeText(codeSnippet)}
                  className="text-gray-700 hover:text-gray-900 bg-gray-200 hover:bg-gray-300 p-2 rounded-lg font-semibold transition-colors duration-300 mt-3"
                >
                  <Files className="w-5 h-5" />
                </button>
              </div>
              {codeSnippet && (
                <>
                  <div className="mt-4 p-4 bg-gray-900 rounded-lg relative">
                    <pre className="bg-gray-800 text-gray-300 p-4 rounded overflow-x-auto">
                      <code>{codeSnippet}</code>
                    </pre>
                  </div>
                </>
              )}

              <div className="flex justify-center items-center space-x-4 mt-4">
                <button className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-lg font-semibold transition-colors duration-300 w-full">
                  Verify Installation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default New;
