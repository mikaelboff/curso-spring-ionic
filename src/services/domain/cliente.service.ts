import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { ClienteNewDTO } from "../../models/cliente-new.dto";

@Injectable()
export class ClienteService {
    constructor(
        private httpClient: HttpClient,
        private storage: StorageService
    ) { }

    findByEmail(email: string): Observable<ClienteDTO> {
        return this.httpClient.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
        return this.httpClient.get(url, { responseType: 'blob' });
    }

    cadastrar(obj: ClienteNewDTO) {
        return this.httpClient.post(
            `${API_CONFIG.baseUrl}/clientes`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        )
    }
}