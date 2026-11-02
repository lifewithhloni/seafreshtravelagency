import fs from "node:fs";
import path from "node:path";

/**
 * Server-only helper: returns the image path if the file exists in /public,
 * otherwise null so components can render a branded placeholder instead of a
 * broken image. Pages are statically generated, so in production this runs at
 * build time — rebuild after adding photos.
 */
export function existingImage(src: string | null | undefined): string | null {
  if (!src || !src.startsWith("/")) return null;
  return fs.existsSync(path.join(process.cwd(), "public", src)) ? src : null;
}
