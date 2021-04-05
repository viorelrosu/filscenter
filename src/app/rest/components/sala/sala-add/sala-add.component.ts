import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Sala } from "@modelsRest/Sala";
import { SalaServiceService } from "@servicesRest/sala/sala-service.service";

@Component({
  selector: "app-sala-add",
  templateUrl: "./sala-add.component.html",
  styleUrls: ["./sala-add.component.css"],
})
export class SalaAddComponent implements OnInit {
  nuevaSala: any;

  constructor(private _service: SalaServiceService, private _router: Router) {
    this.nuevaSala = {
      aforoMax: "",
      numero: "",
    };
  }

  ngOnInit(): void {}

  addSala() {
    this._service.createSala(this.nuevaSala).subscribe((data) => {
      alert("agregado con éxito");
      window.location.reload();
    });
  }
}
