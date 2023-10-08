export class SessionService {
  private static readonly USER = "user";
  private static readonly TOKEN = "token";
  private static readonly EXP = "expiry";

  // Store user session in sessionStorage
  static login(user: String, token: String, exp: String): void {
    const userJson = JSON.stringify(user);
    const tokenJson = JSON.stringify(token);
    const expJson = JSON.stringify(exp);
    sessionStorage.setItem(SessionService.USER, userJson);
    sessionStorage.setItem(SessionService.TOKEN, tokenJson);
    sessionStorage.setItem(SessionService.EXP, expJson);
  }

  // Retrieve user sesion from sessionStorage
  static getUser(): any | null {
    const userJson = sessionStorage.getItem(SessionService.USER);
    return userJson ? JSON.parse(userJson) : null;
  }

  // Retrieve user token from sessionStorage
  static getUserToken(): any | null {
    const tokenJson = sessionStorage.getItem(SessionService.TOKEN);
    return tokenJson ? JSON.parse(tokenJson) : null;
  }

  // Retrieve user expiry from sessionStorage
  static getUserExpiry(): any | null {
    const expJson = sessionStorage.getItem(SessionService.EXP);
    return expJson ? JSON.parse(expJson) : null;
  }

  // Check if a user is logged in
  static isLoggedIn(): boolean {
    return !!SessionService.getUser();
  }

  // Logout by clearing user session from sessionStorage
  static logout(): void {
    sessionStorage.removeItem(SessionService.USER);
    sessionStorage.removeItem(SessionService.TOKEN);
    sessionStorage.removeItem(SessionService.EXP);
  }
}
