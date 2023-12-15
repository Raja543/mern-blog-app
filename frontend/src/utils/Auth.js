import { jwtDecode as decode } from "jwt-decode";

export const isTokenValid = (token) => {
  if (!token) {
    return false;
  }

  try {
    const decodedToken = decode(token);
    console.log(decodedToken , "decodedToken");
    const currentTime = Date.now() / 1000;

    // Check if the token is expired
    return decodedToken.exp > currentTime;
  } catch (error) {
    return false;
  }
};
