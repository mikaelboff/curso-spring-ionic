import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { ClienteNewDTO } from "../../models/cliente-new.dto";

@Injectable()
export class ClienteService {
    constructor(
        private httpClient: HttpClient
    ) { }

    findByEmail(email: string) {
        return this.httpClient.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    findById(id: string) {
        return this.httpClient.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
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