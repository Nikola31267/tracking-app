export const getSEOTags = ({
  openGraph,
  canonicalUrlRelative,
  extraTags,
} = {}) => {
  return {
   
    title: "Pixel Track | Track every click, unlock every insight",
    description: "Pixel Track is a tool that helps you track your website's performance and user engagement. It gives you a deeper understanding of your users and helps you improve your website's performance based on the traffic it receives.",
    keywords: "pixel track, track website, website analytics, website api, website performance, user tracking",
    applicationName: "Pixel Track",
    metadataBase: new URL(
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : "https://pixel-track.vercel.app/"
    ),

    openGraph: {
      title: openGraph?.title || "Pixel Track | Track every click, unlock every insight",
      description: openGraph?.description || "Pixel Track is a tool that helps you track your website's performance and user engagement. It gives you a deeper understanding of your users and helps you improve your website's performance based on the traffic it receives.",
      url: openGraph?.url || "https://pixel-track.vercel.app/",
      siteName: openGraph?.title || "Pixel Track",
      locale: "en_US",
      type: "website",
    },

    twitter: {
      title: openGraph?.title || "Pixel Track",
      description: openGraph?.description || "Pixel Track is a tool that helps you track your website's performance and user engagement. It gives you a deeper understanding of your users and helps you improve your website's performance based on the traffic it receives.",
      card: "summary_large_image",
      creator: "@nikola_minchev",
    },
    ...(canonicalUrlRelative && {
      alternates: { canonical: canonicalUrlRelative },
    }),
    ...extraTags,
  };
};
export const RenderSchemaTags = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "http://schema.org",
          "@type": "SoftwareApplication",
          name: "Pixel Track",
          description: "Pixel Track is a tool that helps you track your website's performance and user engagement. It gives you a deeper understanding of your users and helps you improve your website's performance based on the traffic it receives.",
          image: `https://pixel-track.vercel.app/logo.jpg`,
          url: "https://pixel-track.vercel.app/",
          author: {
            "@type": "Person",
            name: "Nikola Minchev",
          },
          datePublished: "2024-12-21",
          applicationCategory: "EducationalApplication",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            ratingCount: "12",
          },
          offers: [
            {
              "@type": "Offer",
              price: "9.00",
              priceCurrency: "USD",
            },
          ],
        }),
      }}
    ></script>
  );
};
