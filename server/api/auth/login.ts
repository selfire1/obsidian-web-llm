import * as jose from "jose";
import { JWT_TOKEN_COOKIE_NAME } from "~~/server/consts";
import { getAreCredentialsValid } from "~~/server/utils";

export default defineEventHandler(async (event) => {
  assertMethod(event, "POST");

  const formData = await readFormData(event);
  const username = formData.get("username")?.toString();
  const password = formData.get("password")?.toString();

  const {
    auth: { secretkey: SECRET_KEY },
  } = useRuntimeConfig();

  const isValidCredentials = getAreCredentialsValid(username, password);

  if (!isValidCredentials) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  setResponseStatus(event, 200);

  const payload = {
    name: username,
    password,
  };

  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10m")
    .sign(new TextEncoder().encode(SECRET_KEY));

  setCookie(event, JWT_TOKEN_COOKIE_NAME, jwt, { httpOnly: true });
  return;
});
