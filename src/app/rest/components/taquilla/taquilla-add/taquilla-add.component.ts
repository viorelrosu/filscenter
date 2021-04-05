import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaquillaServiceService } from '@servicesRest/taquilla/taquilla-service.service';

@Component({
  selector: 'app-taquilla-add',
  templateUrl: './taquilla-add.component.html',
  styleUrls: ['./taquilla-add.component.css']
})
export class TaquillaAddComponent implements OnInit {

  nuevaTaquilla : any;

  constructor(private _service: TaquillaServiceService, private _router: Router) { 

    this.nuevaTaquilla = {
      numero: ""
    };
  }

  ngOnInit(): void {
  }

  addTaquilla(){
    this._service.createTaquilla(this.nuevaTaquilla).subscribe(data=>{
      alert("Taquilla creada");
      window.location.reload();
    })
  }
}
