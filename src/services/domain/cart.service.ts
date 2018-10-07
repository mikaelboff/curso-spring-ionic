import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { Cart } from "../../models/cart";
import { callLifecycleHooksChildrenFirst } from "@angular/core/src/view/provider";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class CartService {
    constructor(
        private storage: StorageService
    ) { }

    createOrClearCart(): Cart {
        let cart: Cart = { itens: [] };
        this.storage.setCart(cart);
        return cart;
    }

    getCart(): Cart {
        let cart: Cart = this.storage.getCart();
        if (cart == null) {
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addProduto(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let index = cart.itens.findIndex(x => x.produto.id == produto.id);
        if (index == -1) {
            cart.itens.push({ quantidade: 1, produto: produto });
        }
        this.storage.setCart(cart);
        return cart;
    }
}