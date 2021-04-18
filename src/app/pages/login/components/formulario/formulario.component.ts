import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { TokenStorageService } from '@core/services/token-storage.service';
import { UsuarioServiceService } from '@servicesRest/usuario/usuario-service.service';

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

  constructor(
    private _authService: AuthService,
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
    const { username, password } = this.form;

    this._authService.login(username, password).subscribe(
      result => {
        //console.log(result);
        this._restUserService.getUsuarioByEmail(result.username).toPromise()
        .then(data => {
            //console.log(data);
            data.isAdmin = (data.rol.nombre  == 'admin') ? true : false;
            data.isMonitor = (data.rol.nombre  == 'monitor') ? true : false;
            this._tokenStorage.saveUser(data);
            this._tokenStorage.saveToken(result.accessToken);
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.redirectPage();
        })
        .catch((error)=>{
          console.log("Promise rejected with " + JSON.stringify(error));
        });
      },
      err => {
        console.log(err);
        //console.log(err.error);
        // this.errorMessage = err.error.message;
        this.errorMessage = 'Los datos son incorrectos.';
        this.isLoginFailed = true;
        console.log(err.error.message);
      }
    );
  }

  redirectPage(){
    if(this.isLoggedIn) {
      this._router.navigate(['/cuenta']).then(() => {
        window.location.reload();
      });
    }
  }  

}
