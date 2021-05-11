import { Component, OnInit } from '@angular/core';

import { AuthService } from '@core/services/auth.service';

import { Localidad } from "@modelsRest/Localidad";
import { Provincia } from "@modelsRest/Provincia";
import { LocalidadServiceService as LocalidadService } from "@servicesRest/localidad/localidad-service.service";
import { ProvinciaServiceService as ProvinciaService } from "@servicesRest/provincia/provincia-service.service";
import { UsuarioServiceService as UsuarioService } from "@servicesRest/usuario/usuario-service.service"; 
import { RolServiceService as RolService } from "@servicesRest/rol/rol-service.service";
import { TokenStorageService } from '@core/services/token-storage.service';
import { HelperService } from '@core/services/helper.service';

import { Router } from '@angular/router';
import {md5} from 'pure-md5';

declare var $:any;
@Component({
  selector: 'registro-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  public nuevoUsuario: any;
  public fillUsuario: any;
  public direccion: any;
  public rolId: number = 3;
  public localidadId: number;
  public provinciaId: number = 0;
  public localidades: Localidad[];
  public provincias: Provincia[];
  public localidadSelect:Number;
  public provinciaSelect:Number;
  public password:string = 'fils123';
  public passwordConfirm:string = 'fils123';
  public enviando: boolean = false;

  public isSignUpFailed: boolean = false;
  public isLoggedIn: boolean = false;
  public isLoginFailed: boolean = false;
  public errorMessage: string = 'Error';
  public successMessage: string = 'Tu registro se ha realizado con exito. Espera ...';

  constructor(
    private _authService: AuthService,
    private _service: UsuarioService,
    private _serviceLocalidad: LocalidadService,
    private _serviceProvincia: ProvinciaService,
    private _serviceRol: RolService,
    private _restUserService: UsuarioService,
    private _tokenStorage: TokenStorageService,
    private _helperService: HelperService,
    private _router: Router
    ) {
    this.nuevoUsuario = {
      nombre: 'John',
      apellidos: 'Doe',
      dni: '55668877X',
      email: 'test2@doe.es',
      telefono: '666555444',
      fechaNacimiento: '2000-06-10',
      cuentaBancaria: 'ES55 1111 2222 33 4444444444',
      password: 'fils123',
      password_confirm: 'fils123',
    };
    this.direccion = {
      calle: 'Venezuela',
      numero: 20,
      bloque: 1,
      escalera: 1,
      piso: 4,
      puerta: 'B',
      codigoPostal: '29850',

    };
    this.provinciaId = 1;
    this.localidadId = 1;
    this.localidadSelect=2;
    this.provinciaSelect=2;
   }

  ngOnInit(): void {
    this._serviceProvincia.getProvincias().subscribe((data) => {
      this.provincias = data;
    });
  }

  // metodo para cargar los localidades de la provincia
  cargarLocalidades(provinciaId) {
    console.log(this.provinciaSelect);
    // this.localidadSelect = 2;
    this._serviceLocalidad.getLocalidadesByProvinciaID(provinciaId).subscribe((data) => {
      this.localidades = data;
    }); 
  }

  // metodo para obtener y enlazar la localidad con la direccion que se va a crear
  obtenerLocalidad() {
    return this._serviceLocalidad
      .getLocalidad(this.localidadId)
      .toPromise()
      .then((data) => {
        this.direccion.localidad = data;
      });
  }

  //metodo para obtener y enlazar el rol (por default será el de ROLE_USER)
  obtenerRol() {
    return this._serviceRol
      .getRol(this.rolId)
      .toPromise()
      .then((data) => {
        this.nuevoUsuario.rol = data;
      });
  }

  //metodo para crear al usuario
  addUsuario() {
    this.enviando = true;
    this.nuevoUsuario.password = md5(this.password);
    this.nuevoUsuario.password_confirm = md5(this.passwordConfirm);
    console.log(this.nuevoUsuario);
    this.obtenerLocalidad()
      .then(() => this.obtenerRol())
      .then(() => {
        this.nuevoUsuario.direccion = this.direccion;
        this._service.altaUser(this.nuevoUsuario).subscribe(
          (data) => {
            //console.log(data);
            //alert("usuario registrado");
            this.isSignUpFailed = false;
            //this.loginUsuario();
            $.notify({
              // options
              icon: 'fas fa-check',
              title: '¡Muy bien!',
              message: 'Ya hemos realizado un registro con tus datos.',
            },{
              // settings
              type: 'success'
            });
    
            setTimeout(()=>{
              this.loginUsuario();
            },2000);
            //window.location.reload();
          },
          (err) => {
            this.isSignUpFailed = false;
            this.errorMessage = err;
            $.notify({
              // options
              icon: 'fas fa-close',
              title: 'Lo sentimos, ha habido un error!',
              message: err.error.message,
            },{
              // settings
              type: 'danger'
            });
          }
        );
      });
  }

  loginUsuario() {
    this._authService.login(this.nuevoUsuario.email, this.nuevoUsuario.password).subscribe(
      result => {
        //console.log(result);
        this._restUserService.getUsuarioByEmail(result.username).toPromise()
        .then(data => {
            this._tokenStorage.saveUser(data);
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
        console.log(err);
        //console.log(err.error);
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
