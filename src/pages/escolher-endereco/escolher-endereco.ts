import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-escolher-endereco',
  templateUrl: 'escolher-endereco.html',
})
export class EscolherEnderecoPage {

  items: Array<EnderecoDTO> = [];
  pedido: PedidoDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private clienteService: ClienteService,
    private storage: StorageService,
    private cartService: CartService
  ) { }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['enderecos'];
          this.pedido = {
            cliente: { id: response['id'] },
            enderecoDeEntrega: null,
            pagamento: null,
            itens: this.cartService.getCart().itens.map(x => { return { quantidade: x.quantidade, produto: { id: x.produto.id } } })
          }
        },
          error => {
            if (error.status == 403) {
              this.navCtrl.setRoot("HomePage");
            }
          });
    } else {
      this.navCtrl.setRoot("HomePage");
    }
  }


  nextPage(item: EnderecoDTO) {
    this.pedido.enderecoDeEntrega = { id: item.id }
    this.navCtrl.push("PagamentosPage", { pedido: this.pedido })
  }

}
