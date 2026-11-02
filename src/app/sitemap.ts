import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";
import { destinations } from "@/content/destinations";
import { mainNav } from "@/content/navigation";
import { getPublishedTrips } from "@/content/trips";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...mainNav.map((n) => n.href),
    ...destinations.map((d) => `/destinations/${d.slug}`),
    ...getPublishedTrips().map((t) => `/group-trips/${t.slug}`),
  ];
  return paths.map((p) => ({ url: new URL(p, siteUrl).toString() }));
}
