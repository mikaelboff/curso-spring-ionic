import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

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
    private service: ProdutoService
  ) { }

  ionViewDidLoad() {

    let idCategoria = this.navParams.get('idCategoria');
    this.service.findAllByCategoria(idCategoria)
      .subscribe(sucesso => {
        this.itens = sucesso['content'];
      }, falha => { });
  }

}
