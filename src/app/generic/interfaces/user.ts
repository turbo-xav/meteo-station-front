export class User {
    public constructor(
        public email: string,
        public firstname: string,
        public lastname: string,
        public picture: string,
        public token: string,
        public accessToken: string) {}
}
