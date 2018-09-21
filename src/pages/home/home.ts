import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CredenciaisDTO } from '../../models/credenciais.dto';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public autenticacao: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private menu: MenuController,
    private auth: AuthService
  ) {
    this.autenticacao = this.formBuilder.group({
      email: ['mikaelboff1@gmail.com', Validators.compose([Validators.required, Validators.email])],
      senha: ['123456', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ionViewWillEnter() {
    this.menu.enable(false);
  }
  ionViewDidLeave() {
    this.menu.enable(true);
  }

  relizarLogin() {
    let formValue = this.autenticacao.value;

    let credenciais = <CredenciaisDTO>{
      email: formValue.email,
      senha: formValue.senha
    };

    this.auth.authenticate(credenciais).subscribe(response => {
      this.auth.successfullLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot("CategoriasPage");
    }, error => { });

  }

}
