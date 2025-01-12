import SupportIcon from "@/components/SupportIcon";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { getSEOTags } from "@/lib/seo";
import { Poppins } from "next/font/google";
import Script from "next/script";

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

        <script
          src="http://localhost:3000/js/issues.js"
          data-website-url="https://turboverify.vercel.app"
          data-project-id="676f26e40a5a344fe4c9c607"
        ></script>
      </body>
    </html>
  );
}
