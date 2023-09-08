export const saveTokenToCookie = (token: string | null): void => {
  if (!token) {
    // Handle the case where the token is null or empty
    console.error("Invalid token provided.");
    return;
  }

  // Set the expiration date for the cookie (e.g., 1 hour from now)
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000); // 1 hour

  // Build the cookie string
  const cookieValue = `token=${encodeURIComponent(
    token
  )}; expires=${expirationDate.toUTCString()}; path=/`;

  try {
    // Save the cookie
    document.cookie = cookieValue;
  } catch (error) {
    console.error("Error saving the cookie:", error);
  }
};
