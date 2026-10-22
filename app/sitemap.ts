import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://surhires.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/jobs`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/employers`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
