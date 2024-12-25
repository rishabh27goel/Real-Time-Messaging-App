export const setTokenResponseCookies = (key, value, response) => {
  response.cookie(key, value, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development"
  });
}