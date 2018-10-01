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
      nome: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      tipo: ['1', Validators.required],
      cpfOuCnpj: ['', Validators.required],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: [''],
      cep: ['', Validators.required],
      telefone1: ['', Validators.required],
      telefone2: [''],
      telefone3: [''],
      estadoId: ['', Validators.required],
      cidadeId: ['', Validators.required],
    });
  }

  signupUser() {

  }

}
