import crypto from "crypto";

export default defineEventHandler(async (event) => {
  assertMethod(event, "POST");

  const formData = await readFormData(event);
  const username = formData.get("username")?.toString();
  const password = formData.get("password")?.toString();

  if (!username || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
    });
  }

  const {
    auth: {
      user: { name: STORED_NAME_RAW, password: STORED_PASSWORD_RAW },
    },
  } = useRuntimeConfig();

  if (!STORED_NAME_RAW || !STORED_PASSWORD_RAW) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }

  // normalise the stored data to a string
  const STORED_NAME = STORED_NAME_RAW.toString();
  const STORED_PASSWORD = STORED_PASSWORD_RAW.toString();

  const isAuthentificated =
    secureCompare(username, STORED_NAME) &&
    secureCompare(password, STORED_PASSWORD);

  if (!isAuthentificated) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  setResponseStatus(event, 200);
  return "You're in"; // TODO: Issue JWT
});

function secureCompare(a: string, b: string) {
  if (a.length !== b.length) {
    return false;
  }
  const uint8a = new TextEncoder().encode(a);
  const uint8b = new TextEncoder().encode(b);
  return crypto.timingSafeEqual(uint8a, uint8b);
}
