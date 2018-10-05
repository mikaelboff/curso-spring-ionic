import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class ProdutoService {
    constructor(public httpClient: HttpClient) {

    }

    findAllByCategoria(idCategoria: number) {
        return this.httpClient.get(`${API_CONFIG.baseUrl}/produtos?categorias=${idCategoria}`);
    }
}