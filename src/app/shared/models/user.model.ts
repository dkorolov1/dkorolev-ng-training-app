export class User {
    constructor(
        public email: string,
        public id: string,
        private tokenInt: string,
        private tokenExpirationDate: Date
    ) {}

    get token() {
        const currentDate: Date = new Date();
        if (!this.tokenExpirationDate || currentDate > this.tokenExpirationDate) {
            return null;
        }
        return this.tokenInt;
    }
}
