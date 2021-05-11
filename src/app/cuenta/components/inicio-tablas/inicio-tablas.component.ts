import { Component, OnInit } from '@angular/core';
import { TablaEjercicio } from "@modelsRest/TablaEjercicio";
import { HelperService } from '@core/services/helper.service';
import { TablaEjercicioServiceService as TablaEjercicioService } from "@servicesRest/tabla_ejercicio/tabla-ejercicio-service.service";
import { EjercicioSerieServiceService as EjercicioSerieService } from "@servicesRest/ejercicio_serie/ejercicio-serie-service.service";
@Component({
  selector: 'cuenta-inicio-tablas',
  templateUrl: './inicio-tablas.component.html',
  styleUrls: ['./inicio-tablas.component.css']
})
export class CuentaInicioTablasComponent implements OnInit {
  public isDataLoaded: boolean = false;
  public tablasUser: TablaEjercicio[];
  public tablas: any = [];

  public sessionUser: any;

  constructor(
    private _helperService: HelperService,
    private _serviceTablaEjercicio: TablaEjercicioService,
    private _serviceEjercicioSerie: EjercicioSerieService,
  ) { }

  ngOnInit(): void {
    this._helperService.getSessionUser()
    .then((user:any)=>{
      this.sessionUser = user;
    })
    .then(()=>{
      this.loadTablas();
    });
  }

  loadTablas(){
    this._serviceTablaEjercicio.getTablasEjerciciosByUsuarioId(this.sessionUser.id).toPromise()
    .then((tablas)=>{
      //console.log(tablas);
      this.tablasUser = tablas;
    })
    .then(()=>{
      //console.log(this.tablasUser);
      this.buildTablasArray();

    })
    .then(()=>{
      this.isDataLoaded=true;
    });
  }

  async buildTablasArray(){
    for( let tabla of this.tablasUser) {
      var item= { tabla: {}, ejercicios: [] };
      var ejercicios = await this._serviceEjercicioSerie.getEjerciciosPorTablaId(tabla.id).toPromise();
      //console.log(ejercicios);
      item.tabla = tabla;
      item.ejercicios = ejercicios;
      this.tablas.push(item);
    }
    console.log(this.tablas);
  }

}
