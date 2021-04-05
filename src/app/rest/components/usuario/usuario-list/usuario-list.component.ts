import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Usuario } from "@modelsRest/Usuario";
import { UsuarioServiceService } from "@servicesRest/usuario/usuario-service.service";

@Component({
  selector: "app-usuario-list",
  templateUrl: "./usuario-list.component.html",
  styleUrls: ["./usuario-list.component.css"],
})
export class UsuarioListComponent implements OnInit {
  usuarios: Usuario[];

  constructor(private service: UsuarioServiceService, private router: Router) {}

  ngOnInit(): void {
    this.service.getUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }

  delete(usuario: Usuario) {
    this.service.deleteUsuario(usuario).subscribe((data) => {
      this.usuarios = this.usuarios.filter((p) => p != usuario);
    });
  }
}
