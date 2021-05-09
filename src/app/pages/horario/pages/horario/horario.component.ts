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
  public slots: Slot[];
  public searchResultSlots: Slot[];
  public searchByActividadID: number = 0;
  public searchByMonitorID: number = 0;
  public actividades:any = [ {id:0,nombre:'Todas las actividades'} ];
  public monitores:any = [ {id:0, nombre:'Todos los monitores'}];
  public isDataLoaded:boolean = false;

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
    this._helperService.getSessionUser()
    .then((user:any)=>{
      this.sessionUser = user;
    })
    .then(()=>{
      this.isLoggedIn = this._helperService.checkIsLogin();
    });
    
    
    this._serviceSlot.getSlots().toPromise()
    .then((slots)=>{
      this.slots = slots;
      for(var slot of slots) {
        if(!this.getIndexOfID(this.actividades, slot.actividad.id)) {
          this.actividades.push({id: slot.actividad.id, nombre: slot.actividad.nombre });
        }

        if(!this.getIndexOfID(this.monitores, slot.monitor.id)) {
          this.monitores.push({id: slot.monitor.id, nombre: slot.monitor.nombre + ' ' + slot.monitor.apellidos });
        }
      }
    })
    .then(()=>{
      this.searchSlots();
    })
    .then(()=>{
      this.isDataLoaded=true;
      //console.log(this.actividades);
    });
    
  }


  getIndexOfID(arr:any, id:number) {
    var exist = false;
    for (var i = 0; i < arr.length; i++) {
      if(arr[i].id == id) {
        exist = true;
      }
    }
    return exist;
  }

  ngDoCheck() {
    //console.log(this.filters.type);
  }

  searchByActividad(value:any){
    this.searchByActividadID = value;
    this.searchSlots();
  }

  searchByMonitor(value:any){
    this.searchByMonitorID = value;
    this.searchSlots();
  }

  searchSlots() {
    this.searchResultSlots = [];

    //search by actividad
    if( (this.searchByActividadID != 0) && (this.searchByMonitorID == 0) ) {
      for(let slot of this.slots) {
        if(slot.actividad.id == this.searchByActividadID) {
          this.searchResultSlots.push(slot);
        }
      }
    }

    //search by monitor
    if( (this.searchByActividadID == 0) && (this.searchByMonitorID != 0) ) {
      for(let slot of this.slots) {
        if(slot.monitor.id == this.searchByMonitorID) {
          this.searchResultSlots.push(slot);
        }
      }
    }

    //search by actividad y monitor
    if( (this.searchByActividadID != 0) && (this.searchByMonitorID != 0) ) {
      for(let slot of this.slots) {
        if((slot.actividad.id == this.searchByActividadID) && (slot.monitor.id == this.searchByMonitorID)) {
          this.searchResultSlots.push(slot);
        }
      }
    }

    //all the slots
    if( (this.searchByActividadID == 0) && (this.searchByMonitorID == 0) ) {
      for(let slot of this.slots) {
          this.searchResultSlots.push(slot);
      }
    }
    //console.log(this.searchResultSlots);
  }
  
}
