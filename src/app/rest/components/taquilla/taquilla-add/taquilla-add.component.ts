import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TaquillaServiceService } from "@servicesRest/taquilla/taquilla-service.service";

@Component({
  selector: "app-taquilla-add",
  templateUrl: "./taquilla-add.component.html",
  styleUrls: ["./taquilla-add.component.css"],
})
export class TaquillaAddComponent implements OnInit {
  nuevaTaquilla: any;

  constructor(
    private _service: TaquillaServiceService,
    private _router: Router,
    private modalService: NgbModal
  ) {
    this.nuevaTaquilla = {
      numero: "",
    };
  }

  ngOnInit(): void {}

  addTaquilla(create, errorModal) {
    this._service.createTaquilla(this.nuevaTaquilla).subscribe(
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
