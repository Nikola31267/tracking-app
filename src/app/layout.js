import Navbar from "@/components/layout/Navbar";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { getSEOTags } from "@/lib/seo";
import { Poppins } from "next/font/google";
import Footer from "@/components/layout/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = getSEOTags();

export default function RootLayout({ children, modal }) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${poppins.variable}`}
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        {children}
        {modal}
        <Toaster />
      </body>
    </html>
  );
}
