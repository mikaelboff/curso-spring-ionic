import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { EstadoDTO } from "../../models/estado.dto";

@Injectable()
export class EstadoService {
    constructor(public httpClient: HttpClient) {

    }

    findAll(): Observable<Array<EstadoDTO>> {
        return this.httpClient.get<Array<EstadoDTO>>(`${API_CONFIG.baseUrl}/estados`);
    }
}