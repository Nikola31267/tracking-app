"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import SignedIn from "../auth/SignedIn";
import SignedOut from "../auth/SignedOut";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ShinyButton } from "../ui/shiny-button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const signOut = () => {
    console.log("Signing out");
    localStorage.removeItem("pixeltrack-auth");
    window.location.href = "/sign-in";
  };

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
    <div className="flex justify-between items-center">
      <motion.header
        className="py-4 px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-between items-center w-full"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold hidden md:block">
            Tracking App
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <SignedIn>
            <div className="flex items-center">
              <Button
                variant="ghost"
                className="text-purple-500 hover:bg-purple-50 hover:text-purple-700 mr-2"
                onClick={() => signOut()}
              >
                Sign out
              </Button>
              <ShinyButton className="h-10 w-28" href="/dashboard">
                Dashboard
              </ShinyButton>
            </div>
          </SignedIn>
          <SignedOut>
            <ShinyButton className="h-10 w-28" href="/sign-in">
              Sign in
            </ShinyButton>
          </SignedOut>
        </div>
      </motion.header>
    </div>
  );
}
