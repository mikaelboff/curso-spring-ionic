import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CategoriaDTO } from "../../models/Categoria.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class CategoriaService {
    constructor(public httpClient: HttpClient) {

    }

    findAll(): Observable<Array<CategoriaDTO>> {
        return this.httpClient.get<Array<CategoriaDTO>>(`${API_CONFIG.base_url}`)
    }
}