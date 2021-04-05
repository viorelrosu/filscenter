import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RolServiceService } from "@servicesRest/rol/rol-service.service";

@Component({
  selector: "app-rol-add",
  templateUrl: "./rol-add.component.html",
  styleUrls: ["./rol-add.component.css"],
})
export class RolAddComponent implements OnInit {
  nuevoRol: any;
  constructor(private _service: RolServiceService, private _router: Router) {
    this.nuevoRol = {
      nombre: "",
    };
  }

  ngOnInit(): void {}

  addRol() {
    this._service.createRol(this.nuevoRol).subscribe(data=>{
      alert("Rol creado");
      window.location.reload();
    })
  }
}
