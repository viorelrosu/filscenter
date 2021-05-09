import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

import { Usuario } from "@modelsRest/Usuario";
import { Provincia } from "@modelsRest/Provincia";
import { Localidad } from "@modelsRest/Localidad";
import { TipoSuscripcion } from "@modelsRest/TipoSuscripcion";

import { HelperService } from '@core/services/helper.service';

import { UsuarioServiceService as UsuarioService } from "@servicesRest/usuario/usuario-service.service";
import { DireccionServiceService as DireccionService } from "@servicesRest/direccion/direccion-service.service";
import { LocalidadServiceService as LocalidadService } from "@servicesRest/localidad/localidad-service.service";
import { ProvinciaServiceService as ProvinciaService } from "@servicesRest/provincia/provincia-service.service";
import { TaquillaServiceService as TaquillaService } from "@servicesRest/taquilla/taquilla-service.service";
import { TipoSuscripcionServiceService as TipoSuscripcionService } from "@servicesRest/tipo_suscripcion/tipo-suscripcion-service.service";
import { SuscripcionServiceService as SuscripcionService } from "@servicesRest/suscripcion/suscripcion-service.service";
import { Suscripcion } from '@modelsRest/suscripcion';

declare var $:any;
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class PageCuentaDatosComponent implements OnInit {
  public menuActive: string = 'datos';
  public title: string = 'Mis Datos';

  public usuarioUpdate: any;
  public provinciaId:number;
  public localidadId:number;
  public provincias: Provincia[];
  public localidades: Localidad[];

  public isDataLoaded:boolean = false;

  public sessionUser: any;

  public suscripcionTipos: TipoSuscripcion[];
  public suscripcionTipoID: number;
  public nuevaSuscripcion: any = {};

  constructor(
    private _serviceRestUser: UsuarioService,
    private _serviceDireccion: DireccionService,
    private _serviceLocalidad: LocalidadService,
    private _serviceProvincia: ProvinciaService,
    private _serviceTaquilla: TaquillaService,
    private _serviceTipoSuscripcion: TipoSuscripcionService,
    private _serviceSuscripcion: SuscripcionService,
    private _helperService: HelperService,
    private _modalService: NgbModal,
  ) { 
    this.usuarioUpdate={};
  }

  ngOnInit(): void {
    this._helperService.checkIsLoginAndRedirectToLogin();
    this._helperService.getSessionUser()
    .then((user:any)=>{
      this.sessionUser = user;
    })
    .then(()=>{
      this.getUsuarioUpdate();
    });
    //console.log(this.sessionUser);
  }

  update(){
    this.getProvincia()
    .then(()=>this.getLocalidad())
    .then(()=>this.getTaquilla())
    .then(()=>{
      //console.log(this.usuarioUpdate);
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
        //console.log(err);
        $.notify({
          // options
          icon: 'fas fa-close',
          title: 'Lo sentimos, ha habido un error!',
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

  loadProvincias(){
    this._serviceProvincia.getProvincias().subscribe(data=>{
      this.provincias = data;
    });
  }

  getTaquilla(){
    return this._serviceTaquilla.getTaquilla(1)
    .toPromise()
    .then(data=>{
      this.usuarioUpdate.taquilla = data;
    });
  }

  getLocalidad(){
    return this._serviceLocalidad.getLocalidad(this.usuarioUpdate.direccion.localidad.id)
    .toPromise()
    .then(data=>{
      this.usuarioUpdate.direccion.localidad = data;
    });
  }

  getProvincia(){
    return this._serviceProvincia.getProvincia(this.usuarioUpdate.direccion.localidad.provincia.id)
    .toPromise()
    .then(data=>{
      this.usuarioUpdate.direccion.localidad.provincia = data;
    })
  }

  getUsuarioUpdate(){
     return this._serviceRestUser.getUsuario(this.sessionUser.id).toPromise()
     .then((data) => {
      this.usuarioUpdate = data;
      //console.log(this.usuarioUpdate);
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

  open(content:any) {
    this._serviceTipoSuscripcion.getTiposSuscripcion().toPromise()
    .then((data) => {
      this.suscripcionTipos = data;
    })
    .then(()=>{
      this._modalService.open(content, { ariaLabelledBy: "modal-basic-title", centered: true })
      .result.then(
        (result) => {
          //this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    });
  }

  addSuscripcion() {
    var fechaAlta = new Date();
    this.nuevaSuscripcion.fechaAlta = fechaAlta.toISOString();

    this.getTipoSuscripcion()
      .then(()=>{
        if(this.nuevaSuscripcion.recurrente) {
          this.nuevaSuscripcion.fechaBaja = null;
        } else {
          //calculamos la fecha de baja
          var fechaBaja = new Date();
          fechaBaja.setDate(fechaAlta.getDate() + this.nuevaSuscripcion.tipoSuscripcion.duracion);
          this.nuevaSuscripcion.fechaBaja = fechaBaja.toISOString();
        }
      })
      .then(() => this.getUsuario())
      .then(() => {
        
        this._serviceSuscripcion.createSuscripcion(this.nuevaSuscripcion).subscribe(
          (data) => {
            this._helperService.checkAndSaveSessionSubscription()
            .then(()=>{
              return this._helperService.getSessionUser();
            })
            .then((user:any)=>{
              this.sessionUser = user;
              //console.log(this.sessionUser);
            })
            .then(()=>{

              this.closeModal();
              $.notify({
                // options
                icon: 'fas fa-check',
                title: '¡Muy bien!',
                message: 'Tienes una nueva suscripción.',
              },{
                // settings
                type: 'success'
              });

            });
          },
          (err) => {

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

  getTipoSuscripcion() {
    return this._serviceTipoSuscripcion
      .getTipoSuscripcion(this.suscripcionTipoID)
      .toPromise()
      .then((data) => {
        this.nuevaSuscripcion.tipoSuscripcion = data;
      });
  }

  getUsuario() {
    return this._serviceRestUser
      .getUsuario(this.sessionUser.id)
      .toPromise()
      .then((data) => {
        this.nuevaSuscripcion.usuario = data;
      });
  }

  closeModal(){
    this._modalService.dismissAll();
  }

}
