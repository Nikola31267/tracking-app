import TagSEO from "@/components/TagSeo";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <TagSEO />
      <body
        className={`antialiased ${poppins.variable}`}
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        {children} <Toaster />
      </body>
    </html>
  );
}
