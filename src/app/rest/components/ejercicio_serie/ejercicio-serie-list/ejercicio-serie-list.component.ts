import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EjercicioSerie } from '@modelsRest/EjercicioSerie';
import { EjercicioSerieServiceService } from '@servicesRest/ejercicio_serie/ejercicio-serie-service.service';

@Component({
  selector: 'app-ejercicio-serie-list',
  templateUrl: './ejercicio-serie-list.component.html',
  styleUrls: ['./ejercicio-serie-list.component.css'],
})
export class EjercicioSerieListComponent implements OnInit {
  mostrarEjercicioSerieAdd:boolean = false;
  ejercicioSeries: EjercicioSerie[];

  constructor(
    private service: EjercicioSerieServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    document.getElementById("minus").hidden = true;
    this.service.getEjercicioSeries().subscribe((data) => {
      this.ejercicioSeries = data;
    });
  }

  delete(ejercicioSerie:EjercicioSerie){
    
    this.service.deleteEjercicioSerie(ejercicioSerie).subscribe(data =>{
      this.ejercicioSeries = this.ejercicioSeries.filter((p) => p != ejercicioSerie);
    });
  }


  habilitarEjercicioSerie(){
    this.mostrarEjercicioSerieAdd = true;
    document.getElementById("plus").hidden = true;
    document.getElementById("minus").hidden = false;
  }

  deshabilitarEjercicioSerie(){
    this.mostrarEjercicioSerieAdd = false;
    document.getElementById("plus").hidden = false;
    document.getElementById("minus").hidden = true;
  }
}
