import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeDTO } from '../../models/cidade.dto';
import { EstadoDTO } from '../../models/estado.dto';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signup: FormGroup;

  public estados: Array<EstadoDTO> = [];
  public cidades: Array<CidadeDTO> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private cidadeService: CidadeService,
    private estadoService: EstadoService,
    private clienteService: ClienteService,
    private alertCtrl: AlertController
  ) {
    this.signup = this.formBuilder.group({
      nome: ['Joaquim', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(120)])],
      email: ['joaquim@gmail.com', Validators.compose([Validators.required, Validators.email])],
      tipo: ['1', Validators.required],
      cpfOuCnpj: ['06774297978', Validators.compose([Validators.required, Validators.minLength(14), Validators.maxLength(18)])],
      senha: ['123456', Validators.compose([Validators.required, Validators.minLength(6)])],
      logradouro: ['Rua Via', Validators.required],
      numero: ['25', Validators.required],
      complemento: ['Apto 3'],
      bairro: ['Copacabana'],
      cep: ['10828333', Validators.required],
      telefone1: ['', Validators.required],
      telefone2: [''],
      telefone3: [''],
      estadoId: [null, Validators.required],
      cidadeId: [null, Validators.required],
    });
  }

  ionViewDidLoad() {
    this.estadoService.findAll()
      .subscribe(sucesso => {
        this.estados = sucesso;
        this.signup.controls.estadoId.setValue(this.estados[0].id);
      })
  }
  signupUser() {
    this.clienteService.cadastrar(this.signup.value)
      .subscribe(sucesso => {
        this.showInsertOk();
      })
  }

  showInsertOk() {
    return this.alertCtrl.create({
      title: "SUCESSO!",
      message: "CADASTRO EFETUADO COM SUCESSO!",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => { this.navCtrl.pop(); }
        }]
    }).present();
  }

  updateCidades() {
    let estadoId = this.signup.value.estadoId;
    this.cidadeService.findAll(estadoId)
      .subscribe(sucesso => {
        this.cidades = sucesso;
        this.signup.controls.estadoId.setValue(null);
      })
  }

}
