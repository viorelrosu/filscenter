import { Component, OnInit } from '@angular/core';

import { Usuario } from "@modelsRest/Usuario";
import { Provincia } from "@modelsRest/Provincia";
import { Localidad } from "@modelsRest/Localidad";

import { HelperService } from '@core/services/helper.service';

import { UsuarioServiceService as UsuarioService } from "@servicesRest/usuario/usuario-service.service";
import { DireccionServiceService as DireccionService } from "@servicesRest/direccion/direccion-service.service";
import { LocalidadServiceService as LocalidadService } from "@servicesRest/localidad/localidad-service.service";
import { ProvinciaServiceService as ProvinciaService } from "@servicesRest/provincia/provincia-service.service";
import { TaquillaServiceService as TaquillaService } from "@servicesRest/taquilla/taquilla-service.service";
declare var $:any;
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class PageCuentaDatosComponent implements OnInit {
  public menuActive: string = 'datos';

  public usuarioUpdate: any;
  public provinciaId:number;
  public localidadId:number;
  public provincias: Provincia[];
  public localidades: Localidad[];

  public isDataLoaded:boolean = false;

  public sessionUser: any;

  constructor(
    private _serviceRestUser: UsuarioService,
    private _serviceDireccion: DireccionService,
    private _serviceLocalidad: LocalidadService,
    private _serviceProvincia: ProvinciaService,
    private _serviceTaquilla: TaquillaService,
    private _helperService: HelperService,
  ) { 
    this.usuarioUpdate={};
  }

  ngOnInit(): void {
    this._helperService.checkIsLoginAndRedirectToLogin();
    this.sessionUser = this._helperService.getSessionUser();
    this.obtenerUsuarioUpdate();
  }

  update(){
    this.obtenerProvincia()
    .then(()=>this.obtenerLocalidad())
    .then(()=>this.obtenerTaquilla())
    .then(()=>{
      console.log(this.usuarioUpdate);
      this._serviceRestUser.updateUsuario(this.usuarioUpdate).subscribe(data=>{
        $.notify({
          // options
          icon: 'fas fa-check',
          title: '¡Muy bien!',
          message: 'Tus datos se han actualizado correctamente',
        },{
          // settings
          type: 'success'
        });
      },(err)=>{
        console.log(err);
        $.notify({
          // options
          icon: 'fas fa-close',
          title: 'Ha habido un error!',
          message: err.error.message,
        },{
          // settings
          type: 'danger'
        });
      });
    })
  }

  updateLocalidades(provinciaId){
    this.usuarioUpdate.direccion.localidad.id = "";
    this._serviceLocalidad.getLocalidadesByProvinciaID(provinciaId).subscribe((data) => {
      this.localidades = data;
    }); 
  }

  cargarProvincias(){
    this._serviceProvincia.getProvincias().subscribe(data=>{
      this.provincias = data;
    });
  }

  obtenerTaquilla(){
    return this._serviceTaquilla.getTaquilla(1)
    .toPromise()
    .then(data=>{
      this.usuarioUpdate.taquilla = data;
    });
  }

  obtenerLocalidad(){
    return this._serviceLocalidad.getLocalidad(this.usuarioUpdate.direccion.localidad.id)
    .toPromise()
    .then(data=>{
      this.usuarioUpdate.direccion.localidad = data;
    });
  }

  obtenerProvincia(){
    return this._serviceProvincia.getProvincia(this.usuarioUpdate.direccion.localidad.provincia.id)
    .toPromise()
    .then(data=>{
      this.usuarioUpdate.direccion.localidad.provincia = data;
    })
  }

  obtenerUsuarioUpdate(){
     return this._serviceRestUser.getUsuario(this.sessionUser.id).toPromise()
     .then((data) => {
      this.usuarioUpdate = data;
      console.log(this.usuarioUpdate);
    })
    .then(()=>{
      return this._serviceProvincia.getProvincias().toPromise()
    })
    .then(data => {
      return this.provincias = data;
    })
    .then(()=>{
      return this._serviceLocalidad.getLocalidadesByProvinciaID(this.usuarioUpdate.direccion.localidad.provincia.id).toPromise();
    })
    .then((data) => {
      return this.localidades = data;
    })
    .then(()=>{
      this.isDataLoaded = true;
    });
  }

}
