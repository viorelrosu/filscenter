import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Sala } from "@modelsRest/Sala";
import { SalaServiceService } from "@servicesRest/sala/sala-service.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-sala-list",
  templateUrl: "./sala-list.component.html",
  styleUrls: ["./sala-list.component.css"],
})
export class SalaListComponent implements OnInit {
  //list
  mostrarSalaAdd: boolean = false;
  salas: Sala[];

  //update
  salaUpdate: any;
  closeResult = "";

  constructor(
    private _service: SalaServiceService,
    private _router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    document.getElementById("minus").hidden = true;
    this._service.getSalas().subscribe((data) => {
      this.salas = data;
    });
  }

  delete(sala: Sala) {
    this._service.deleteSalas(sala).subscribe((data) => {
      this.salas = this.salas.filter((p) => p != sala);
      window.location.reload();
    });
  }

  update() {
    this._service.updateSala(this.salaUpdate).subscribe((data) => {
      alert("Sala Actualizada!");
      this.modalService.dismissAll();
    });
    window.location.reload();
  }

  habilitarSala() {
    this.mostrarSalaAdd = true;
    document.getElementById("plus").hidden = true;
    document.getElementById("minus").hidden = false;
  }
  deshabilitarSala() {
    this.mostrarSalaAdd = false;
    document.getElementById("plus").hidden = false;
    document.getElementById("minus").hidden = true;
  }

  open(content, sala: Sala) {
    this._service.getSala(sala.id).subscribe((data) => {
      this.salaUpdate = data;
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
