import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Usuario } from "@modelsRest/Usuario";
import { FacturaServiceService } from "@servicesRest/factura/factura-service.service";
import { UsuarioServiceService } from "@servicesRest/usuario/usuario-service.service";

@Component({
  selector: "app-factura-add",
  templateUrl: "./factura-add.component.html",
  styleUrls: ["./factura-add.component.css"],
})
export class FacturaAddComponent implements OnInit {
  nuevaFactura: any;
  usuarioId: number;
  usuarios: Usuario[];
  facturaUserSelect = "";
  facturaPagadoSelect = "";

  constructor(
    private _serviceUsuario: UsuarioServiceService,
    private _service: FacturaServiceService,
    private _router: Router
  ) {
    this.nuevaFactura = {};
  }

  ngOnInit(): void {
    this._serviceUsuario.getUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }

  obtenerUsuario() {
    return this._serviceUsuario
      .getUsuario(this.usuarioId)
      .toPromise()
      .then((data) => {
        this.nuevaFactura.usuario = data;
      });
  }
  addFactura() {
    this.obtenerUsuario().then(() => {
      this._service.createFactura(this.nuevaFactura).subscribe(
        (data) => {
          alert("Factura agregada");
          window.location.reload();
        },
        (err) => {
          alert("error");
        }
      );
    });
  }
}
