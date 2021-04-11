import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Direccion } from "@modelsRest/Direccion";
import { Localidad } from "@modelsRest/Localidad";
import { Usuario } from "@modelsRest/Usuario";
import { DireccionServiceService } from "@servicesRest/direccion/direccion-service.service";
import { LocalidadServiceService } from "@servicesRest/localidad/localidad-service.service";
import { UsuarioServiceService } from "@servicesRest/usuario/usuario-service.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-direccion-list",
  templateUrl: "./direccion-list.component.html",
  styleUrls: ["./direccion-list.component.css"],
})
export class DireccionListComponent implements OnInit {
  mostrarDireccionAdd: boolean = false;
  direcciones: Direccion[];

  //update
  direccionUpdate: any;
  usuarios:Usuario[];
  localidades:Localidad[];
  closeResult = "";

  constructor(
    private _service: DireccionServiceService,
    private _serviceLocalidad:LocalidadServiceService,
    private _serviceUsuario:UsuarioServiceService,
    private _router: Router,
    private modalService: NgbModal
  ) {
    this.direccionUpdate = {};
  }

  ngOnInit(): void {
    document.getElementById("minus").hidden = true;
    this._service.getDirecciones().subscribe((data) => {
      this.direcciones = data;
    });

    this._serviceLocalidad.getLocalidades().subscribe(data=>{
      this.localidades=data;
    });

    this._serviceUsuario.getUsuarios().subscribe(data=>{
      this.usuarios=data;
    });
  }

  delete(direccion: Direccion) {
    this._service.deleteDireccion(direccion).subscribe((data) => {
      this.direcciones = this.direcciones.filter((p) => p != direccion);
      alert("Dirección eliminado");
    });
  }

  update(){
    this._service.updateDireccion(this.direccionUpdate).subscribe(data=>{
      alert("Dirección Actualizada!");
      this.modalService.dismissAll();
    });
    window.location.reload();
  }

  habilitarDireccion() {
    this.mostrarDireccionAdd = true;
    document.getElementById("plus").hidden = true;
    document.getElementById("minus").hidden = false;
  }

  deshabilitarDireccion() {
    this.mostrarDireccionAdd = false;
    document.getElementById("plus").hidden = false;
    document.getElementById("minus").hidden = true;
  }

  open(content, direccion: Direccion) {
    this._service.getDireccion(direccion.id).subscribe((data) => {
      this.direccionUpdate = data;
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
