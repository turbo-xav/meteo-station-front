export class User {
  public constructor(
    public id: number,
    public email: string,
    public firstname: string,
    public lastname: string,
    public picture: string,
    public token: string,
    public accessToken: string,
    public role: string
  ) {}
}
