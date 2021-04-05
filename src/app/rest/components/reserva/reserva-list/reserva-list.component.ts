import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reserva } from '@modelsRest/Reserva';
import { ReservaServiceService } from '@servicesRest/reserva/reserva-service.service';

@Component({
  selector: 'app-reserva-list',
  templateUrl: './reserva-list.component.html',
  styleUrls: ['./reserva-list.component.css']
})
export class ReservaListComponent implements OnInit {
  mostrarReservaAdd: boolean = false;
reservas:Reserva[];
  constructor(
    private service: ReservaServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    document.getElementById("minus").hidden = true;
    this.service.getreservas().subscribe(data=>{
      this.reservas = data;
    })
  }

  delete(reserva:Reserva){
    this.service.deleteReserva(reserva).subscribe((data)=>{
      this.reservas = this.reservas.filter((p) => p != reserva);
      alert("Reserva eliminada");
    });
  }

  habilitarReserva(){
    this.mostrarReservaAdd = true;
    document.getElementById("plus").hidden = true;
    document.getElementById("minus").hidden = false;
  }
  deshabilitarReserva(){
    this.mostrarReservaAdd = false;
    document.getElementById("plus").hidden = false;
    document.getElementById("minus").hidden = true;
  }

}
