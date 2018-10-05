import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {
  itens: Array<ProdutoDTO> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) { }

  ionViewDidLoad() {

    let idCategoria = this.navParams.get('idCategoria');
    
    this.itens = [
      {
        id: "1",
        nome: "Mouse",
        preco: 80.99
      }, {
        id: "2",
        nome: "Teclado",
        preco: 100.00
      }
    ]
  }

}
