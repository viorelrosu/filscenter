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
  public searchBySalaID: number = 1;
  public actividades:any = [ {id:0,nombre:'Todas las actividades'} ];
  public monitores:any = [ {id:0, nombre:'Todos los monitores'}];
  public salas:any = [ {id:1, nombre:'Sala #1'} ];
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

    //this._helperService.checkIsLoginAndRedirectToLogin();
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

        if(!this.getIndexOfID(this.salas, slot.sala.id)) {
          this.salas.push({id: slot.sala.id, nombre: 'Sala #' + slot.sala.numero });
        }
      }
    })
    .then(()=>{
      this.searchSlots();
    })
    .then(()=>{
      this.isDataLoaded=true;
      //console.log(this.salas);
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

  searchBySala(value:any){
    this.searchBySalaID = value;
    this.searchSlots();
  }

  searchSlots() {
    this.searchResultSlots = [];
    var isSearchByActividad = false;
    var isSearchByMonitor = false;
    var isSearchBySala = true;

    if (this.searchByActividadID != 0 ) {
      isSearchByActividad = true;
    }

    if (this.searchByMonitorID != 0 ) {
      isSearchByMonitor = true;
    }

    //search by sala
    if(isSearchBySala) {
      this.searchResultSlots = this.slots.filter(slot => {
        return slot.sala.id == this.searchBySalaID;
      });
    }

    //search by actividad
    if(isSearchByActividad) {
      this.searchResultSlots = this.searchResultSlots.filter(slot => {
        return slot.actividad.id == this.searchByActividadID;
      });
    }

    //search by monitor
    if(isSearchByMonitor) {
      this.searchResultSlots = this.searchResultSlots.filter(slot => {
        return slot.monitor.id == this.searchByMonitorID;
      });
    }

    //console.log(this.slots);
    //console.log(this.searchResultSlots);
  }
  
}
