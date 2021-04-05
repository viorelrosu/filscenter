import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Taquilla } from "@modelsRest/Taquilla";
import { TaquillaServiceService } from "@servicesRest/taquilla/taquilla-service.service";

@Component({
  selector: "app-taquilla-list",
  templateUrl: "./taquilla-list.component.html",
  styleUrls: ["./taquilla-list.component.css"],
})
export class TaquillaListComponent implements OnInit {
  mostrarTaquillaAdd : boolean = false;
  taquillas: Taquilla[];

  constructor(
    private service: TaquillaServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    document.getElementById("minus").hidden = true;
    this.service.getTaquillas().subscribe((data) => {
      this.taquillas = data;
    });
  }

  delete(taquilla: Taquilla) {
    this.service.deleteTaquilla(taquilla).subscribe((data) => {
      this.taquillas = this.taquillas.filter((p) => p != taquilla);
    });
  }

  habilitarTaquilla(){
    this.mostrarTaquillaAdd = true;
    document.getElementById("plus").hidden = true;
    document.getElementById("minus").hidden = false;
  }
  deshabilitarTaquilla(){
    this.mostrarTaquillaAdd = false;
    document.getElementById("plus").hidden = false;
    document.getElementById("minus").hidden = true;
  }
}
