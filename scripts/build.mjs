import { cp, mkdir, rm } from "node:fs/promises";

const publicFiles = [
  "index.html",
  "project.html",
  "styles.css",
  "project.css",
  "script.js",
  "project.js",
  "robots.txt",
  "404.html"
];

await rm("dist", { recursive: true, force: true });
await mkdir("dist");
await Promise.all(publicFiles.map((file) => cp(file, `dist/${file}`)));
await cp("media", "dist/media", { recursive: true });

console.log(`Built ${publicFiles.length} files and project media in dist/`);
