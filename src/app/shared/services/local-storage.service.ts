import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

const USER_DATA_LOCAL_STORAGE_KEY = 'recipes-app-auth-data';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    setUser(user: User) {
        localStorage.setItem(USER_DATA_LOCAL_STORAGE_KEY, JSON.stringify(user));
    }

    restoreUser() {
        const userData: {
            email: string,
            id: string,
            token: string,
            tokenExpirationDate: Date
        } = JSON.parse(localStorage.getItem(USER_DATA_LOCAL_STORAGE_KEY));
        if (userData) {
            return new User(
                userData.email,
                userData.id,
                userData.token,
                userData.tokenExpirationDate
            );
        }
        return null;
    }

    clearUserData() {
        localStorage.removeItem(USER_DATA_LOCAL_STORAGE_KEY);
    }
}
