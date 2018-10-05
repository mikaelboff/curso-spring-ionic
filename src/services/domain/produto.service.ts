import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ProdutoService {
    constructor(public httpClient: HttpClient) { }

    findAllByCategoria(idCategoria: number) {
        return this.httpClient.get(`${API_CONFIG.baseUrl}/produtos?categorias=${idCategoria}`);
    }

    getSmallImageFromBucket(idProduto: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${idProduto}-small.jpg`;
        return this.httpClient.get(url, { responseType: 'blob' });
    }
}