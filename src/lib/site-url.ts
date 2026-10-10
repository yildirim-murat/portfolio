const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const hasConfiguredSiteUrl = Boolean(configuredSiteUrl);

export const siteUrl = new URL(
  configuredSiteUrl || "http://localhost:3000",
);

export function absoluteUrl(pathname: string) {
  return new URL(pathname, siteUrl).toString();
}
