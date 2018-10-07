import { Injectable } from "@angular/core";
import { LocalUser } from "../models/local-user";
import { STORAGE_KEYS } from "../config/storage-keys.config";
import { Cart } from "../models/cart";

@Injectable()
export class StorageService {
    getLocalUser(): LocalUser {
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        return usr == null ? null : JSON.parse(usr);
    }

    setLocalUser(obj: LocalUser) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        } else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj))
        }
    }

    getCart(): Cart {
        let cart = localStorage.getItem(STORAGE_KEYS.cart);
        return cart == null ? null : JSON.parse(cart);
    }

    setCart(obj: Cart) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.cart);
        } else {
            localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj))
        }
    }
}