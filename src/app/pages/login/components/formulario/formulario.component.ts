import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { TokenStorageService } from '@core/services/token-storage.service';

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
  public sessionUser: any;
  public isLoggedIn = false;
  public isLoginFailed = false;
  public errorMessage = '';

  constructor(
    private _authService: AuthService,
    private _tokenStorage: TokenStorageService
  ) { 
  }

  ngOnInit(): void {
    if (this._tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.sessionUser = this._tokenStorage.getUser();
    }
  }

  onSubmit() {
    console.log(this.form.email);
    console.log(this.form.password);

    const { username, password } = this.form;

    this._authService.login(username, password).subscribe(
      result => {
        this._tokenStorage.saveToken(result.accessToken);
        this._tokenStorage.saveUser(result);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.sessionUser = this._tokenStorage.getUser();
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(){
    window.location.reload();
  }  

}
