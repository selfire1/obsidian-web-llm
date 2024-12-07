import { readdir } from "node:fs/promises";
import type { InputNote } from "../types";
import { addNote, getQueryResponse } from "./api";
import graymatter from "gray-matter";

const upsertNotes = async () => {
  const obsidianDirectory = await readdir(Bun.env.OBSIDIAN_PATH, {
    recursive: true,
  });

  const markdownFiles = obsidianDirectory.filter((file) => {
    return file.endsWith(".md");
  });

  for await (const filePathFromRoot of markdownFiles) {
    const filePath = Bun.env.OBSIDIAN_PATH + "/" + filePathFromRoot;
    const file = Bun.file(filePath);
    const text = await file.text();
    const { data: _frontmatter, content } = graymatter(text);
    const title = filePathFromRoot.split("/").slice(-1)[0].replace(".md", "");
    if ([content, title, filePathFromRoot].some((x) => !x)) {
      // skip items without text, title or filepath
      continue;
    }

    const item: InputNote = {
      text: content,
      title,
      path: filePathFromRoot,
    };

    await addNote(item);
  }
};

const queryNotes = async () => {
  const query = prompt("Enter query:");
  if (!query) {
    console.log("Please provide a query.");
    return;
  }

  console.time("query");
  const _answer = await getQueryResponse(query);
  console.timeEnd("query");
};

await queryNotes();
