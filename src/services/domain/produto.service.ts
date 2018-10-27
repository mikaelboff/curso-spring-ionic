import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ProdutoService {
    constructor(public httpClient: HttpClient) { }

    findAllByCategoria(idCategoria: string, page: number = 0, linesPerPage: number = 24) {
        return this.httpClient.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${idCategoria}&page=${page}&linesPerPage=${linesPerPage}`);
    }

    getSmallImageFromBucket(idProduto: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${idProduto}-small.jpg`;
        return this.httpClient.get(url, { responseType: 'blob' });
    }

    getImageFromBucket(idProduto: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${idProduto}.jpg`;
        return this.httpClient.get(url, { responseType: 'blob' });
    }
}