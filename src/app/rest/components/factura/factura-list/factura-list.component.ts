import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Factura } from "@modelsRest/Factura";
import { FacturaServiceService } from "@servicesRest/factura/factura-service.service";

@Component({
  selector: "app-factura-list",
  templateUrl: "./factura-list.component.html",
  styleUrls: ["./factura-list.component.css"],
})
export class FacturaListComponent implements OnInit {
  mostrarFacturaAdd: boolean = false;
  facturas: Factura[];

  constructor(private service: FacturaServiceService, private router: Router) {}

  ngOnInit(): void {
    document.getElementById("minus").hidden = true;
    this.service.getFacturas().subscribe((data) => {
      this.facturas = data;
    });
  }

  delete(factura: Factura) {
    this.service.deleteFactura(factura).subscribe((data) => {
      this.facturas = this.facturas.filter((p) => p != factura);
      alert("Factura eliminada");
    });
  }

  habilitarFactura() {
    this.mostrarFacturaAdd = true;
    document.getElementById("plus").hidden = true;
    document.getElementById("minus").hidden = false;
  }

  deshabilitarFactura() {
    this.mostrarFacturaAdd = false;
    document.getElementById("plus").hidden = false;
    document.getElementById("minus").hidden = true;
  }
}
