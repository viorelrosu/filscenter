import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Localidad } from '@modelsRest/Localidad';
import { LocalidadServiceService } from '@servicesRest/localidad/localidad-service.service';

@Component({
  selector: 'app-localidad-list',
  templateUrl: './localidad-list.component.html',
  styleUrls: ['./localidad-list.component.css'],
})
export class LocalidadListComponent implements OnInit {
  localidades: Localidad[];

  constructor(
    private service: LocalidadServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.getLocalidades().subscribe((data) => {
      this.localidades = data;
    });
  }
}
