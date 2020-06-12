export class User {
    constructor(
        public email: string,
        public id: string,
        public token: string,
        public tokenExpirationDate: Date
    ) {}

    get tokenValid() {
        return this.tokenExpirationDate
            && new Date() < this.tokenExpirationDate;
    }

    get tokenExpiresIn() {
        return this.tokenExpirationDate.getTime()
            - new Date().getTime();
    }
}
