import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';

import { Slot } from "@modelsRest/Slot";
import { Reserva } from "@modelsRest/Reserva";

import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

import { SlotServiceService as SlotService } from '@servicesRest/slot/slot-service.service';
import { SalaServiceService as SalaService } from '@servicesRest/sala/sala-service.service';
import { UsuarioServiceService as UsuarioService } from "@servicesRest/usuario/usuario-service.service";
import { ReservaServiceService as ReservaService } from "@servicesRest/reserva/reserva-service.service";
import { HelperService } from '@core/services/helper.service';

declare var $:any;
@Component({
  selector: 'cuenta-inicio-horario',
  templateUrl: './inicio-horario.component.html',
  styleUrls: ['./inicio-horario.component.css']
})
export class CuentaInicioHorarioComponent implements OnInit {

  public slots: Slot[];
  public reservasUser: Reserva[];
  public horas: Object[]=[];
  public diasSemana: String[] = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'];
  public isDataLoaded: boolean = false;
  public reserva: any = {};
  public slotSeleccionado: any;
  public isRecurrente:boolean = false;
  public aforoActual:number = 0;
  public hasReserva: boolean = false;
  public reservaToDel: Reserva;
  public closeResult:string = '';

  public searchResults: Slot[] = [];
  public searchByActividadID: number = 0;
  public searchByMonitorID: number = 0;
  public searchBySalaID: number = 1;
  public actividades:any = [ {id:0,nombre:'Todas las actividades'} ];
  public monitores:any = [ {id:0, nombre:'Todos los monitores'}];
  public salas:any = [ {id:1, nombre:'Sala #1'}];
  public isSearch:boolean = false;

  public sessionUser: any;

  constructor(
    private modalService: NgbModal,
    private _helperService: HelperService,
    private _serviceSlot: SlotService,
    private _serviceSala: SalaService,
    private _serviceReserva: ReservaService,
    private _serviceUsuario: UsuarioService,
  ) { 
    
    this.setHoras();

  }

  ngOnInit(): void {

    this._helperService.getSessionUser()
    .then((user:any)=>{
      this.sessionUser = user;
    })
    .then(()=>{
      this.setSelectores();
    })
    .then(()=>{
      this.searchSlots();
    });

  }

  setSelectores(){
    return this._serviceSlot.getSlots().toPromise()
    .then((slots)=>{
      for(var slot of slots) {
        if(!this.getIndexOfID(this.salas, slot.sala.id)) {
          this.salas.push({id: slot.sala.id, nombre: 'Sala #' + slot.sala.numero });
        }

        if(!this.getIndexOfID(this.actividades, slot.actividad.id)) {
          this.actividades.push({id: slot.actividad.id, nombre: slot.actividad.nombre });
        }
      
        if(!this.getIndexOfID(this.monitores, slot.monitor.id)) {
          this.monitores.push({id: slot.monitor.id, nombre: slot.monitor.nombre + ' ' + slot.monitor.apellidos });
        }
      }
    });
  };

  setHoras(){
    this.horas = [];
    for(var i=7; i<23; i++){
      var hora:String;
      var index:number;
      if(i<10) {
        hora = '0'+i+':00';
        index = parseInt('0'+i+'00');
      } else if (i>9 && i<20) {
        hora = i+':00';
        index = parseInt(i+'00');
      } else if(i>19) {
        hora = i+':00';
        index = parseInt(i+'00');
      }
      this.horas.push({
        index: index,
        hora: hora,
        Lunes: null,
        Martes: null,
        Miercoles: null,
        Jueves: null,
        Viernes: null,
        Sabado: null,
        Domingo: null,
      });
    } 
  }

  loadSlots(){
    this._serviceReserva.getReservasByUsuarioId(this.sessionUser.id).toPromise()
    .then((reservas)=>{
      this.reservasUser = reservas;
      //console.log(this.reservasUser);
    })
    .then(()=>{
      this.setHoras();
    })
    .then(()=>{
      for(var slot of this.slots) {
        var index = slot.horaInicio;
        var diaSemana = slot.diaSemana;
        var indexArray = this.getIndexOfK(this.horas, index);
        var isReserved = this.checkIsReserved(slot);
        var isDisabled = this.checkIsDisabled(slot);
        this.horas[indexArray][diaSemana] = {
          id: slot.id,
          isReserved: isReserved,
          isDisabled: isDisabled,
          imagen: 'assets/uploads/'+slot.monitor.imagen,
          monitor: slot.monitor.nombre,
          actividad: slot.actividad.nombre,
          color: slot.actividad.color,
          slot: slot
        }
      }
    })
    .then(()=>{
      this.isDataLoaded=true;
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

  checkIsDisabled(slot:Slot) {
      console.log(!this.searchResults.some(elem => elem.id === slot.id));
      return !this.searchResults.some(elem => elem.id === slot.id);
  }

  checkIsReserved(slot:Slot) {
    if(this.reservasUser.length > 0) {
      return this.reservasUser.some(elem => elem.slot.id === slot.id);
    }
    return false;
  }

  getIndexOfK(arr:any, value:number) {
    for (var i = 0; i < arr.length; i++) {
      var index = Object.values(arr[i]).indexOf(value);
      //Object.keys(object).find(key => object[key] === value)
      if (index > -1) {
        return i;
      }
    }
  }

  open(content:any, slot:Slot) {
    this.aforoActual = 0;
    this._serviceSlot.getSlot(slot.id).toPromise()
    .then((data) => {
      this.slotSeleccionado = data;
      this.isRecurrente = false;
    })
    .then(()=>{
      this._serviceReserva.getReservasBySlotId(slot.id).toPromise()
      .then((reservas)=>{
        for(let reserva of reservas) {
          if(reserva.recurrente) {
            ++this.aforoActual;
          } else {
            var dateString = reserva.fechaInicio.substring(0,10);
            var today = new Date();
            var fechaInicio = new Date(dateString.substring(0,4), dateString.substring(5,7)-1, dateString.substring(8,10));
            if(fechaInicio.getTime() >= today.getTime()) {
              ++this.aforoActual;
            }
          }
        }
      })
    })
    .then(()=>{
        //comprobamos si tiene ya una reserva
        return this._serviceReserva.getReservaBySlotIdAndUsuarioId(this.slotSeleccionado.id, this.sessionUser.id).toPromise();
    })
    .then((data)=>{
      console.log(data);
      this.hasReserva = (data) ? data[0] : false;
    })
    .then(()=>{
      this.modalService.open(content, { ariaLabelledBy: "modal-basic-title", centered: true })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  closeModal(){
    this.modalService.dismissAll();
    this.aforoActual = 0;
  }

  doReserva(id:number){
    this.reserva.recurrente = this.isRecurrente ? 'true' : 'false';
    this.reserva.fechaInicio = new Date().toISOString();
    
    return this._serviceSlot.getSlot(id).toPromise()
    .then((data)=>{
      this.reserva.slot = data;
    })
    .then(()=>{
      return this._serviceUsuario.getUsuario(this.sessionUser.id).toPromise();
    })
    .then((data) => {
      this.reserva.usuario = data;
    })
    .then(()=>{
      //console.log(this.reserva);
      this._serviceReserva.createReserva(this.reserva).subscribe((data)=>{
        this.reservaToDel = null;
        this.loadSlots();
        this.closeModal();
        $.notify({
          // options
          icon: 'fas fa-check',
          title: '¡Muy bien!',
          message: 'Te hemos reservado una plaza.',
        },{
          // settings
          type: 'success'
        });
        
      },(err)=>{
        $.notify({
          // options
          icon: 'fas fa-close',
          title: 'Lo sentimos, ha habido un error!',
          message: err.error.message,
        },{
          // settings
          type: 'danger'
        });
      });
    });

  }

  delConfirm(reserva:Reserva){
    this.reservaToDel = reserva;
  }

  delCancelar(){
    this.reservaToDel = null;
  }

  delReserva() {
    this._serviceReserva.deleteReserva(this.reservaToDel).subscribe(
      (data) => {
        this.loadSlots();
        this.closeModal();
        $.notify({
            // options
            icon: 'fas fa-check',
            title: '¡Muy bien!',
            message: 'La reserva se ha eliminado correctamente.',
          },{
          // settings
          type: 'success'
        });
      },
      (err) => {

        $.notify({
          // options
          icon: 'fas fa-close',
          title: 'Lo sentimos, ha habido un error!',
          message: err.error.message,
        },{
          // settings
          type: 'danger'
        });

      }
    );
  }

  searchBySala(value:any){
    this.searchBySalaID = value;
    this.isSearch = true;
    this.searchSlots();
  }

  searchByActividad(value:any){
    this.searchByActividadID = value;
    this.isSearch = true;
    this.searchSlots();
  }

  searchByMonitor(value:any){
    this.searchByMonitorID = value;
    this.isSearch = true;
    this.searchSlots();
  }

  getSlotsBySala(){
    this.slots = [];
    return this._serviceSlot.getSlotsBySala(this.searchBySalaID).toPromise()
        .then((slots)=>{
          //console.log(data);
          this.slots = slots;
          return slots;
        });
  }

  searchSlots() {
    this.getSlotsBySala()
    .then((slots)=>{

      this.searchResults = [];
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
        this.searchResults = slots.filter(slot => {
          return slot.sala.id == this.searchBySalaID;
        });

        //console.log(this.searchResults);
      }

      //search by actividad
      if(isSearchByActividad) {
        this.searchResults = this.searchResults.filter(slot => {
          return slot.actividad.id == this.searchByActividadID;
        });
      }

      //search by monitor
      if(isSearchByMonitor) {
        this.searchResults = this.searchResults.filter(slot => {
          return slot.monitor.id == this.searchByMonitorID;
        });
      }

      //console.log(this.slots);
      //console.log(this.searchResultSlots);
    })
    .then(()=>{
        this.loadSlots();
    });
    
  }

}
