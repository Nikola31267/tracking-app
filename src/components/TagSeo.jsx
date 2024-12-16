import React from "react";

const TagSEO = () => {
  return (
    <head>
      {/* Basic Meta Tags */}
      <title>Pixel Track</title>
      <meta
        name="description"
        content="Track your website's performance and growth with Pixel Track. Monitor views, traffic, and more. Get insights to optimize your website and grow your business."
      />
      <meta
        name="keywords"
        content="website analytics, website tracking, website performance, website growth, website monitoring"
      />
      <meta name="author" content="Nikola Minchev" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content="Pixel Track" />
      <meta
        property="og:description"
        content="Track your website's performance and growth with Pixel Track. Monitor views, traffic, and more. Get insights to optimize your website and grow your business."
      />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/logo.jpg" />
      <meta property="og:url" content="https://pixel-track.vercel.app" />
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content="https://pixel-track.vercel.app" />
      <meta name="twitter:title" content="Pixel Track" />
      <meta
        name="twitter:description"
        content="Track your website's performance and growth with Pixel Track. Monitor views, traffic, and more. Get insights to optimize your website and grow your business."
      />
      <meta name="twitter:image" content="/logo.jpg" />
      <meta name="twitter:site" content="@PixelTrack" />
      <meta name="twitter:creator" content="@PixelTrack" key="twitter" />
      {/* Facebook */}
      <meta property="og:url" content="https://pixel-track.vercel.app" />
      <meta property="og:image" content="/logo.jpg" />
      <meta
        property="og:description"
        content="Track your website's performance and growth with Pixel Track. Monitor views, traffic, and more. Get insights to optimize your website and grow your business."
      />
      <meta property="og:title" content="Pixel Track" />
      <meta property="og:site_name" content="Pixel Track" />
      <meta property="og:see_also" content="https://pixel-track.vercel.app" />
    </head>
  );
};

export default TagSEO;
