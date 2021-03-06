import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';
import { StorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular";
import { FieldMessage } from "../models/field-message";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private storage: StorageService,
        private alertCtrl: AlertController
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .catch((error, caught) => {
                let errorObj = error;

                if (errorObj.error) {
                    errorObj = errorObj.error
                }
                if (!errorObj.status) {
                    errorObj = JSON.parse(errorObj)
                }

                console.log("Erro detectado pelo interceptador");
                console.log(errorObj);

                switch (errorObj.status) {
                    case 401:
                        this.handle401();
                        break;

                    case 403:
                        this.handle403();
                        break;

                    case 422:
                        this.handle422(errorObj);
                        break;

                    default:
                        this.handleDefaultError(errorObj);
                        break;
                }

                return Observable.throw(errorObj);

            }) as any;
    }

    handle403() {
        this.storage.setLocalUser(null);
    }

    handle401() {
        this.alertCtrl.create({
            title: "Erro 401: Falha na Autenticação",
            message: "Email ou senha incorretos",
            enableBackdropDismiss: false,
            buttons: [{
                text: "OK"
            }]
        }).present();
    }

    handle422(errorObj) {
        this.alertCtrl.create({
            title: "Erro 422: Validação",
            message: this.listErrors(errorObj.errors),
            enableBackdropDismiss: false,
            buttons: [{
                text: "OK"
            }]
        }).present();
    }

    listErrors(erros: Array<FieldMessage>) {
        let list = ''
        erros.forEach(x => list += '<p><strong>' + x.fieldName + '</strong>: ' + x.message + '</p>');
        return list;
    }

    handleDefaultError(errorObj) {
        this.alertCtrl.create({
            title: "Erro " + errorObj.status + ": " + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [{
                text: "OK"
            }]
        }).present();
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}