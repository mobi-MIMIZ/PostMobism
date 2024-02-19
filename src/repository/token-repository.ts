export const TOKEN_KEY = "access_token"

export const TokenRepository = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY)
  },
  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token)
  },
  removeToken() {
    localStorage.removeItem(TOKEN_KEY)
  },
}
