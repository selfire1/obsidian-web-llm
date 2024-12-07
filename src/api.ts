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

export const getQueryResponse = async (query: string) => {
  console.log("Getting reponse...", query);

  const params = new URLSearchParams({
    text: query,
  });
  const response = await fetch(`${BASE_URL}/query` + "?" + params.toString(), {
    method: "GET",
    headers,
    // body: JSON.stringify(item),
  });
  const responseText = await response.text();
  try {
    const responseJson = JSON.parse(responseText);
    console.log(responseJson);
    return;
  } catch (e) {
    // console.error(e);
  }
  console.log(responseText);
};
