import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

import { SlotServiceService as SlotService } from '@servicesRest/slot/slot-service.service';
import { SalaServiceService as SalaService } from '@servicesRest/sala/sala-service.service';
import { UsuarioServiceService as UsuarioService } from "@servicesRest/usuario/usuario-service.service";
import { ReservaServiceService as ReservaService } from "@servicesRest/reserva/reserva-service.service";
import { HelperService } from '@core/services/helper.service';

import { Slot } from "@modelsRest/Slot";

declare var $:any;
@Component({
  selector: 'horario-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css'],
})
export class TablaComponent implements OnInit, OnChanges {
  public slots: Slot[];
  public horas: Object[]=[];
  public diasSemana: String[] = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'];
  public isDataLoaded: boolean = false;
  public reserva: any = {};
  public slotSeleccionado: any;
  public isRecurrente:boolean = false;
  public aforoActual:number = 0;
  public isLoggedIn: boolean = false;
  public isSuscribed:boolean = false;
  public hasReserva: boolean = false;
  public closeResult:string = '';
  public sessionUser: any;

  @Input() searchResults: Slot[];

  constructor(
    private modalService: NgbModal,
    private _helperService: HelperService,
    private _serviceSlot: SlotService,
    private _serviceSala: SalaService,
    private _serviceReserva: ReservaService,
    private _serviceUsuario: UsuarioService,
  ) { 

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

  ngOnInit(): void {
    this._helperService.checkIsLoginAndRedirectToLogin();
    this._helperService.getSessionUser()
    .then((user:any)=>{
      this.sessionUser = user;
    })
    .then(()=>{
      this.isLoggedIn = this._helperService.checkIsLogin();
      this.isSuscribed = this.sessionUser.suscripcion.isSuscribed;

      this.loadSlots();
    });
    
  }

  ngOnChanges(){
    this.loadSlots();
  }

  loadSlots(){
    this._serviceSlot.getSlots().toPromise()
    .then((data)=>{
      //console.log(data);
      this.slots = data;
    })
    .then(()=>{
      //console.log(this.horas);
      for(var slot of this.slots) {
        var index = slot.horaInicio;
        var diaSemana = slot.diaSemana;
        var indexArray = this.getIndexOfK(this.horas, index);
        var isDisabled = this.checkIsDisabled(slot);
        this.horas[indexArray][diaSemana] = {
          id: slot.id,
          isDisabled: isDisabled,
          imagen: 'assets/fitness/images/trainers/'+slot.monitor.imagen,
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

  checkIsDisabled(slot:Slot) {
    return !this.searchResults.some(elem => elem.id === slot.id);
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
      if(this.isLoggedIn && this.isSuscribed) {
        return this._serviceReserva.getReservaBySlotIdAndUsuarioId(this.slotSeleccionado.id, this.sessionUser.id).toPromise()
      }
      return false;
    })
    .then((data)=>{
      //console.log(data);
      this.hasReserva = (data.length) ? true : false;
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

}
