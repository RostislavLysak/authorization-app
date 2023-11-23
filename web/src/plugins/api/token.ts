class Token {
  _accessKey = "accessToken";
  _refreshKey = "refreshToken";

  getAccessToken() {
    return localStorage.getItem(this._accessKey) ?? "";
  }

  getRefreshToken() {
    return localStorage.getItem(this._refreshKey) ?? "";
  }

  setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem(this._accessKey, accessToken);
    localStorage.setItem(this._refreshKey, refreshToken);
  }

  clearTokens() {
    localStorage.removeItem(this._accessKey);
    localStorage.removeItem(this._refreshKey);
  }
}

export default new Token();
