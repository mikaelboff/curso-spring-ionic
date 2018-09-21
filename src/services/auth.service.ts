import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local-user";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthService {

    constructor(
        private http: HttpClient,
        private storage: StorageService
    ) { }
    authenticate(creds: CredenciaisDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`,
            creds,
            //evitar erro de parse de json em um corpo vazio
            {
                observe: 'response',
                responseType: 'text',
            }
        )
    }

    successfullLogin(authorizationValue: string) {
        let token = authorizationValue.substring(7);
        let user: LocalUser = { token: token };

        this.storage.setLocalUser(user);
    }

    logout() {
        this.storage.setLocalUser(null);
    }
}