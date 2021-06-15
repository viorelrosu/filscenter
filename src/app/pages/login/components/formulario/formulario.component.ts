import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { TokenStorageService } from '@core/services/token-storage.service';
import { HelperService } from '@core/services/helper.service';
import { UsuarioServiceService } from '@servicesRest/usuario/usuario-service.service';

import {md5} from 'pure-md5';

import { Router } from '@angular/router';

@Component({
  selector: 'login-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  public form: any = {
    username: null,
    password: null
  };

  public isLoggedIn: boolean = false;
  public isLoginFailed: boolean = false;
  public errorMessage: string = 'Error';
  public enviando: boolean = false;

  constructor(
    private _authService: AuthService,
    private _helperService: HelperService,
    private _tokenStorage: TokenStorageService,
    private _restUserService: UsuarioServiceService,
    private _router: Router
  ) { 
  }

  ngOnInit(): void {
  }

  onSubmit() {
    // console.log(this.form.username);
    // console.log(this.form.password);
    this.enviando = true;
    const { username, password } = this.form;
    const passEncrypted = md5(password);

    this._authService.login(username, passEncrypted).subscribe(
      result => {
        //console.log(result);
        this._restUserService.getUsuarioByEmail(result.username).toPromise()
        .then(user => {
            //console.log(user);
            return this._tokenStorage.saveUser(user);
        })
        .then(user => {
          this._tokenStorage.saveToken(result.accessToken);
        })
        .then(()=>{
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.redirectPage();
        })
        .catch((error)=>{
          console.log("Promise rejected with " + JSON.stringify(error));
        });
      },
      err => {
        //console.log(err);
        this.enviando = false;
        // console.log(err.error);
        // this.errorMessage = err.error.message;
        this.errorMessage = 'Los datos son incorrectos.';
        this.isLoginFailed = true;
        //console.log(err.error.message);
      }
    );
  }

  redirectPage(){
    if(this.isLoggedIn) {
      this._router.navigate(['/cuenta/inicio']).then(() => {
        window.location.reload();
      });
    }
  }  

}
