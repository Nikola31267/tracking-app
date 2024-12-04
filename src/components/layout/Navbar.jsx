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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const signOut = () => {
    console.log("Signing out");
    localStorage.removeItem("pixeltrack-auth");
    window.location.href = "/login";
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
        <Link
          href="/"
          className="text-2xl font-bold text-primary flex items-center"
        >
          <Image
            src="/logo-nobg.png"
            alt="TurboVerify"
            width={60}
            height={60}
          />
          PixelTrack
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link
            href="/#pricing"
            onClick={(e) => handleSmoothScroll(e, "#pricing")}
            className="text-muted-foreground hover:text-purple-500 transition-colors duration-300"
          >
            Pricing
          </Link>
          <Link
            href="/#faq"
            onClick={(e) => handleSmoothScroll(e, "#faq")}
            className="text-muted-foreground hover:text-purple-500 transition-colors duration-300"
          >
            FAQs
          </Link>
          <Link
            href="/contact"
            className="text-muted-foreground hover:text-purple-500 transition-colors duration-300"
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <SignedIn>
            <Button
              variant="ghost"
              className="text-purple-500 hover:bg-purple-50 hover:text-purple-700 mr-2"
              onClick={() => signOut()}
            >
              Sign out
            </Button>
            <Button
              className="bg-purple-500 hover:bg-purple-600 text-white"
              asChild
            >
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <Button
              variant="ghost"
              className="text-purple-500 hover:bg-purple-50"
              asChild
            >
              <Link href="/login">Log in</Link>
            </Button>
            <Button
              className="bg-purple-500 hover:bg-purple-600 text-white"
              asChild
            >
              <Link href="/register">Sign up</Link>
            </Button>
          </SignedOut>
        </div>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </motion.header>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="fixed inset-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-primary"
              >
                <X />
              </button>
            </div>
            <div className="flex flex-col space-y-4">
              <Link
                href="/#pricing"
                onClick={(e) => {
                  handleSmoothScroll(e, "#pricing");
                  setIsOpen(false);
                }}
                className="block py-2 w-fit text-muted-foreground hover:text-primary"
              >
                Pricing
              </Link>
              <Link
                href="/#faq"
                onClick={(e) => {
                  handleSmoothScroll(e, "#faq");
                  setIsOpen(false);
                }}
                className="block py-2 w-fit text-muted-foreground hover:text-primary"
              >
                FAQs
              </Link>
              <Link
                href="/contact"
                onClick={(e) => {
                  setIsOpen(false);
                }}
                className="block py-2 w-fit text-muted-foreground hover:text-primary"
              >
                Contact
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
