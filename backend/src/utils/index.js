export const setTokenResponseCookie = (key, value, response) => {
  response.cookie(key, value, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development"
  });
}

export const clearTokenResponseCookie = (key, response) => {
  response.clearCookie(key, {
    maxAge: 0,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development"
  });
}