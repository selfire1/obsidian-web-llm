import type { InputNote } from "../types";

const { API_USER, API_PASSWORD, BASE_URL } = Bun.env;

const headers = {
  "Content-Type": "application/json",
  Authorization: `Basic ${Buffer.from(`${API_USER}:${API_PASSWORD}`).toString("base64")}`,
};

export const addNote = async (item: InputNote) => {
  console.log("Adding note", item.title);

  const response = await fetch(BASE_URL + "/notes", {
    method: "POST",
    headers,
    body: JSON.stringify(item),
  });
  const responseJson = await response.json();
  console.log(responseJson);
};
