import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TablaEjercicio } from "@modelsRest/TablaEjercicio";
import { EjercicioSerieServiceService } from "@servicesRest/ejercicio_serie/ejercicio-serie-service.service";
import { TablaEjercicioServiceService } from "@servicesRest/tabla_ejercicio/tabla-ejercicio-service.service";
import { UsuarioServiceService } from "@servicesRest/usuario/usuario-service.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Usuario } from "@modelsRest/Usuario";
import { EjercicioSerie } from "@modelsRest/EjercicioSerie";
import { EjercicioServiceService } from "@servicesRest/ejercicio/ejercicio-service.service";

@Component({
  selector: "app-tabla-ejercicio-list",
  templateUrl: "./tabla-ejercicio-list.component.html",
  styleUrls: ["./tabla-ejercicio-list.component.css"],
})
export class TablaEjercicioListComponent implements OnInit {
  //parte list
  mostrarTablaEjercicioAdd: boolean = false;
  tablasEjercicio: TablaEjercicio[];

  //parte update
  tablaUpdate: any;
  monitores:Usuario[];
  suscriptores:Usuario[];
  closeResult = "";
  inicio = new Date();

  //parte Detalle tabla
  tablaDetalle : any;
  ejerciciosSerieTablaDetalle:EjercicioSerie[];

      //abrir añadir ejercicioSerieModal
      modalAniadir = false;
      ejerciciosSerie:EjercicioSerie[];
      nuevoEjercicioSerie:any;
      ejercicioId:number;
      ejerSelect="";

  constructor(
    private _service: TablaEjercicioServiceService,
    private _serviceEjercicio: EjercicioServiceService,
    private _serviceEjerciciosSerie : EjercicioSerieServiceService,
    private _serviceUsuario:UsuarioServiceService,
    private _router: Router,
    private modalService: NgbModal
  ) {
    this.tablaUpdate = {};
    this.tablaDetalle = {};
    this.nuevoEjercicioSerie={};
  }

  ngOnInit(): void {
    document.getElementById("minus").hidden = true;

    this._service.getTablasEjercicios().subscribe((data) => {
      this.tablasEjercicio = data;
    });

    this._serviceUsuario.getUsuarios().subscribe(data=>{
      this.monitores = data;
      this.suscriptores=data;
    })
  }

  delete(tablaEjercicio: TablaEjercicio) {
    this._service.deleteTablaEjercicio(tablaEjercicio).subscribe((data) => {
      this.tablasEjercicio = this.tablasEjercicio.filter(
        (p) => p != tablaEjercicio
      );
    });
  }

  update(){
    this._service.updateTablaEjercicio(this.tablaUpdate).subscribe(data=>{
      alert("Tabla Actualizada!");
      this.modalService.dismissAll();
    });
    window.location.reload();
  }

  habilitarTablaEjercicio() {
    this.mostrarTablaEjercicioAdd = true;
    document.getElementById("plus").hidden = true;
    document.getElementById("minus").hidden = false;
  }

  deshabilitarTablaEjercicio() {
    this.mostrarTablaEjercicioAdd = false;
    document.getElementById("plus").hidden = false;
    document.getElementById("minus").hidden = true;
  }

  //abrir añadir ejercicios en modal
  abrirAniadirModal(){
    this. modalAniadir = true;
  }

  obtenerEjercicioParaCreacionPorModal(){
    return this._serviceEjercicio.getEjercicio(this.ejercicioId).toPromise()
    .then((data)=>{
      this.nuevoEjercicioSerie.ejercicio = data;
    })
  }

  //añadir ejercicio serie desde modal
  aniadirEjercicioSerie(detalle,tablaDetalle){

    this.obtenerEjercicioParaCreacionPorModal()
    .then(()=>{
      this.nuevoEjercicioSerie.tablaEjercicio = tablaDetalle;
      console.log(this.nuevoEjercicioSerie);
      this._serviceEjerciciosSerie.createEjercicioSerie(this.nuevoEjercicioSerie).subscribe(data=>{
        this.modalService.dismissAll();
        this.modalAniadir = false;
        this.openDetalleTabla(detalle, tablaDetalle);
        this.nuevoEjercicioSerie={};
        this.ejerSelect = "";
      },err=>{
        alert("error");
      });
    });
  }


  //modal detalle tabla
  openDetalleTabla(detalle, tabla: TablaEjercicio) {
    this.tablaDetalle = tabla;
    this._serviceEjercicio.getEjercicios().subscribe(data=>{
      this.ejerciciosSerie = data;
    });

    this._serviceEjerciciosSerie.getEjerciciosPorTablaId(tabla.id).subscribe((data) => {
      this.ejerciciosSerieTablaDetalle = data;
      console.log(this.ejerciciosSerieTablaDetalle);
      
    });
    this.modalService
      .open(detalle, { ariaLabelledBy: "modal-basic-title", centered: true, size : "xl" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
        }
      );
  }



//modal update tabla
  open(content, tabla: TablaEjercicio) {
    this._service.getTablaEjercicio(tabla.id).subscribe((data) => {
      this.tablaUpdate = data;
      this.inicio = this.tablaUpdate.fechaInicio;
    });
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", centered: true,size:"xl",scrollable:true })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
        }
      );
  }

}
