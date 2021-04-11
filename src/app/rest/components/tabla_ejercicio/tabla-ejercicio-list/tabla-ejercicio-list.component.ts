import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TablaEjercicio } from "@modelsRest/TablaEjercicio";
import { EjercicioSerieServiceService } from "@servicesRest/ejercicio_serie/ejercicio-serie-service.service";
import { TablaEjercicioServiceService } from "@servicesRest/tabla_ejercicio/tabla-ejercicio-service.service";
import { UsuarioServiceService } from "@servicesRest/usuario/usuario-service.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Usuario } from "@modelsRest/Usuario";
import { EjercicioSerie } from "@modelsRest/EjercicioSerie";

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

  constructor(
    private _service: TablaEjercicioServiceService,
    private _serviceUsuario:UsuarioServiceService,
    private _router: Router,
    private modalService: NgbModal
  ) {
    this.tablaUpdate = {};
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

  open(content, tabla: TablaEjercicio) {
    this._service.getTablaEjercicio(tabla.id).subscribe((data) => {
      this.tablaUpdate = data;
      this.inicio = this.tablaUpdate.fechaInicio;
      console.log(this.inicio);
      
    });
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", centered: true })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
