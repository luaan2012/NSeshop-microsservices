export class LocalStorageUtils {
  public GetUser() {
      return JSON.parse(localStorage.getItem('webspa.user'));
  }

  public IsLogged() {
      return localStorage.getItem('webspa.user') ? true : false;
  }

  public SaveDataUser(response: any) {
      this.SaveTokenUser(response.accessToken);
      this.SaveUser(response.userToken);
      this.SaveRefreshToken(response.refreshToken);
  }

  public ClearDataUser() {
      localStorage.removeItem('webspa.token');
      localStorage.removeItem('webspa.user');
      localStorage.removeItem('webspa.refreshToken');
      localStorage.removeItem('detail');
      localStorage.removeItem('detailBanner');
  }

  public GetTokenUser(): string {
      return localStorage.getItem('webspa.token');
  }

  public GetRefreshToken(): string {
    return localStorage.getItem('webspa.refreshToken');
  }

  public SaveTokenUser(token: string) {
    localStorage.setItem('webspa.token', token);
  }

  public SaveUser(user: string) {
    localStorage.setItem('webspa.user', JSON.stringify(user));
  }

  public SaveRefreshToken(user: string) {
    localStorage.setItem('webspa.refreshToken', JSON.stringify(user));
  }
}
