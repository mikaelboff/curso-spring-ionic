import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProdutoDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private service: ProdutoService,
    private cartService: CartService
  ) { }

  ionViewDidLoad() {
    this.item = this.navParams.get('produto');
  }

  getImageUrlIfExists() {
    this.service.getImageFromBucket(this.item.id)
      .subscribe(sucesso => {
        this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
      }, falha => { })
  }

  addToCart(item: ProdutoDTO) {
    this.cartService.addProduto(item);
    this.navCtrl.setRoot("CartPage");
  }

}
