import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ejercicio } from '@modelsRest/Ejercicio';
import { EjercicioServiceService } from '@servicesRest/ejercicio/ejercicio-service.service';

@Component({
  selector: 'app-ejercicio-list',
  templateUrl: './ejercicio-list.component.html',
  styleUrls: ['./ejercicio-list.component.css'],
})
export class EjercicioListComponent implements OnInit {
  mostrarEjercicioAdd:boolean = false;
  ejercicios: Ejercicio[];

  constructor(
    private service: EjercicioServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    document.getElementById("minusEjercicio").hidden = true;
    this.service.getEjercicios().subscribe((data) => {
      this.ejercicios = data;
    });
  }

  delete(ejercicio:Ejercicio){
    this.service.deleteEjercicio(ejercicio).subscribe((data)=>{
      this.ejercicios = this.ejercicios.filter((p) => p != ejercicio)
    })
  }


  habilitarEjercicio(){
    this.mostrarEjercicioAdd = true;
    document.getElementById("plusEjercicio").hidden = true;
    document.getElementById("minusEjercicio").hidden = false;
  }

  deshabilitarEjercicio(){
    this.mostrarEjercicioAdd = false;
    document.getElementById("plusEjercicio").hidden = false;
    document.getElementById("minusEjercicio").hidden = true;
  }
}
