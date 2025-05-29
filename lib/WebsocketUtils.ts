export default function WebsocketUtils() {
  function getUserIdFromToken(token: string): string {
    if (!token) return "";

    try {
      const parts = token.split(".");
      if (parts.length !== 3) throw new Error("Invalid token format");

      const base64Url = parts[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(window.atob(base64));
      return payload.sub || payload.userId || payload.id || "";
    } catch (error) {
      console.error("Error decoding JWT token:", error);
      return "";
    }
  }
  return { getUserIdFromToken };
}
