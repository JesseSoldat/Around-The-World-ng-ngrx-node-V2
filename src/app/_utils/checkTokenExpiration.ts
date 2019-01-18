import { decodeToken } from "./decodeToken";

const checkTokenExpiration = token => {
  const decodedToken = decodeToken(token);
  const expires = decodedToken.exp;
  const now = new Date().getTime();

  let isExpired = false;

  if (expires < now) isExpired = true;

  console.log(expires, isExpired);

  return isExpired;
};

export { checkTokenExpiration };
