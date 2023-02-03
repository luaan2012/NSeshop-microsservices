import { HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { throwError } from "rxjs";
import { LocalStorageUtils } from "../utils/localstorage";

export abstract class BaseService {

    protected UrlStore: string = environment.apiUrlStore;
    protected UrlAccount: string = environment.apiUrlAccount;
    protected UrlBFF: string = environment.apiUrlBFF;
    protected urlClient: string = environment.apiUrlClient;

    public LocalStorage = new LocalStorageUtils();

    protected ObterHeaderJson() {
      return {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
      };
    }

    protected GetHeaderUnlerncoded() {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      };
    }

    protected GetAuthHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.LocalStorage.GetTokenUser()}`
            })
        };
    }

    protected GetAuthHeaderUnlecoded() {
        return {
            headers: new HttpHeaders({
              'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${this.LocalStorage.GetTokenUser()}`
            })
        };
    }

    protected extractData(response: any) {
        return response || {};
    }

    protected serviceError(response: Response | any) {
        let customError: string[] = [];
        let customResponse = { error: { errors: [] }}

        if (response instanceof HttpErrorResponse) {

            if (response.statusText === "Unknown Error") {
                customError.push("Ocorreu um erro desconhecido");
                response.error.errors = customError;
            }
        }
        if (response.status === 500) {
            customError.push("Ocorreu um erro no processamento, tente novamente mais tarde ou contate o nosso suporte.");

            // Erros do tipo 500 não possuem uma lista de erros
            // A lista de erros do HttpErrorResponse é readonly
            customResponse.error.errors = customError;
            return throwError(customResponse);
        }
        return throwError(response);
    }
}
