import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Refresher, InfiniteScroll } from 'ionic-angular';
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
  page: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private service: ProdutoService,
    private loadingCtrl: LoadingController
  ) { }

  ionViewDidLoad() {
    this.carregarDados();
  }

  /**
   * Carrega os dados
   * @param comp Refresher ou InfinityScroll
   */
  carregarDados(comp?) {
    let idCategoria = this.navParams.get('idCategoria');
    let loading;

    let fazendoRefreshOuInfinityScroll = this.fazendoPullRefreshOuScrollInfinito(comp);

    if (!fazendoRefreshOuInfinityScroll) {
      loading = this.presentLoading();
    }

    this.service.findAllByCategoria(idCategoria, this.page, 10)
      .subscribe(sucesso => {

        if (!fazendoRefreshOuInfinityScroll) {
          loading.dismiss();
        } else {
          comp.complete();
        }

        let start = this.itens.length;
        this.itens = this.itens.concat(sucesso['content']);
        let limit = this.itens.length - 1;

        this.loadImageUrls(start, limit);
      }, falha => {

        if (!fazendoRefreshOuInfinityScroll) {
          loading.dismiss();
        } else {
          comp.complete();
        }

      });
  }

  fazendoPullRefreshOuScrollInfinito(comp) {
    return comp != null;
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({ content: "CARREGANDO..." });
    loader.present();
    return loader;
  }

  loadImageUrls(start: number, limit: number) {
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
    this.page = 0;
    this.itens = [];
    this.carregarDados(refresher);
  }

  doInfinite(infiniteScroll: InfiniteScroll) {
    this.page++;
    this.carregarDados(infiniteScroll);
  }
}
