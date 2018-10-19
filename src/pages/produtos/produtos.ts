import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {
  itens: Array<ProdutoDTO> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private service: ProdutoService,
    private loadingCtrl: LoadingController
  ) { }

  ionViewDidLoad() {

    let idCategoria = this.navParams.get('idCategoria');
    let loading = this.presentLoading();
    this.service.findAllByCategoria(idCategoria)
      .subscribe(sucesso => {
        loading.dismiss();
        this.itens = sucesso['content'];
      }, falha => {
        loading.dismiss();
      });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({ content: "CARREGANDO..." });
    loader.present();
    return loader;
  }

  loadImageUrls() {
    this.itens.forEach(item => this.service.getSmallImageFromBucket(item.id)
      .subscribe(sucesso => {
        item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
      }, falha => {

      }));
  }

  abrirDetalhamento(item: ProdutoDTO) {
    this.navCtrl.push("ProdutoDetailPage", { produto: item });
  }
}
