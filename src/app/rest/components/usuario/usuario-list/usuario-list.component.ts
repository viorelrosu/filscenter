import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Direccion } from "@modelsRest/Direccion";
import { Suscripcion } from "@modelsRest/Suscripcion";
import { Taquilla } from "@modelsRest/Taquilla";
import { Usuario } from "@modelsRest/Usuario";
import { DireccionServiceService } from "@servicesRest/direccion/direccion-service.service";
import { SuscripcionServiceService } from "@servicesRest/suscripcion/suscripcion-service.service";
import { TaquillaServiceService } from "@servicesRest/taquilla/taquilla-service.service";
import { UsuarioServiceService } from "@servicesRest/usuario/usuario-service.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { LocalidadServiceService } from "@servicesRest/localidad/localidad-service.service";
import { ProvinciaServiceService } from "@servicesRest/provincia/provincia-service.service";
import { Provincia } from "@modelsRest/Provincia";
import { Localidad } from "@modelsRest/Localidad";
import { HelperService } from "@core/services/helper.service";

import { md5 } from "pure-md5";
import { DatePipe } from "@angular/common";
import { Subject } from 'rxjs';

@Component({
  selector: "app-usuario-list",
  templateUrl: "./usuario-list.component.html",
  styleUrls: ["./usuario-list.component.css"],
})
export class UsuarioListComponent implements OnInit {
  //desplegar parte de add usuario
  mostrarUsuarioAdd: boolean = false;

  //listado de usuarios
  usuarios: Usuario[];

  textoModal: string;

  //PARTE UPDATE
  usuarioUpdate: any;
  suscripciones: Suscripcion[];
  direcciones: Direccion[];
  provincias: Provincia[];
  localidades: Localidad[];
  taquillas: Taquilla[];
  closeResult = "";
  ProvinciaId: number;
  localidadId: number;
  confirmPass: string = "";
  passwordUpdate : string = "";

  //parte confirm delete
  usuarioAux: any;

  //filtro tabla
  filterName: string = "";
  filterRol: string = "user";
  filterError: boolean = false;
  mainTablaUsers: Usuario[];
  filterTabla: Usuario[];

  //datatable
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _service: UsuarioServiceService,
    private _serviceTaquilla: TaquillaServiceService,
    private _serviceDireccion: DireccionServiceService,
    private _serviceLocalidad: LocalidadServiceService,
    private _serviceProvincia: ProvinciaServiceService,
    private _serviceSuscripcion: SuscripcionServiceService,
    private _router: Router,
    private modalService: NgbModal,
    private _helperService: HelperService,
    private datePipe: DatePipe
  ) {
    this.usuarioUpdate = {};
    this.usuarioAux = {};
  }

  ngOnInit(): void {
    this._helperService.isRolOK("admin");
    document.getElementById("minus").hidden = true;

    this._service.getUsuarios().subscribe((data) => {
      this.usuarios = data;
      this.mainTablaUsers = data;
      this.dtTrigger.next();
    });

    this._serviceDireccion.getDirecciones().subscribe((data) => {
      this.direcciones = data;
    });

    this._serviceSuscripcion.getSuscripciones().subscribe((data) => {
      this.suscripciones = data;
    });

    this._serviceTaquilla.getTaquillas().subscribe((data) => {
      this.taquillas = data;
    });

    this.dtOptions = {
      language: {
        processing: "Procesando...",
        search: "Buscar:",
        lengthMenu: "_MENU_ elementos",
        info: "Mostrando desde _START_ al _END_ de _TOTAL_ elementos",
        infoEmpty: "Mostrando ningún elemento.",
        infoFiltered: "(filtrado _MAX_ elementos total)",
        infoPostFix: "",
        loadingRecords: "Cargando registros...",
        zeroRecords: "No se encontraron registros",
        emptyTable: "No hay datos disponibles en la tabla",
        paginate: {
          first: "Primero",
          previous: "Anterior",
          next: "Siguiente",
          last: "Último"
        },
        aria: {
          sortAscending: ": Activar para ordenar la tabla en orden ascendente",
          sortDescending: ": Activar para ordenar la tabla en orden descendente"
        }
      },
      pagingType: 'full_numbers',
      pageLength: 10,
      order:[[6, 'asc']]
    };
  }

  delete() {
    this._service.deleteUsuario(this.usuarioAux).subscribe((data) => {
      window.location.reload();
    });
  }

  update(modal) {
    this.obtenerProvincia()
      .then(() => this.obtenerLocalidad())
      .then(() => this.obtenerTaquilla())
      .then(() => {

        if (this.passwordUpdate != ""){
          this.usuarioUpdate.password = md5(this.passwordUpdate);
        }

        this.usuarioUpdate.email = this.usuarioUpdate.email.toLowerCase();
        this._service.updateUsuario(this.usuarioUpdate).subscribe(
          (data) => {
            this.textoModal = "¡Usuario actualizado!";
            this.modalService.open(modal, {
              ariaLabelledBy: "modal-basic-title",
              centered: true,
              size: "md",
            });
          },
          (err) => {
            this.textoModal = "¡Error al actualizar!";
            this.modalService.open(modal, {
              ariaLabelledBy: "modal-basic-title",
              centered: true,
              size: "md",
            });
          }
        );
      });
  }

  //habilitar o deshabilitar parte creación de usuario
  habilitarUsuario() {
    this.mostrarUsuarioAdd = true;
    document.getElementById("plus").hidden = true;
    document.getElementById("minus").hidden = false;
  }
  deshabilitarUsuario() {
    this.mostrarUsuarioAdd = false;
    document.getElementById("plus").hidden = false;
    document.getElementById("minus").hidden = true;
  }

  //carga de localidades de la provincia que pertecene al usuario
  cargarLocalidades(usuario: Usuario) {
    this._serviceLocalidad
      .getLocalidadesByProvinciaID(usuario.direccion.localidad.provincia.id)
      .subscribe((data) => {
        this.localidades = data;
      });
  }

  obtenerTaquilla() {
    return this._serviceTaquilla
      .getTaquilla(1)
      .toPromise()
      .then((data) => {
        this.usuarioUpdate.taquilla = data;
      });
  }

  obtenerLocalidad() {
    return this._serviceLocalidad
      .getLocalidad(this.usuarioUpdate.direccion.localidad.id)
      .toPromise()
      .then((data) => {
        this.usuarioUpdate.direccion.localidad = data;
      });    
  }

  obtenerProvincia() {
    return this._serviceProvincia
      .getProvincia(this.usuarioUpdate.direccion.localidad.provincia.id)
      .toPromise()
      .then((data) => {
        this.usuarioUpdate.direccion.localidad.provincia = data;
      });
  }

  obtenerUsuarioUpdate(usuario: Usuario) {
    return this._service
      .getUsuario(usuario.id)
      .toPromise()
      .then((data) => {
        this.usuarioUpdate = data;
      });
  }

  updateLocalidades(provinciaId) {
    this.usuarioUpdate.direccion.localidad.id = "";
    this._serviceLocalidad
      .getLocalidadesByProvinciaID(provinciaId)
      .subscribe((data) => {
        this.localidades = data;
      });
  }

  // abre ventana modal
  open(content, usuario: Usuario) {
    this._service
      .getUsuario(usuario.id)
      .toPromise()
      .then((data) => {
        this.usuarioUpdate = data;
        this.usuarioUpdate.fechaNacimiento = this.datePipe.transform(
          this.usuarioUpdate.fechaNacimiento,
          "yyyy-MM-dd" /*'dd-MM-yyyy'*/
        );
        //this.confirmPass = this.usuarioUpdate.password;
      });

    this._serviceProvincia.getProvincias().subscribe((data) => {
      this.provincias = data;
    });
    this.cargarLocalidades(usuario);

    this.modalService
      .open(content, {
        ariaLabelledBy: "modal-basic-title",
        centered: true,
        size: "xl",
        scrollable: true,
      })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  //abre modal confirm delete
  openModalDelete(confirmDelete, usuario: Usuario) {
    this.usuarioAux = usuario;
    this.modalService
      .open(confirmDelete, {
        ariaLabelledBy: "modal-basic-title",
        centered: true,
        size: "md",
      })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  refresh() {
    window.location.reload();
  }
/*
  keyPress(evento) {
    if (evento.keyCode == 13 && !evento.shiftKey) {
      this.filtrarTabla();
    }
  }

  // filtrar tabla

  /filtrarTabla() {
    this.filterTabla = [];

    for (let persona of this.mainTablaUsers) {
      if (
        (persona.nombre
          .toLocaleLowerCase()
          .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          .indexOf(this.filterName.toLocaleLowerCase()) > -1 ||
          persona.email
            .toLocaleLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .indexOf(this.filterName.toLocaleLowerCase()) > -1) &&
        persona.rol.nombre == this.filterRol
      ) {
        this.filterTabla.push(persona);
      } else if (
        this.filterName == "" &&
        persona.rol.nombre == this.filterRol
      ) {
        this.filterTabla.push(persona);
      }
    }
    console.log(this.filterTabla);

    if (this.filterTabla.length > 0) {
      this.filterError = false;
      this.usuarios = this.filterTabla;
    } else {
      this.filterError = true;
      this.usuarios = [];
    }
  }

  quitarFiltroTabla() {
    this.filterError = false;
    this.usuarios = this.mainTablaUsers;
    this.filterName = "";
  }*/
}
