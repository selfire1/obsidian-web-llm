import crypto from "crypto";
export const getAreCredentialsValid = (
  username?: string,
  password?: string,
): Boolean => {
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
  return isAuthentificated;
};

function secureCompare(a: string, b: string) {
  if (a.length !== b.length) {
    return false;
  }
  const uint8a = new TextEncoder().encode(a);
  const uint8b = new TextEncoder().encode(b);
  return crypto.timingSafeEqual(uint8a, uint8b);
}
