import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signup: FormGroup;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder
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

  signupUser() {

  }

}
