import { Component, DoCheck, OnInit } from "@angular/core";
import { Slot } from "@modelsRest/Slot";
import { Sala } from "@modelsRest/Sala";
import { Reserva } from "@modelsRest/Reserva";
import { TablaComponent } from "../../componentes/tabla/tabla.component";
import { TimelineComponent } from "../../componentes/timeline/timeline.component";
import { SlotServiceService as SlotService } from "@servicesRest/slot/slot-service.service";
import { SalaServiceService as SalaService } from "@servicesRest/sala/sala-service.service";
import { ReservaServiceService as ReservaService } from "@servicesRest/reserva/reserva-service.service";
import { getTranslationDeclStmts } from "@angular/compiler/src/render3/view/template";
import { UsuarioServiceService as UsuarioService } from "@servicesRest/usuario/usuario-service.service";
import { HelperService } from '@core/services/helper.service';

declare var $: any;
@Component({
  selector: "app-horario",
  templateUrl: "./horario.component.html",
  styleUrls: ["./horario.component.css"],
})
export class PageHorarioComponent implements OnInit, DoCheck {
  public pageTitle: string;
  public pageDesc: string;
  public pageImg: string;
  public sessionUser: any;
  public filters: any;
  public isLoggedIn: boolean = false;

  constructor(
    private _helperService: HelperService,
    private _serviceSala: SalaService,
    private _serviceSlot: SlotService,
    private _serviceReserva: ReservaService,
    private _serviceUsuario: UsuarioService,
  ) {
    this.pageTitle = "Horario Clases Semanal";
    this.pageDesc = "Las clases que tenemos programadas";
    this.pageImg = "clase.jpg";
    this.filters = {
      type: "tabla",
      actividad: "",
      monitor: "",
    };
  }

  ngOnInit(): void {
    this._helperService.checkIsLoginAndRedirectToLogin();
    this.sessionUser = this._helperService.getSessionUser();
    this.isLoggedIn = this._helperService.checkIsLogin();
    // this.reserva.recurrente = false;
    //console.log(this.sessionUser);
  }

  ngDoCheck() {
    //console.log(this.filters.type);
  }


}
