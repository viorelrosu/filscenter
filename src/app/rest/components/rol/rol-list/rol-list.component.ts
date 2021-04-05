import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Rol } from "@modelsRest/Rol";
import { RolServiceService } from "@servicesRest/rol/rol-service.service";

@Component({
  selector: "app-rol-list",
  templateUrl: "./rol-list.component.html",
  styleUrls: ["./rol-list.component.css"],
})
export class RolListComponent implements OnInit {
  mostrarRolAdd: boolean = false;
  roles: Rol[];
  constructor(private service: RolServiceService, private router: Router) {}

  ngOnInit(): void {
    document.getElementById("minus").hidden = true;
    this.service.getRoles().subscribe((data) => {
      this.roles = data;
    });
  }

  delete(rol: Rol) {
    this.service.deleteRol(rol).subscribe((data) => {
      this.roles = this.roles.filter((p) => p != rol);
    });
  }

  habilitarRol(){
    this.mostrarRolAdd = true;
    document.getElementById("plus").hidden = true;
    document.getElementById("minus").hidden = false;
  }
  deshabilitarRol(){
    this.mostrarRolAdd = false;
    document.getElementById("plus").hidden = false;
    document.getElementById("minus").hidden = true;
  }
}
