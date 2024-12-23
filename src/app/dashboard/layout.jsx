import { getSEOTags } from "@/lib/seo";

export const metadata = getSEOTags({
  title: `Dashboard | Pixel Track`,
  canonicalUrlRelative: "/dashboard",
});

export default function Layout({ children }) {
  return <>{children}</>;
}
