import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/Categoria.dto';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  public categorias: Array<CategoriaDTO> = [];
  public bucketUrl: string = `${API_CONFIG.bucketBaseUrl}`;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private categoriaService: CategoriaService
  ) { }

  ionViewDidLoad() {
    let me = this;
    this.categoriaService.findAll()
      .subscribe(
        sucesso => {
          console.log(sucesso);
          me.categorias = sucesso;
        },
        erro => { });
  }

}
