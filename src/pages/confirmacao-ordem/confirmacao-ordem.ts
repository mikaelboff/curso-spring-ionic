import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/domain/cart.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { PedidoService } from '../../services/domain/pedido.service';

/**
 * Generated class for the ConfirmacaoOrdemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirmacao-ordem',
  templateUrl: 'confirmacao-ordem.html',
})
export class ConfirmacaoOrdemPage {

  pedido: PedidoDTO;
  cartItems: Array<CartItem>;
  cliente: ClienteDTO;
  endereco: EnderecoDTO;
  codPedido: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cartService: CartService,
    private clienteService: ClienteService,
    private pedidoService: PedidoService
  ) {
    this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().itens;
    this.clienteService.findById(this.pedido.cliente.id)
      .subscribe(response => {
        this.cliente = response as ClienteDTO;
        this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, response['enderecos']);
      }, error => {
        this.navCtrl.setRoot("HomePage");
      });
  }

  private findEndereco(id: string, list: Array<EnderecoDTO>): EnderecoDTO {
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total() {
    return this.cartService.total();
  }

  back() {
    this.navCtrl.setRoot("CartPage");
  }

  categorias() {
    this.navCtrl.setRoot("CategoriasPage");
  }

  checkout() {
    this.pedidoService.insert(this.pedido).subscribe(sucesso => {
      this.cartService.createOrClearCart();
      this.codPedido = this.extractId(sucesso.headers.get('location'));

    }, erro => {
      if (erro.status == 403) {
        this.navCtrl.setRoot("HomePage");
      }
    })
  }

  extractId(location: string): string {
    let position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
  }
}
