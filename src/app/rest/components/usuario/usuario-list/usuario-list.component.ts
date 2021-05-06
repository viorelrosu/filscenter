import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Direccion } from "@modelsRest/Direccion";
import { Suscripcion } from "@modelsRest/Suscripcion";
import { Taquilla } from "@modelsRest/Taquilla";
import { Usuario } from "@modelsRest/Usuario";
import { DireccionServiceService } from "@servicesRest/direccion/direccion-service.service";
import { SuscripcionServiceService } from "@servicesRest/suscripcion/suscripcion-service.service";
import { TaquillaServiceService } from "@servicesRest/taquilla/taquilla-service.service";
import { UsuarioServiceService } from "@servicesRest/usuario/usuario-service.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { LocalidadServiceService } from "@servicesRest/localidad/localidad-service.service";
import { ProvinciaServiceService } from "@servicesRest/provincia/provincia-service.service";
import { Provincia } from "@modelsRest/Provincia";
import { Localidad } from "@modelsRest/Localidad";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-usuario-list",
  templateUrl: "./usuario-list.component.html",
  styleUrls: ["./usuario-list.component.css"],
})
export class UsuarioListComponent implements OnInit {
  //desplegar parte de add usuario
  mostrarUsuarioAdd: boolean = false;

  //listado de usuarios
  usuarios: Usuario[];


  //PARTE UPDATE
  usuarioUpdate: any;
  suscripciones: Suscripcion[];
  direcciones: Direccion[];
  provincias: Provincia[];
  localidades: Localidad[];
  taquillas: Taquilla[];
  closeResult = "";
  ProvinciaId:number;
  localidadId:number;

  //parte confirm delete
    usuarioAux:any;

  constructor(
    private _service: UsuarioServiceService,
    private _serviceTaquilla: TaquillaServiceService,
    private _serviceDireccion: DireccionServiceService,
    private _serviceLocalidad: LocalidadServiceService,
    private _serviceProvincia: ProvinciaServiceService,
    private _serviceSuscripcion: SuscripcionServiceService,
    private _router: Router,
    private modalService: NgbModal
  ) {
    this.usuarioUpdate={};
    this.usuarioAux={};
  }

  ngOnInit(): void {
    document.getElementById("minus").hidden = true;

    this._service.getUsuarios().subscribe((data) => {
      this.usuarios = data;
    });

    this._serviceDireccion.getDirecciones().subscribe(data=>{
      this.direcciones = data;
    });

    this._serviceSuscripcion.getSuscripciones().subscribe(data=>{
      this.suscripciones=data;
    });

    this._serviceTaquilla.getTaquillas().subscribe(data=>{
      this.taquillas=data;
    });

  }

  delete() {
    this._service.deleteUsuario(this.usuarioAux).subscribe((data) => {
      window.location.reload();
      //this.usuarios = this.usuarios.filter((p) => p != usuario);
    });
  }

  update(){
    this.obtenerProvincia()
    .then(()=>this.obtenerLocalidad())
    .then(()=>this.obtenerTaquilla())
    .then(()=>{
      this._service.updateUsuario(this.usuarioUpdate).subscribe(data=>{
        alert("Usuario Actualizado!");
        this.modalService.dismissAll();
        window.location.reload();
      },(err)=>{
        alert("ERROR"+err);
      });
    })

  }

  //habilitar o deshabilitar parte creación de usuario
  habilitarUsuario() {
    this.mostrarUsuarioAdd = true;
    document.getElementById("plus").hidden = true;
    document.getElementById("minus").hidden = false;
  }
  deshabilitarUsuario() {
    this.mostrarUsuarioAdd = false;
    document.getElementById("plus").hidden = false;
    document.getElementById("minus").hidden = true;
  }

  //carga de localidades de la provincia que pertecene al usuario
  cargarLocalidades(usuario:Usuario) {
    this._serviceLocalidad.getLocalidadesByProvinciaID(usuario.direccion.localidad.provincia.id).subscribe((data) => {
      this.localidades = data;
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
    console.log(this.localidadId+"localidad");
    console.log(this.usuarioUpdate.direccion.localidad.id+"localidad");
    return this._serviceLocalidad.getLocalidad(this.usuarioUpdate.direccion.localidad.id)
    .toPromise()
    .then(data=>{
      this.usuarioUpdate.direccion.localidad = data;
    });
  }

  obtenerProvincia(){
    console.log(this.ProvinciaId+"prvincia");
    console.log(this.usuarioUpdate.direccion.localidad.provincia.id+"prvincia");
    return this._serviceProvincia.getProvincia(this.usuarioUpdate.direccion.localidad.provincia.id)
    .toPromise()
    .then(data=>{
      this.usuarioUpdate.direccion.localidad.provincia = data;
    })
  }

  obtenerUsuarioUpdate(usuario:Usuario){
     return this._service.getUsuario(usuario.id).toPromise()
     .then((data) => {
      this.usuarioUpdate = data;
    });
  }

  updateLocalidades(provinciaId){
    this.usuarioUpdate.direccion.localidad.id = "";
    this._serviceLocalidad.getLocalidadesByProvinciaID(provinciaId).subscribe((data) => {
      this.localidades = data;
    }); 
  }



  // abre ventana modal
  open(content, usuario:Usuario) {
    this._service.getUsuario(usuario.id).toPromise()
    .then((data) => {
     this.usuarioUpdate = data;
   });
 
    this._serviceProvincia.getProvincias().subscribe(data=>{
      this.provincias = data;
    });
    this.cargarLocalidades(usuario);
    
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", centered: true, size : "xl", scrollable:true})
      .result.then(
        (result) => {
        },
        (reason) => {
        }
      );
  }

  //abre modal confirm delete

  openModalDelete(confirmDelete, usuario:Usuario){
    this.usuarioAux = usuario;
    this.modalService
    .open(confirmDelete, { ariaLabelledBy: "modal-basic-title", centered: true, size : "md"})
    .result.then(
      (result) => {
      },
      (reason) => {
      }
    );
  }




}
