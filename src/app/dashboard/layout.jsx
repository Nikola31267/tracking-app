import { getSEOTags } from "@/lib/seo";

export const metadata = getSEOTags({
  title: `Dashboard | Tracking App`,
  canonicalUrlRelative: "/dashboard",
});

export default function Layout({ children }) {
  return <>{children}</>;
}
