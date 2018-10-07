import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { StorageService } from '../../services/storage.service';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';
import { ProdutoDTO } from '../../models/produto.dto';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  itens: Array<CartItem> = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cartService: CartService,
    private produtoService: ProdutoService,
  ) { }

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.itens = cart.itens;
    this.loadImageUrls();
  }

  loadImageUrls() {
    this.itens.forEach(item => this.produtoService.getSmallImageFromBucket(item.produto.id)
      .subscribe(sucesso => {
        item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.produto.id}-small.jpg`;
      }, falha => {

      }));
  }

  removeItem(produto: ProdutoDTO) {
    this.itens = this.cartService.removeProduto(produto).itens;
  }

  increaseQuantity(produto: ProdutoDTO) {
    this.itens = this.cartService.increaseQuantity(produto).itens;
  }

  decreaseQuantity(produto: ProdutoDTO) {
    this.itens = this.cartService.decreaseQuantity(produto).itens;
  }

  total(): number {
    return this.cartService.total();
  }

  continuarComprando() {
    this.navCtrl.setRoot("CategoriasPage");
  }
}
