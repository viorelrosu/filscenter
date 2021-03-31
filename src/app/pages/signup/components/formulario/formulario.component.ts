import { Component, OnInit } from '@angular/core';

import { AuthService } from '@core/services/auth.service';

import { Usuario } from '@shared/models/usuario';
import { Direccion } from '@shared/models/direccion';
import { Suscripcion } from '@shared/models/suscripcion';
import { SuscripcionTipo } from '@shared/models/suscripcion.tipo';

@Component({
  selector: 'registro-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  public usuario: Usuario;
  public isSignUpFailed = false;
  public errorMessage = '';

  constructor(private _authService: AuthService) {
    this.usuario = new Usuario();
   }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('evento submit lanzado');
    console.log(this.usuario);

    const data = {};

    this._authService.register(data).subscribe(
      result => {
        console.log(result);
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
