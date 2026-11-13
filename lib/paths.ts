import path from "path";

export const contentRoot = path.join(process.cwd(), "content");
export const postsDir = path.join(contentRoot, "posts");
export const projectsDir = path.join(contentRoot, "projects");

/** Default cover for example content and posts/projects without a custom image. */
export const placeholderCoverPath = "/images/placeholder-cover.svg";

export function normalizeAssetPath(src: string | undefined): string {
  if (!src) return "";
  return src
    .replace(/^(\/\.\.)+\/images\//, "/images/")
    .replace(/^\.\.\/images\//, "/images/")
    .replace(/^images\//, "/images/");
}
