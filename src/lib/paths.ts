import path from "path";

export const contentRoot = path.join(process.cwd(), "content");
export const postsDir = path.join(contentRoot, "posts");
export const projectsDir = path.join(contentRoot, "projects");

export function normalizeAssetPath(src: string | undefined): string {
  if (!src) return "";
  return src
    .replace(/^(\/\.\.)+\/images\//, "/images/")
    .replace(/^\.\.\/images\//, "/images/")
    .replace(/^images\//, "/images/");
}
