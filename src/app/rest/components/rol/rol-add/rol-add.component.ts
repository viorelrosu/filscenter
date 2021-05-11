import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { RolServiceService } from "@servicesRest/rol/rol-service.service";

@Component({
  selector: "app-rol-add",
  templateUrl: "./rol-add.component.html",
  styleUrls: ["./rol-add.component.css"],
})
export class RolAddComponent implements OnInit {
  nuevoRol: any;
  constructor(
    private _service: RolServiceService,
    private _router: Router,
    private modalService: NgbModal
  ) {
    this.nuevoRol = {
      nombre: "",
    };
  }

  ngOnInit(): void {}

  addRol(create, errorModal) {
    this._service.createRol(this.nuevoRol).subscribe(
      (data) => {
        this.modalService.open(create, {
          ariaLabelledBy: "modal-basic-title",
          centered: true,
          size: "md",
        });
        setTimeout(function () {
          window.location.reload();
        }, 3000);
      },
      (err) => {
        this.modalService.open(errorModal, {
          ariaLabelledBy: "modal-basic-title",
          centered: true,
          size: "md",
        });
      }
    );
  }
  
  refresh(){
    window.location.reload();
  }
}
