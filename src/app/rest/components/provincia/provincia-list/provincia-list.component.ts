import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Provincia } from '@modelsRest/Provincia';
import { ProvinciaServiceService } from '@servicesRest/provincia/provincia-service.service';

@Component({
  selector: 'app-provincia-list',
  templateUrl: './provincia-list.component.html',
  styleUrls: ['./provincia-list.component.css'],
})
export class ProvinciaListComponent implements OnInit {
  constructor(
    private service: ProvinciaServiceService,
    private router: Router
  ) {}

  provincias: Provincia[];

  ngOnInit(): void {
    this.service.getProvincias().subscribe((data) => {
      this.provincias = data;
    });
  }
}
