import Cookies from "js-cookie";
export function getTokenCookie() {
  return Cookies.get("token");
}
