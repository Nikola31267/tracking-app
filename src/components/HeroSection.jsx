import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { ShinyButton } from "./ui/shiny-button";

const HeroSection = () => {
  const router = useRouter();

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/${targetId}`);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-28 justify-center items-center px-4 py-20 sm:px-6 sm:py-32 md:px-8 md:py-40 lg:px-12 lg:py-32">
        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="flex items-center justify-center">
            <h1 className="text-5xl font-bold tracking-tight text-center sm:text-5xl md:text-4xl lg:text-5xl">
              Track Every Click, Unlock Every Insight
            </h1>
          </div>

          <div className="mt-12">
            <h3 className="text-center text-sm font-semibold sm:text-lg md:text-lg lg:text-2xl">
              Make decisions based on data that matters:
            </h3>
            <ul className="mt-8 list-none flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-4 text-xs sm:text-sm md:text-base lg:text-lg md:flex-row md:flex-wrap md:justify-center md:gap-x-8 lg:flex-col lg:gap-x-0">
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-purple-500" />
                Gain actionable insights into visitor behavior.
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-purple-500" />
                Optimize website performance with data-driven decisions.
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-purple-500" />
                Secure and scalable analytics for businesses of all sizes.
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-purple-500" />
                Choose the product to prioritize.
              </li>
            </ul>
          </div>
          <div>
            <div className="flex flex-col gap-2 mt-4 sm:flex-col md:flex-col lg:flex-row">
              <ShinyButton
                href="/dashboard"
                className="btn h-9 sm:h-9 md:h-10 lg:h-12 hover:bg-purple-500"
              >
                Start Tracking Now
              </ShinyButton>
              <ShinyButton
                className="btn h-9 sm:h-9 md:h-10 lg:h-12 hover:bg-purple-500"
                href="/#features"
                onClick={(e) => {
                  handleSmoothScroll(e, "#features");
                }}
              >
                View Features
              </ShinyButton>
            </div>
            <p className="text-sm mt-4 text-center text-gray-500 mb-8">
              7 days free trial. No credit card required.
            </p>
          </div>
        </div>
        <div className="hidden sm:block rounded-[1.4rem] border border-gray-200/5 bg-gray-200 p-1.5">
          <div className="mx-auto overflow-hidden rounded-[1.4rem] border border-gray-200/10">
            <Image
              alt="Hero Section Image"
              fetchPriority="high"
              width={1000}
              height={600}
              draggable="false"
              className="w-full"
              src="/hero.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
