import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Factura } from "@modelsRest/Factura";
import { Usuario } from "@modelsRest/Usuario";
import { FacturaServiceService } from "@servicesRest/factura/factura-service.service";
import { UsuarioServiceService } from "@servicesRest/usuario/usuario-service.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-factura-list",
  templateUrl: "./factura-list.component.html",
  styleUrls: ["./factura-list.component.css"],
})
export class FacturaListComponent implements OnInit {
  mostrarFacturaAdd: boolean = false;
  facturas: Factura[];

  //update
  facturaUpdate: any;
  usuarios: Usuario[];
  closeResult = "";

  constructor(
    private _service: FacturaServiceService,
    private _serviceUsuario: UsuarioServiceService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.facturaUpdate = {};
  }

  ngOnInit(): void {
    document.getElementById("minus").hidden = true;
    this._service.getFacturas().subscribe((data) => {
      this.facturas = data;
    });

    this._serviceUsuario.getUsuarios().subscribe(data=>{
      this.usuarios = data;
    });
  }

  delete(factura: Factura) {
    this._service.deleteFactura(factura).subscribe((data) => {
      this.facturas = this.facturas.filter((p) => p != factura);
      alert("Factura eliminada");
    });
  }

  update(){

  }

  habilitarFactura() {
    this.mostrarFacturaAdd = true;
    document.getElementById("plus").hidden = true;
    document.getElementById("minus").hidden = false;
  }

  deshabilitarFactura() {
    this.mostrarFacturaAdd = false;
    document.getElementById("plus").hidden = false;
    document.getElementById("minus").hidden = true;
  }

  open(content, factura: Factura) {
    this._service.getFactura(factura.id).subscribe((data) => {
      this.facturaUpdate = data;
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
