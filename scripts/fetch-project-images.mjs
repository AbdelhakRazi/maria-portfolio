import { mkdir, readFile, writeFile } from "node:fs/promises";

const markdown = await readFile("projets/projets.md", "utf8");
const sections = markdown.split(/^# Projet \d[^\n]*$/gm).slice(1);
const slugs = ["pop-club", "motif", "cafe-ora", "pixel-papier", "didi-zaza"];
const urlPattern = /!\[Image\]\((https:\/\/images\.openai\.com\/[^)]+)\)/g;
const manifest = {};

await mkdir("media", { recursive: true });

for (const [sectionIndex, section] of sections.entries()) {
  const slug = slugs[sectionIndex];
  const urls = [...section.matchAll(urlPattern)].map((match) => match[1]);
  const directory = `media/${slug}`;
  await mkdir(directory, { recursive: true });
  manifest[slug] = [];

  for (const [imageIndex, url] of urls.entries()) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Unable to download ${url}: ${response.status}`);
    const contentType = response.headers.get("content-type") || "image/jpeg";
    const extension = contentType.includes("png") ? "png" : contentType.includes("webp") ? "webp" : "jpg";
    const path = `${directory}/${String(imageIndex + 1).padStart(2, "0")}.${extension}`;
    await writeFile(path, Buffer.from(await response.arrayBuffer()));
    manifest[slug].push(path.replaceAll("\\", "/"));
  }
}

await writeFile("media/manifest.json", `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Downloaded ${Object.values(manifest).flat().length} project images.`);
