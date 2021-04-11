import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Taquilla } from "@modelsRest/Taquilla";
import { TaquillaServiceService } from "@servicesRest/taquilla/taquilla-service.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-taquilla-list",
  templateUrl: "./taquilla-list.component.html",
  styleUrls: ["./taquilla-list.component.css"],
})
export class TaquillaListComponent implements OnInit {
  mostrarTaquillaAdd: boolean = false;
  taquillas: Taquilla[];

  //update
  taquillaUpdate: any;
  closeResult = "";

  constructor(
    private _service: TaquillaServiceService,
    private _router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    document.getElementById("minus").hidden = true;
    this._service.getTaquillas().subscribe((data) => {
      this.taquillas = data;
    });
  }

  delete(taquilla: Taquilla) {
    this._service.deleteTaquilla(taquilla).subscribe((data) => {
      this.taquillas = this.taquillas.filter((p) => p != taquilla);
    });
  }

  update() {
    this._service.updateTaquilla(this.taquillaUpdate).subscribe((data) => {
      alert("Taquilla Actualizada!");
      this.modalService.dismissAll();
    });
    window.location.reload();
  }

  habilitarTaquilla() {
    this.mostrarTaquillaAdd = true;
    document.getElementById("plus").hidden = true;
    document.getElementById("minus").hidden = false;
  }
  deshabilitarTaquilla() {
    this.mostrarTaquillaAdd = false;
    document.getElementById("plus").hidden = false;
    document.getElementById("minus").hidden = true;
  }

  open(content, taquilla: Taquilla) {
    this._service.getTaquilla(taquilla.id).subscribe((data) => {
      this.taquillaUpdate = data;
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
