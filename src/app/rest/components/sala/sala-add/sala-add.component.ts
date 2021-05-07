import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Sala } from "@modelsRest/Sala";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SalaServiceService } from "@servicesRest/sala/sala-service.service";

@Component({
  selector: "app-sala-add",
  templateUrl: "./sala-add.component.html",
  styleUrls: ["./sala-add.component.css"],
})
export class SalaAddComponent implements OnInit {
  nuevaSala: any;

  constructor(
    private _service: SalaServiceService,
    private _router: Router,
    private modalService: NgbModal
  ) {
    this.nuevaSala = {
      aforoMax: "",
      numero: "",
    };
  }

  ngOnInit(): void {}

  addSala(create, errorModal) {
    this._service.createSala(this.nuevaSala).subscribe(
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

  refresh() {
    window.location.reload();
  }
}
