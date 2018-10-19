import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Refresher } from 'ionic-angular';
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
    this.carregarDados();
  }

  carregarDados(refresher?: Refresher) {
    let idCategoria = this.navParams.get('idCategoria');
    let loading;

    if (!this.fazendoPullRefresh(refresher)) {
      loading = this.presentLoading();
    }

    this.service.findAllByCategoria(idCategoria)
      .subscribe(sucesso => {

        if (!this.fazendoPullRefresh(refresher)) {
          loading.dismiss();
        } else {
          refresher.complete();
        }

        this.itens = sucesso['content'];
      }, falha => {

        if (!this.fazendoPullRefresh(refresher)) {
          loading.dismiss();
        } else {
          refresher.complete();
        }

      });
  }

  fazendoPullRefresh(refresh: Refresher) {
    return refresh != null;
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

  doRefresh(refresher: Refresher) {
    this.carregarDados(refresher);
  }
}
