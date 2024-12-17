import { getAreCredentialsValid } from "~~/server/utils";

export default defineEventHandler(async (event) => {
  const { name, password } = event.context.auth;
  const isValid = getAreCredentialsValid(name, password);
  if (!isValid) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const { query } = getQuery(event);

  const {
    api: { baseurl: API_BASEURL, user: API_USER, password: API_PASSWORD },
  } = useRuntimeConfig();

  const response = await $fetch(`${API_BASEURL}/query`, {
    method: "GET",
    params: {
      text: query,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(
        `${API_USER}:${API_PASSWORD}`,
      ).toString("base64")}`,
    },
  });
  return response;
});
