export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date
    ) {};

    get token() {
        const currentDate: Date = new Date();
        if (!this._tokenExpirationDate || currentDate > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}