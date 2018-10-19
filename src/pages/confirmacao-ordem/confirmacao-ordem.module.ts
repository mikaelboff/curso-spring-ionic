import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmacaoOrdemPage } from './confirmacao-ordem';
import { PedidoService } from '../../services/domain/pedido.service';

@NgModule({
  declarations: [
    ConfirmacaoOrdemPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmacaoOrdemPage),
  ],
  providers: [
    PedidoService
  ]
})
export class ConfirmacaoOrdemPageModule { }
