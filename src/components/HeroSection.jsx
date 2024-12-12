import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

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
      <div className="flex flex-col gap-28 justify-center items-center mt-40 mb-20">
        <div className="flex flex-col gap-4 justify-center items-center">
          <h1 className="text-5xl font-bold tracking-tight text-center">
            Track Every Click, Unlock Every Insight
          </h1>

          <div className="mt-8">
            <h3 className="text-center text-xl font-semibold">
              Make decisions based on data that matters:
            </h3>
            <ul className="mt-4 list-none ">
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-purple-500" />
                Gain actionable insights into visitor behavior.
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-purple-500" />
                Optimize website performance with data-driven decisions.
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2" text-purple-500 />
                Secure and scalable analytics for businesses of all sizes.
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-2 mt-8">
            <Button
              className="w-full bg-purple-500 text-white hover:bg-purple-600 transition-colors duration-200"
              size="lg"
              asChild
            >
              <Link href="/dashboard">Start Tracking Now</Link>
            </Button>
            <Button
              className="w-full bg-purple-500 text-white hover:bg-purple-600 transition-colors duration-200"
              size="lg"
              asChild
            >
              <Link
                href="/#features"
                onClick={(e) => {
                  handleSmoothScroll(e, "#features");
                }}
              >
                View Features
              </Link>
            </Button>
          </div>
        </div>
        <div className="rounded-[1.3rem] border border-gray-200/5 bg-gray-200 p-1.5">
          <div className="mx-auto overflow-hidden rounded-[1.3rem] border border-gray-200/10">
            <Image
              alt="Hero"
              fetchPriority="high"
              width={800}
              height={600}
              decoding="async"
              data-nimg="1"
              draggable="false"
              className="w-full"
              style={{ color: "transparent" }}
              src="/hero.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
