import "./globals.css";

export const metadata = {
  title: "PixelTrack",
  description: "PixelTrack is easy to use API to track your website traffic.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
