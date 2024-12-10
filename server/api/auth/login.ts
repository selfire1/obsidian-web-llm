export default defineEventHandler(async (event) => {
  assertMethod(event, "POST");

  const formData = await readFormData(event);
  const username = formData.get("username");
  const password = formData.get("password");

  if (!username || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
    });
  }

  setResponseStatus(event, 200);

  return "All good";
});
