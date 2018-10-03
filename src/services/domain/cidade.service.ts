import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { CidadeDTO } from "../../models/cidade.dto";

@Injectable()
export class CidadeService {
    constructor(public httpClient: HttpClient) {

    }

    findAll(estadoId: string): Observable<Array<CidadeDTO>> {
        return this.httpClient.get<Array<CidadeDTO>>(`${API_CONFIG.baseUrl}/estados/${estadoId}/cidades`);
    }
}