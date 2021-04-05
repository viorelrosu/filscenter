import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Sala } from "@modelsRest/Sala";
import { SalaServiceService } from "@servicesRest/sala/sala-service.service";

@Component({
  selector: "app-sala-list",
  templateUrl: "./sala-list.component.html",
  styleUrls: ["./sala-list.component.css"],
})
export class SalaListComponent implements OnInit {

  mostrarSalaAdd: boolean = false;

  salas: Sala[];

  constructor(private service: SalaServiceService, private router: Router) {}

  ngOnInit(): void {
    document.getElementById("minus").hidden = true;
    this.service.getSalas().subscribe((data) => {
      this.salas = data;
    });
  }

  delete(sala: Sala) {
    this.service.deleteSalas(sala).subscribe((data) => {
      this.salas = this.salas.filter((p) => p != sala);
      window.location.reload();
    });
  }

  habilitarSala(){
    this.mostrarSalaAdd = true;
    document.getElementById("plus").hidden = true;
    document.getElementById("minus").hidden = false;
  }
  deshabilitarSala(){
    this.mostrarSalaAdd = false;
    document.getElementById("plus").hidden = false;
    document.getElementById("minus").hidden = true;
  }
}
