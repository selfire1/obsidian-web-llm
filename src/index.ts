import { readdir } from "node:fs/promises";

const obsidianDirectory = await readdir(Bun.env.OBSIDIAN_PATH);

console.log(obsidianDirectory);
