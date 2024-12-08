import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "PixelTrack",
  description: "PixelTrack is easy to use API to track your website traffic.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children} <Toaster />
      </body>
    </html>
  );
}
