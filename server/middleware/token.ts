import { JWTPayload, jwtVerify } from "jose";
import { JWT_TOKEN_COOKIE_NAME } from "../consts";

async function runAuthMiddleware(
  targetPath: string,
  token: string,
): Promise<JWTPayload | undefined> {
  const pathsRequiringAuth = "/api/secret";
  if (!targetPath.startsWith(pathsRequiringAuth)) {
    // path doesn't require auth -> allow
    return;
  }

  const {
    auth: { secretkey: SECRET_KEY },
  } = useRuntimeConfig();

  try {
    const { payload, protectedHeader: _ } = await jwtVerify(
      token,
      new TextEncoder().encode(SECRET_KEY),
    );

    if (!payload) {
      console.log("No payload");
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
      });
    }
    return payload;
  } catch (e) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }
}

export default defineEventHandler(async (event) => {
  const payload = await runAuthMiddleware(
    event.path,
    getCookie(event, JWT_TOKEN_COOKIE_NAME)?.toString() || "",
  );
  if (payload) {
    event.context.auth = payload;
  }
});
