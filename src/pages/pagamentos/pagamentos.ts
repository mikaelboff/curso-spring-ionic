import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-pagamentos',
  templateUrl: 'pagamentos.html',
})
export class PagamentosPage {

  pedido: PedidoDTO;
  parcelas: Array<number> = Array.from(new Array(10), (x, i) => i + 1);

  pagamento: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder
  ) {
    this.pedido = this.navParams.get('pedido');
    this.pagamento = this.formBuilder.group({
      numeroDeParcelas: [1, Validators.required],
      "@type": ['pagamentoComCartao', Validators.required]
    });
  }

  nextPage() {
    this.pedido.pagamento = this.pagamento.value;
    this.navCtrl.setRoot("ConfirmacaoOrdemPage", { pedido: this.pedido });
  }

}
