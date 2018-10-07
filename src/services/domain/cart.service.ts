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

    removeProduto(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let index = cart.itens.findIndex(x => x.produto.id == produto.id);
        if (index != -1) {
            cart.itens.splice(index, 1);
        }
        this.storage.setCart(cart);
        return cart;
    }

    increaseQuantity(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let index = cart.itens.findIndex(x => x.produto.id == produto.id);
        if (index != -1) {
            cart.itens[index].quantidade++;
        }
        this.storage.setCart(cart);
        return cart;
    }

    decreaseQuantity(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let index = cart.itens.findIndex(x => x.produto.id == produto.id);
        if (index != -1) {
            var qtd = cart.itens[index].quantidade;
            qtd--;
            if (qtd == 0) {
                cart = this.removeProduto(produto);
            }
        }
        this.storage.setCart(cart);
        return cart;
    }

    total(): number {
        let cart = this.storage.getCart();
        let sum = 0;
        cart.itens.forEach(x => sum += x.produto.preco * x.quantidade);
        return sum;
    }
}